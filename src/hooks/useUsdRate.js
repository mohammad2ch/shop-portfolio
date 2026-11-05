import { useEffect, useMemo, useState } from "react";

const DEFAULT_INTERVAL = 5 * 60 * 1000; // هم‌زمان با TTL سمت سرور

/**
 * نرخ دلار را از /usd-rate می‌گیرد و قیمت ریالی محصولات را حساب می‌کند.
 *
 * const { products, rate, loading, error, stale } = useUsdRate(rawProducts);
 */
export default function useUsdRate(products = [], { interval = DEFAULT_INTERVAL } = {}) {
  const [rate, setRate] = useState(null); // ریال به ازای ۱ دلار
  const [stale, setStale] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    let controller = null;

    const load = async () => {
      controller = new AbortController();
      try {
        const res = await fetch("/usd-rate", { signal: controller.signal });
        if (!res.ok) throw new Error(`usd-rate responded with ${res.status}`);
        const data = await res.json();
        if (!data.rate) throw new Error("invalid rate");
        if (!ignore) {
          setRate(data.rate);
          setStale(Boolean(data.stale));
          setError(null);
        }
      } catch (err) {
        if (err.name !== "AbortError" && !ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    const id = setInterval(load, interval);

    return () => {
      ignore = true;
      controller?.abort();
      clearInterval(id);
    };
  }, [interval]);

  const productsWithRial = useMemo(() => {
    if (!rate) return products;
    return products.map((p) => ({ ...p, rial: Math.round(p.price * rate) }));
  }, [products, rate]);

  return { products: productsWithRial, rate, loading, error, stale };
}
