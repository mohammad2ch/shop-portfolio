import { useRef, useState } from "react";
import { ImagePlus, Star, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const MAX_IMAGES = 4;
const MAX_SIZE = 5 * 1024 * 1024; // ۵ مگابایت

const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-full bg-bg/90 shadow backdrop-blur transition-colors hover:bg-brand hover:text-white";

// value: لیست عکس‌ها [{ id, file, url }]، و onChange لیست جدید را برمی‌گرداند
const ImageUploader = ({ value, onChange, error }) => {
  const { t } = useLanguage();
  const inputRef = useRef(null);
  const [problem, setProblem] = useState(""); // کلید پیام مشکل، یا خالی

  const handlePick = (e) => {
    const picked = Array.from(e.target.files);
    e.target.value = ""; // تا بشود همان فایل را دوباره انتخاب کرد

    const room = MAX_IMAGES - value.length;
    const valid = picked.filter(
      (f) => f.type.startsWith("image/") && f.size <= MAX_SIZE,
    );

    if (valid.length < picked.length) setProblem("ap.images.invalid");
    else if (valid.length > room) setProblem("ap.images.max");
    else setProblem("");

    const added = valid.slice(0, room).map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file), // آدرس موقت برای پیش‌نمایش
    }));
    if (added.length) onChange([...value, ...added]);
  };

  const remove = (id) => {
    const item = value.find((i) => i.id === id);
    if (item) URL.revokeObjectURL(item.url); // آزاد کردن حافظه
    onChange(value.filter((i) => i.id !== id));
  };

  // عکس را به ابتدای لیست می‌برد (می‌شود عکس اصلی)
  const makeMain = (id) => {
    const item = value.find((i) => i.id === id);
    onChange([item, ...value.filter((i) => i.id !== id)]);
  };

  return (
    <div className="text-start">
      <p className="mb-1 text-sm font-medium">{t("ap.images")}</p>
      <p className="mb-3 text-xs text-muted">{t("ap.images.hint")}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {value.map((item, index) => (
          <div
            key={item.id}
            className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-linear-to-br from-brand/10 to-fuchsia-500/10"
          >
            <img src={item.url} alt="" className="h-full w-full object-contain p-2" />

            {index === 0 && (
              <span className="absolute start-2 top-2 rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {t("ap.images.main")}
              </span>
            )}

            <button
              type="button"
              onClick={() => remove(item.id)}
              aria-label={t("ap.images.remove")}
              className={`${iconBtn} absolute end-2 top-2`}
            >
              <X size={16} />
            </button>

            {index > 0 && (
              <button
                type="button"
                onClick={() => makeMain(item.id)}
                aria-label={t("ap.images.makeMain")}
                className={`${iconBtn} absolute bottom-2 end-2`}
              >
                <Star size={15} />
              </button>
            )}
          </div>
        ))}

        {/* کادر افزودن */}
        {value.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-sm text-muted transition-colors hover:border-brand hover:text-brand"
          >
            <ImagePlus size={26} />
            {t("ap.images.add")}
            <span className="text-xs">
              {value.length}/{MAX_IMAGES}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handlePick}
      />

      {(problem || error) && (
        <p className="mt-2 text-sm text-red-500">{problem ? t(problem) : error}</p>
      )}
    </div>
  );
};

export default ImageUploader;