import { Check } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const CategoryFilter = ({ categories, selected, onToggle }) => {
  const { t } = useLanguage();

  // ترجمه‌ی نام برند (مثلاً brand.samsung)، و اگر کلید نبود خود نام
  const label = (name) => {
    const key = `brand.${String(name).toLowerCase()}`;
    const text = t(key);
    return text === key ? name : text;
  };

  return (
    <ul className="space-y-1">
      {categories.map((c) => (
        <li key={c.id}>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-text/5">
            <input
              type="checkbox"
              checked={selected.includes(c.id)}
              onChange={() => onToggle(c.id)}
              className="peer sr-only"
            />
            <span className="flex h-5 w-5 items-center justify-center rounded-md border border-border transition-colors peer-checked:border-brand peer-checked:bg-brand peer-checked:[&>svg]:opacity-100 peer-focus-visible:ring-4 peer-focus-visible:ring-brand/30">
              <Check size={14} className="text-white opacity-0 transition-opacity" />
            </span>
            <span className="flex-1 text-start">{label(c.name)}</span>
            <span className="text-xs text-muted">{c.count}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;