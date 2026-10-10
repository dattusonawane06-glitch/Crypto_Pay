// Vercel serverless function: SHM price (median of several exchanges) + USD->INR
module.exports = async function handler(req, res) {
  const get = async (url, pick) => {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
      return pick(await r.json());
    } catch (e) { return null; }
  };
  const [a, b, c, fx] = await Promise.all([
    get("https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=SHM-USDT", d => +d.data.price),
    get("https://api.mexc.com/api/v3/ticker/price?symbol=SHMUSDT", d => +d.price),
    get("https://api.gateio.ws/api/v4/spot/tickers?currency_pair=SHM_USDT", d => +d[0].last),
    get("https://open.er-api.com/v6/latest/USD", d => +d.rates.INR),
  ]);
  const v = [a, b, c].filter(x => x > 0).sort((x, y) => x - y);
  if (!v.length) { res.status(502).json({ error: "no price available" }); return; }
  const m = v.length % 2 ? v[v.length >> 1] : (v[v.length / 2 - 1] + v[v.length / 2]) / 2;
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
  res.status(200).json({ usd: m, inr: fx > 0 ? m * fx : null, sources: v.length });
};
