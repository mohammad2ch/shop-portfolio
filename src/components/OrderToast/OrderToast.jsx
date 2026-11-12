import { toast } from "sonner";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";


const OrderToast = ({ id, orderNumber, duration }) => {
  const { t, lang } = useLanguage();
  const isRtl = lang === "fa";

  // شماره‌ی سفارش بدون جداکننده‌ی هزارگان، با رقم‌های همان زبان
  const number =
    orderNumber != null
      ? Number(orderNumber).toLocaleString(isRtl ? "fa-IR" : "en-US", { useGrouping: false })
      : null;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="group relative w-full overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-2xl shadow-black/20"
    >
      <div className="flex items-start gap-4">
        {/* دایره‌ی تیک */}
        <span className="anim-pop flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/40">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path className="anim-check" d="M5 13l4 4L19 7" />
          </svg>
        </span>

        {/* متن */}
        <div className="min-w-0 flex-1 text-start">
          <p className="font-bold">{t("order.placed.title")}</p>
          <p className="mt-1 text-sm text-muted">
            {t("order.placed.text")}{" "}
            {number && (
              <span dir="ltr" className="inline-block font-semibold text-text">
                #{number}
              </span>
            )}
          </p>
        </div>

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
          className="anim-bar h-full bg-linear-to-r from-brand to-fuchsia-500 ltr:origin-left rtl:origin-right group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export default OrderToast;