import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import useCartStore from "../../hooks/cartStore";

const stepBtn =
  "flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-brand hover:text-white";

const ProductCardProd = ({ product, badge }) => {
  const { t, lang } = useLanguage();
  const isRtl = lang === "fa";
  const locale = isRtl ? "fa-IR" : "en-US";
  const title = isRtl ? product.title : product.titleEN;

  // تعداد این محصول در سبد (۰ اگر نیست)
  const qty = useCartStore(
    (s) => s.items.find((i) => i.id === product.id)?.qty ?? 0,
  );
  const add = useCartStore((s) => s.add);
  const decrease = useCartStore((s) => s.decrease);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/10">
      {/* عکس */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-linear-to-br from-brand/10 to-fuchsia-500/10">
          {badge && (
            <span className="absolute start-3 top-3 z-10 rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-3 py-1 text-xs font-semibold text-white">
              {badge}
            </span>
          )}
          <img
            src={product.image[0]}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* اطلاعات */}
      <div className="flex flex-1 flex-col p-3 text-start sm:p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-brand">
          {product.subCategoryName}
        </p>

        <Link to={`/products/${product.id}`} className="mt-1">
          <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 transition-colors hover:text-brand">
            {title}
          </h3>
        </Link>

        {/* قیمت price */}
        <p className="mt-3 text-base font-bold sm:text-lg">
          {isRtl && product.rial > 0
            ? `${product.rial.toLocaleString("fa-IR")} ریال`
            : `$${product.price.toLocaleString("en-US")}`}
        </p>

        {/* افزودن به سبد خرید */}
        <div className="mt-auto pt-3">
          {qty === 0 ? (
            <button
              onClick={() => add(product.id)}
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-3 py-2.5 text-xs font-semibold text-white shadow-md shadow-brand/30 transition-all hover:-translate-y-0.5 hover:shadow-brand/50 active:translate-y-0 sm:gap-2 sm:text-sm"
            >
              <ShoppingCart size={16} className="shrink-0" />
              <span className="truncate">{t("cart.add")}</span>
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-full border border-border bg-bg p-1">
              <button
                onClick={() => decrease(product.id)}
                aria-label={qty === 1 ? t("cart.remove") : t("cart.decrease")}
                className={stepBtn}
              >
                {qty === 1 ? <Trash2 size={15} /> : <Minus size={15} />}
              </button>
              <span className="text-sm font-bold">
                {qty.toLocaleString(locale)}
              </span>
              <button
                onClick={() => add(product.id)}
                aria-label={t("cart.increase")}
                className={stepBtn}
              >
                <Plus size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCardProd;
