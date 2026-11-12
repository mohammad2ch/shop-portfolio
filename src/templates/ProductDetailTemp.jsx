import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import useProduct from "../hooks/useProduct";
import useUsdRate from "../hooks/useUsdRate";
import ProductGallery from "../components/ProductGallery";
import AddToCart from "../components/AddToCart";

const ProductDetailTemp = () => {
  const { id } = useParams(); // شماره‌ی محصول از آدرس: /products/:id
  const { t, lang } = useLanguage();
  const isRtl = lang === "fa";
  const navigate = useNavigate();
  const { data, isLoading, error } = useProduct(id);

  // هوک نرخ دلار آرایه می‌گیرد و همان را با فیلد rial برمی‌گرداند
  const list = useMemo(() => (data ? [data] : []), [data]);
  const { products } = useUsdRate(list);
  const product = products[0];

  // ترجمه‌ی نام برند (مثلاً brand.samsung)، و اگر کلید نبود خود نام
  const brandLabel = (name) => {
    const key = `brand.${String(name).toLowerCase()}`;
    const text = t(key);
    return text === key ? name : text;
  };

  const title = product ? (isRtl ? product.title : product.titleEN) : "";
  const price =
    product &&
    (isRtl && product.rial > 0
      ? `${product.rial.toLocaleString("fa-IR")} ریال`
      : `$${product.price.toLocaleString("en-US")}`);

  return (
    <section className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -top-24 start-1/4 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 md:pt-14">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t("pd.back")}
        </button>

        {/* در حال بارگذاری */}
      {isLoading && (
  <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
    <div className="mx-auto aspect-square w-full max-w-[460px] animate-pulse rounded-3xl border border-border bg-surface" />

    <div className="space-y-4">
      <div className="h-6 w-24 animate-pulse rounded-full bg-surface" />
      <div className="h-10 w-3/4 animate-pulse rounded-xl bg-surface" />
      <div className="h-10 w-1/2 animate-pulse rounded-xl bg-surface" />
    </div>
  </div>
)}

        {/* محصول پیدا نشد */}
        {error && (
          <p className="mt-10 text-center text-muted">{t("pd.notFound")}</p>
        )}

      {product && (
  <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">

    {/* عکس‌ها */}
    <div className="mx-auto w-full max-w-[460px]">
      <ProductGallery
        key={product.id}
        images={product.image}
        alt={title}
      />
    </div>

    {/* اطلاعات */}
    <div className="text-start lg:pt-4">
      <span className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
        {brandLabel(product.subCategoryName)}
      </span>

      <h1 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
        {title}
      </h1>

      <p className="mt-2 text-sm text-muted">
        {t("pd.code")}: <span dir="ltr">{product.code}</span>
      </p>

      <p className="mt-6 bg-linear-to-r from-brand to-fuchsia-500 bg-clip-text text-2xl font-extrabold text-transparent sm:text-4xl">
        {price}
      </p>

      <div className="mt-8 border-t border-border pt-8">
        <AddToCart productId={product.id} />
      </div>
    </div>
  </div>
)}
      </div>
    </section>
  );
};

export default ProductDetailTemp;
