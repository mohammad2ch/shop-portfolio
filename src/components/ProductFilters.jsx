import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

const ProductFilters = ({
  categories,
  selected,
  onToggle,
  maxPrice,
  priceStep,
  priceRange,
  onPriceChange,
  hasActive,
  onReset,
}) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false); // باز یا بسته بودن، فقط روی موبایل اثر دارد

  return (
    <div className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-3xl border border-border bg-surface p-4 shadow-xl shadow-black/5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        {/* موبایل: دکمه‌ی باز و بسته. دسکتاپ: فقط عنوان (کلیک غیرفعال) */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex flex-1 items-center gap-2 text-start text-lg font-bold lg:pointer-events-none"
        >
          <SlidersHorizontal size={18} className="text-brand" />
          {t("filters.title")}
          {hasActive && <span className="h-2 w-2 rounded-full bg-brand" />}
          <ChevronDown
            size={18}
            className={`ms-auto text-muted transition-transform lg:hidden ${open ? "rotate-180" : ""}`}
          />
        </button>

        {hasActive && (
          <button
            onClick={onReset}
            className="shrink-0 text-sm font-medium text-brand transition-opacity hover:opacity-80"
          >
            {t("filters.reset")}
          </button>
        )}
      </div>

      {/* موبایل: فقط وقتی باز است. دسکتاپ: همیشه */}
      <div className={`${open ? "block" : "hidden"} lg:block `}>
        <div className="mt-6 border-t border-border pt-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
            {t("filters.category")}
          </h3>
          <CategoryFilter
            categories={categories}
            selected={selected}
            onToggle={onToggle}
          />
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-wide text-muted">
            {t("filters.price")}
          </h3>
          <PriceFilter
            max={maxPrice}
            step={priceStep}
            value={priceRange}
            onChange={onPriceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
