import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import useCartStore from "../hooks/cartStore";
import useProducts from "../hooks/useProducts";
import useUsdRate from "../hooks/useUsdRate";
import { toast } from "sonner";
import OrderToast from "./orderToast/OrderToast";
import showOrderToast from "../utils/showOrderToast";
import { useAuth } from "../context/AuthContext";

const stepBtn =
  "flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors hover:border-brand hover:bg-brand hover:text-white";

const MiniCart = () => {
  const { t, lang } = useLanguage();
  const isRtl = lang === "fa";
  const locale = isRtl ? "fa-IR" : "en-US";
  const ref = useRef(null);

  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const setOpen = useCartStore((s) => s.setOpen);
  const add = useCartStore((s) => s.add);
  const decrease = useCartStore((s) => s.decrease);

  // سبد فقط id و تعداد دارد، پس اطلاعات محصول را از سرور می‌گیریم
  const { data: rawProducts = [] } = useProducts();
  const { products } = useUsdRate(rawProducts);

  const lines = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
    .filter((l) => l.product);

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  // قیمت: ریال (فارسی و نرخ آماده) وگرنه دلار
  const showRial =
    isRtl && lines.length > 0 && lines.every((l) => l.product.rial > 0);
  const unit = (p) => (showRial ? p.rial : p.price);
  const money = (n) =>
    showRial
      ? `${n.toLocaleString("fa-IR")} ریال`
      : `$${n.toLocaleString("en-US")}`;
  const total = lines.reduce((sum, l) => sum + unit(l.product) * l.qty, 0);

  // بستن با کلیک بیرون یا کلید Esc
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, setOpen]);

  // sonner for alert

  // const handleOrder = () => {
  //   toast.custom((id) => <OrderToast toastId={id} />, { duration: 5000 });
  // };

  const handleOrder = () => {
    if (!isAuthenticated) {
      navigate("/login");
      setOpen(!isOpen)
      return;
    }

    showOrderToast(1024);
   
  };

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    // left-5 عمداً فیزیکی است: سبد در هر دو زبان سمت چپ می‌ماند
    <div
      ref={ref}
      dir={isRtl ? "rtl" : "ltr"}
      className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-3"
    >
      {isOpen && (
        <section className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-black/20 transition-all duration-300 starting:translate-y-3 starting:opacity-0">
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-bold">{t("cart.title")}</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("cart.close")}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-text/10"
            >
              <X size={18} />
            </button>
          </header>

          {lines.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted">
              {t("cart.empty")}
            </p>
          ) : (
            <>
              <ul className="max-h-72 divide-y divide-border overflow-y-auto">
                {lines.map(({ product: p, qty }) => (
                  <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                    <img
                      src={p.image[0]}
                      alt=""
                      className="h-14 w-14 shrink-0 rounded-xl bg-linear-to-br from-brand/10 to-fuchsia-500/10 object-contain p-1"
                    />
                    <div className="min-w-0 flex-1 text-start">
                      <p className="line-clamp-1 text-xs font-semibold">
                        {isRtl ? p.title : p.titleEN}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {money(unit(p))}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrease(p.id)}
                            aria-label={
                              qty === 1 ? t("cart.remove") : t("cart.decrease")
                            }
                            className={stepBtn}
                          >
                            {qty === 1 ? (
                              <Trash2 size={13} />
                            ) : (
                              <Minus size={13} />
                            )}
                          </button>
                          <span className="min-w-5 text-center text-sm font-bold">
                            {qty.toLocaleString(locale)}
                          </span>
                          <button
                            onClick={() => add(p.id)}
                            aria-label={t("cart.increase")}
                            className={stepBtn}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="text-xs font-bold">
                          {money(unit(p) * qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <footer className="border-t border-border px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted">{t("cart.total")}</span>
                  <span className="font-bold">{money(total)}</span>
                </div>
                {/* <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="mt-4 block rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5"
                >
                  {t("cart.view")}
                </Link> */}
                <button
                  onClick={handleOrder}
                  className="mt-4 block rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5"
                >
                  {t("cart.view")}
                </button>
              </footer>
            </>
          )}
        </section>
      )}

      {/* دکمه‌ی گرد همیشه‌حاضر با تعداد کل */}
      <button
        onClick={() => setOpen(!isOpen)}
        aria-label={t("cart.title")}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-xl shadow-brand/40 transition-transform hover:scale-105 active:scale-95"
      >
        <ShoppingCart size={22} />
        {count > 0 && (
          <span className="absolute -end-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-violet-700 shadow">
            {count.toLocaleString(locale)}
          </span>
        )}
      </button>
    </div>
  );
};

export default MiniCart;
