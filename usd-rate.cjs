const TGJU_URL = "https://call5.tgju.org/ajax.json";
const TTL = 5 * 60 * 1000; // ۵ دقیقه

let cache = null; // { data, fetchedAt }
let inflight = null;

// "2,689,000" یا "۲,۶۸۹,۰۰۰" → 2689000
const toNumber = (value) => {
  const clean = String(value)
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[,٬\s]/g, "");
  const n = Number(clean);
  return Number.isFinite(n) ? n : null;
};

// کلید را هر جای JSON که باشد پیدا می‌کند
const findKey = (obj, key) => {
  if (!obj || typeof obj !== "object") return null;
  if (key in obj) return obj[key];
  for (const v of Object.values(obj)) {
    const found = findKey(v, key);
    if (found !== null && found !== undefined) return found;
  }
  return null;
};

const fetchRate = async () => {
  const res = await fetch(TGJU_URL, {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`tgju responded with ${res.status}`);

  const json = await res.json();
  const item = findKey(json, "price_dollar_rl");
  const rate = item && toNumber(item.p);
  if (!rate) throw new Error("price_dollar_rl not found in response");

  return {
    rate, // ریال به ازای ۱ دلار
    high: toNumber(item.h),
    low: toNumber(item.l),
    unit: "IRR",
    source: "tgju.org",
    tgjuDate: item.ts,
  };
};

const getRate = () => {
  if (!inflight) inflight = fetchRate().finally(() => (inflight = null));
  return inflight;
};

// سرور Vite از Connect استفاده می‌کند، نه Express:
// req.path و res.json و res.status وجود ندارند، پس خودمان می‌سازیم.
const sendJson = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
};

module.exports = async (req, res, next) => {
  const path = (req.url || "").split("?")[0];
  if (path !== "/usd-rate") return next();

  const send = (data, extra = {}) =>
    sendJson(res, 200, {
      ...data,
      fetchedAt: new Date(cache.fetchedAt).toISOString(),
      ...extra,
    });

  // کش تازه
  if (cache && Date.now() - cache.fetchedAt < TTL) {
    return send(cache.data, { stale: false });
  }

  try {
    cache = { data: await getRate(), fetchedAt: Date.now() };
    return send(cache.data, { stale: false });
  } catch (err) {
    console.error("[usd-rate]", err.message);
    // اگر tgju خراب بود، آخرین نرخ ذخیره‌شده را بده
    if (cache) return send(cache.data, { stale: true });
    return sendJson(res, 503, { error: "rate unavailable" });
  }
};
