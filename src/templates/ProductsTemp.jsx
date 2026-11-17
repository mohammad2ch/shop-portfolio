import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import useProducts from "../hooks/useProducts";
import ProductFilters from "../components/ProductsComponents/ProductFilters";
import ProductCardProd from "../components/ProductsComponents/ProductCardProd";
import useUsdRate from "../hooks/useUsdRate";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
// ساخت فهرست دسته‌بندی‌ها
const buildCategories = (products) => {
  const list = [];

  products.forEach((p) => {
    let item = list.find((c) => c.id === p.subCategory);

    if (!item) {
      item = {
        id: p.subCategory,
        name: p.subCategoryName,
        count: 0,
      };
      list.push(item);
    }

    item.count += 1;
  });

  return list;
};

const ProductsTemp = () => {
  const { t, lang } = useLanguage();
  const dir = lang === "fa" ? "rtl" : "ltr";

  const { data: rawProducts = [], isLoading, error } = useProducts();
  const { products } = useUsdRate(rawProducts);
  const navigate = useNavigate();
  // محاسبه بیشترین قیمت واقعی محصولات
  const maxPrice = useMemo(() => {
    const prices = products
      .map((p) => Number(p.price))
      .filter((price) => Number.isFinite(price) && price >= 0);

    return Math.max(1, ...prices);
  }, [products]);

  // تنظیمات اسلایدر
  const priceStep = 1;

  // وضعیت فیلترها
  const [selected, setSelected] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1]);

  // هماهنگی قیمت با اطلاعات دریافتی از دیتابیس
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  // محاسبه دسته‌بندی‌ها
  const categories = useMemo(() => buildCategories(products), [products]);

  // فیلتر محصولات
  const filtered = products.filter((p) => {
    const categoryMatch =
      selected.length === 0 || selected.includes(p.subCategory);

    const productPrice = Number(p.price);

    const priceMatch =
      Number.isFinite(productPrice) &&
      productPrice >= priceRange[0] &&
      productPrice <= priceRange[1];

    return categoryMatch && priceMatch;
  });

  // تغییر دسته‌بندی
  const toggle = (id) => {
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );
  };

  // پاک کردن همه فیلترها
  const reset = () => {
    setSelected([]);
    setPriceRange([0, maxPrice]);
  };

  return (
    <section className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -top-24 start-1/4 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 md:pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {t("products.title")}
          </h1>

          <p className="mt-4 text-muted">{t("products.subtitle")}</p>
        </div>

        <div
          dir="ltr"
          className="mt-8 flex flex-col gap-5 lg:mt-12 lg:grid lg:grid-cols-[280px_1fr] lg:gap-8"
        >
          <div dir={dir} className="sticky top-20 z-30 lg:top-24 lg:self-start">
            {isLoading ? (
              <div className="h-72 animate-pulse rounded-3xl border border-border bg-surface" />
            ) : (
              <ProductFilters
                categories={categories}
                selected={selected}
                onToggle={toggle}
                maxPrice={maxPrice}
                priceStep={priceStep}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                hasActive={
                  selected.length > 0 ||
                  priceRange[0] !== 0 ||
                  priceRange[1] !== maxPrice
                }
                onReset={reset}
              />
            )}
          </div>

          <div dir={dir}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              {error ? (
                <p className="text-muted">{t("bs.error")}</p>
              ) : (
                <p className="text-muted">
                  {filtered.length.toLocaleString(
                    lang === "fa" ? "fa-IR" : "en-US",
                  )}{" "}
                  {t("products.found")}
                </p>
              )}

              <button
                type="button"
                onClick={() => navigate("/products/add")}
                className="flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-brand/40"
              >
                <Plus size={18} />
                {t("products.addProduct")}
              </button>
            </div>

            {/* لیست محصولات */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCardProd key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsTemp;
