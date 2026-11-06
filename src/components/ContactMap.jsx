import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// برای تغییر مکان، این را عوض کن (آدرس کامل یا مختصات مثل "35.6892,51.3890")
const PLACE = "Tehran, Iran";

const ContactMap = () => {
  const { t, lang } = useLanguage();

  const src = `https://maps.google.com/maps?q=${encodeURIComponent(PLACE)}&hl=${lang}&z=11&output=embed`;

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-xl shadow-black/5">
      <div className="flex items-center gap-4 border-b border-border p-5 text-start">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/30">
          <MapPin size={22} />
        </span>
        <div>
          <h2 className="font-bold">{t("contact.map.title")}</h2>
          <p className="text-sm text-muted">{t("contact.map.text")}</p>
        </div>
      </div>

      <iframe
        key={lang}
        title={t("contact.map.title")}
        src={src}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[320px] w-full border-0 md:h-[420px] dark:[filter:invert(90%)_hue-rotate(180deg)]"
      />
    </div>
  );
};

export default ContactMap;