// Test-token airdrop (Shardeum Testnet only). The server wallet pays the network fee.
const { ethers } = require("ethers");
const RPC = "https://api-mezame.shardeum.org";
const CPAY = "0xeB24350E1117083d27ab0fef346D2d25f03E380a";
const seen = new Map(); // best-effort limit (resets when the server restarts)

module.exports = async (req, res) => {
  try {
    const to = String((req.query && req.query.address) || "");
    if (!ethers.isAddress(to)) return res.status(400).json({ error: "Invalid address" });
    if (!process.env.AIRDROP_KEY) return res.status(500).json({ error: "Airdrop is not set up yet" });
    const key = to.toLowerCase(), now = Date.now();
    if (now - (seen.get(key) || 0) < 24 * 3600 * 1000) return res.status(429).json({ error: "You already got CPAY in the last 24 hours" });
    const p = new ethers.JsonRpcProvider(RPC, 8119, { staticNetwork: true });
    const w = new ethers.Wallet(process.env.AIRDROP_KEY, p);
    const t = new ethers.Contract(CPAY, ["function transfer(address,uint256) returns (bool)", "function balanceOf(address) view returns (uint256)"], w);
    const amount = ethers.parseUnits("100", 18);
    if ((await t.balanceOf(to)) >= amount) return res.status(429).json({ error: "You already have CPAY" });
    const gasPrice = (await p.getFeeData()).gasPrice;
    const tx = await t.transfer(to, amount, { type: 0, gasPrice });
    seen.set(key, now);
    res.status(200).json({ ok: true, hash: tx.hash });
  } catch (e) {
    res.status(500).json({ error: String(e.shortMessage || e.message).slice(0, 120) });
  }
};
