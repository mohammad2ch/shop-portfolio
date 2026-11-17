import * as Slider from "@radix-ui/react-slider";
import { useLanguage } from "../../context/LanguageContext";

// تایپ فارسی و کاما را هم می‌فهمد: "۲,۰۰۰" → 2000
const parse = (text) =>
  Number(
    text
      .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
      .replace(/[,٬]/g, ""),
  );

const thumbCls =
  "block h-5 w-5 cursor-grab rounded-full border-4 border-brand bg-white shadow-lg outline-none focus-visible:ring-4 focus-visible:ring-brand/30 active:cursor-grabbing";

const inputCls =
  "w-full rounded-xl border border-border bg-bg py-2.5 pl-4 pr-8 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

const PriceFilter = ({
   
    //  max, step, value, onChange 
     max = 100000000,
  step = 100000,
  value = [0, 100000000],
  onChange = () => {},
    }) => {
  const { t, lang } = useLanguage();
  const [from, to] = value;

  // ورودی دستی: بعد از Enter یا خروج از کادر اعمال می‌شود
  const commitFrom = (e) => {
    const n = parse(e.target.value);
    if (Number.isNaN(n)) {
      e.target.value = from;
      return;
    }
    const v = Math.min(Math.max(n, 0), to);
    e.target.value = v;
    onChange([v, to]);
  };

  const commitTo = (e) => {
    const n = parse(e.target.value);
    if (Number.isNaN(n)) {
      e.target.value = to;
      return;
    }
    const v = Math.max(Math.min(n, max), from);
    e.target.value = v;
    onChange([from, v]);
  };

  const onEnter = (e) => e.key === "Enter" && e.target.blur();

  return (
    <div>
      {/* اسلایدر دو دستگیره */}
      <Slider.Root
        className="relative flex h-6 w-full touch-none select-none items-center"
        dir={lang === "fa" ? "rtl" : "ltr"}
        min={0}
        max={max}
        step={step}
        value={value}
        onValueChange={onChange}
      >
        <Slider.Track className="relative h-1.5 grow rounded-full bg-border">
          <Slider.Range className="absolute h-full rounded-full bg-linear-to-r from-brand to-fuchsia-500" />
        </Slider.Track>
        <Slider.Thumb aria-label={t("filters.from")} className={thumbCls} />
        <Slider.Thumb aria-label={t("filters.to")} className={thumbCls} />
      </Slider.Root>

      {/* ورودی دستی */}
      <div className="mt-5 flex items-end gap-3">
        <label className="flex-1 text-start">
          <span className="mb-1.5 block text-xs text-muted">{t("filters.from")}</span>
          <div className="relative">
            <input
              key={from}
              defaultValue={from}
              inputMode="numeric"
              dir="ltr"
              onBlur={commitFrom}
              onKeyDown={onEnter}
              className={inputCls}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
          </div>
        </label>

        <span className="pb-2.5 text-muted">–</span>

        <label className="flex-1 text-start">
          <span className="mb-1.5 block text-xs text-muted">{t("filters.to")}</span>
          <div className="relative">
            <input
              key={to}
              defaultValue={to}
              inputMode="numeric"
              dir="ltr"
              onBlur={commitTo}
              onKeyDown={onEnter}
              className={inputCls}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PriceFilter;