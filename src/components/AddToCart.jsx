import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import useCartStore from "../hooks/cartStore";

const stepBtn =
  "flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-brand hover:text-white";

const AddToCart = ({ productId }) => {
  const { t, lang } = useLanguage();
  const locale = lang === "fa" ? "fa-IR" : "en-US";

  const qty = useCartStore(
    (s) => s.items.find((i) => i.id === productId)?.qty ?? 0,
  );
  const add = useCartStore((s) => s.add);
  const decrease = useCartStore((s) => s.decrease);

  if (qty === 0) {
    return (
      <button
        onClick={() => add(productId)}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:shadow-brand/50 active:translate-y-0 sm:w-auto sm:min-w-64"
      >
        <ShoppingCart size={20} />
        {t("cart.add")}
      </button>
    );
  }

  return (
    <div className="flex w-full items-center justify-between rounded-full border border-border bg-bg p-1 sm:w-auto sm:min-w-64">
      <button
        onClick={() => decrease(productId)}
        aria-label={qty === 1 ? t("cart.remove") : t("cart.decrease")}
        className={stepBtn}
      >
        {qty === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
      </button>
      <span className="text-lg font-bold">{qty.toLocaleString(locale)}</span>
      <button
        onClick={() => add(productId)}
        aria-label={t("cart.increase")}
        className={stepBtn}
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default AddToCart;