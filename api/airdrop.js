// Test-token airdrop (Shardeum Testnet only). The server wallet pays the network fee.
// Safety rules: fixed token and amount, one claim per address per day, a small limit per network (IP),
// a daily total limit, a short pause between claims, a reserve that is never given away,
// and only requests that come from this site's own pages.
const { ethers } = require("ethers");
const RPC = "https://api-mezame.shardeum.org";
const CPAY = "0xeB24350E1117083d27ab0fef346D2d25f03E380a";
const AMOUNT = "100";
const ABI = ["function transfer(address,uint256) returns (bool)", "function balanceOf(address) view returns (uint256)"];
const DAY = 24 * 3600 * 1000;
const MIN_CPAY = 500n * 10n ** 18n;   // always keep at least this much CPAY in the wallet
const MIN_SHM = 50n * 10n ** 18n;     // and at least this much SHM for fees
const RECV_MAX = 1000n * 10n ** 18n;   // people who already hold this much CPAY do not need more
const PER_IP_MAX = 10;                // claims per network per day (mobile networks share addresses, so not too small)
const GLOBAL_MAX = 30;                // claims per day in total (per running server copy)
const MIN_GAP_MS = 8000;              // pause between two claims
let seen = new Map(), ips = new Map(), day = [], lastAt = 0;   // best effort: reset when the server restarts

function prune(now) {
  const cut = now - DAY;
  day = day.filter((x) => x > cut);
  for (const [k, v] of seen) if (v < cut) seen.delete(k);
  for (const [k, v] of ips) { const f = v.filter((x) => x > cut); if (f.length) ips.set(k, f); else ips.delete(k); }
}
function allow(now, key, ip) {
  prune(now);
  if (now - lastAt < MIN_GAP_MS) return ["Please wait a few seconds and try again.", 429];
  if (day.length >= GLOBAL_MAX) return ["Many testers today. Please try again tomorrow.", 429];
  if (now - (seen.get(key) || 0) < DAY) return ["You already got CPAY in the last 24 hours", 429];
  if ((ips.get(ip) || []).length >= PER_IP_MAX) return ["Too many requests from this network today. Please try again tomorrow.", 429];
  return null;
}
function take(now, key, ip) { lastAt = now; seen.set(key, now); day.push(now); const l = ips.get(ip) || []; l.push(now); ips.set(ip, l); }
function give(key, ip, now) { seen.delete(key); const i = day.lastIndexOf(now); if (i > -1) day.splice(i, 1); const l = ips.get(ip) || []; const j = l.lastIndexOf(now); if (j > -1) l.splice(j, 1); lastAt = 0; }
function clientIp(req) {
  const h = (req.headers && req.headers["x-forwarded-for"]) || "";
  return String(h).split(",")[0].trim() || (req.socket && req.socket.remoteAddress) || "unknown";
}
const chain = {
  async info(to) {
    const p = new ethers.JsonRpcProvider(RPC, 8119, { staticNetwork: true });
    const w = new ethers.Wallet(process.env.AIRDROP_KEY, p);
    const t = new ethers.Contract(CPAY, ABI, w);
    return { p, t, cpay: await t.balanceOf(w.address), shm: await p.getBalance(w.address), recv: await t.balanceOf(to) };
  },
  async send(c, to) {
    const gasPrice = (await c.p.getFeeData()).gasPrice;
    const tx = await c.t.transfer(to, ethers.parseUnits(AMOUNT, 18), { type: 0, gasPrice });
    return tx.hash;
  },
};

async function handler(req, res) {
  const now = Date.now();
  let key = "", ip = "", taken = false;
  try {
    const sf = req.headers && req.headers["sec-fetch-site"];
    if (sf && sf !== "same-origin" && sf !== "none") return res.status(403).json({ error: "Not allowed" });
    const to = String((req.query && req.query.address) || "");
    if (!ethers.isAddress(to)) return res.status(400).json({ error: "Invalid address" });
    if (!process.env.AIRDROP_KEY) return res.status(500).json({ error: "Airdrop is not set up yet" });
    key = to.toLowerCase(); ip = clientIp(req);
    const no = allow(now, key, ip);
    if (no) return res.status(no[1]).json({ error: no[0] });
    take(now, key, ip); taken = true;
    const c = await handler._chain.info(to);
    const amount = ethers.parseUnits(AMOUNT, 18);
    if (c.cpay < MIN_CPAY + amount || c.shm < MIN_SHM) { give(key, ip, now); return res.status(503).json({ error: "The test faucet is resting. Please try again tomorrow." }); }
    if (c.recv >= RECV_MAX) { give(key, ip, now); return res.status(429).json({ error: "You already hold plenty of CPAY" }); }
    const hash = await handler._chain.send(c, to);
    return res.status(200).json({ ok: true, hash });
  } catch (e) {
    if (taken) give(key, ip, now);
    return res.status(500).json({ error: String(e.shortMessage || e.message).slice(0, 120) });
  }
}
handler._chain = chain;   // replaced only in tests
module.exports = handler;
