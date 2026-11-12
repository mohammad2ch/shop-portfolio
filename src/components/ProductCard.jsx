import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ProductCard = ({ product, badge }) => {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";
  const title = isRtl ? product.title : product.titleEN;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/10"
    >
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
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 text-start">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">
          {product.subCategoryName}
        </p>
        <h3 className="mt-2 line-clamp-2 min-h-12 text-sm font-semibold leading-6">
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold">
            {isRtl ? `${product.rial.toLocaleString("fa-IR")} ریال` :  `${product.price.toLocaleString("en-US")} $`}
            {/* {product.price.toLocaleString(isRtl ? "fa-IR" : "en-US")  } */}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
            <ArrowRight size={18} className="rtl:rotate-180" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;