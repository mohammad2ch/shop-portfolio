
import { toast } from "sonner";
import { X, Check, AlertCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const AuthToast = ({ id, success, message, duration = 4000 }) => {
  const { t, lang } = useLanguage();
  const isRtl = lang === "fa";

  const title = success
    ? t("auth.toast.success")
    : t("auth.toast.error");

  const Icon = success ? Check : AlertCircle;

  const color = success
    ? "text-green-600 bg-green-500/10 border-green-500/20"
    : "text-red-600 bg-red-500/10 border-red-500/20";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="group relative w-full overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-2xl shadow-black/20"
    >
      <div className="flex items-start gap-4">
        {/* آیکون وضعیت */}
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${color}`}
        >
          <Icon size={23} strokeWidth={2.5} />
        </span>

        {/* متن */}
        <div className="min-w-0 flex-1 text-start">
          <p className="font-bold">{title}</p>

          <p className="mt-1 text-sm text-muted">
            {message ||
              (success
                ? t("auth.toast.successMessage")
                : t("auth.toast.errorMessage"))}
          </p>
        </div>

        {/* دکمه بستن */}
        <button
          onClick={() => toast.dismiss(id)}
          aria-label={t("cart.close")}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-text/10 hover:text-text"
        >
          <X size={16} />
        </button>
      </div>

      {/* نوار زمان */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-border">
        <div
          className={`anim-bar h-full ${
            success ? "bg-green-500" : "bg-red-500"
          } ltr:origin-left rtl:origin-right group-hover:[animation-play-state:paused]`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export default AuthToast;
