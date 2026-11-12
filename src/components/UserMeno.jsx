
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, LogOut, ChevronDown, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const UserMenu = ({ loginClassName = "" }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { lang, t } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const isRtl = lang === "fa";

  // بستن منو با کلیک بیرون از آن یا فشردن Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // اگر کاربر وارد نشده باشد
  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className={loginClassName}
      >
        {t("nav.login")}
      </Link>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      {/* دکمه گرد کاربر */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t("auth.account")}
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/30 bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:shadow-brand/40"
      >
        <UserRound size={19} />
      </button>

      {/* منوی کاربر */}
      <div
        dir={isRtl ? "rtl" : "ltr"}
  className={`absolute top-full z-[60] mt-3 w-64 origin-top rounded-2xl border border-border/60 bg-surface p-3 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-200 right-0 ${
    isOpen
      ? "visible translate-y-0 scale-100 opacity-100"
      : "pointer-events-none invisible -translate-y-2 scale-95 opacity-0"
  }`}
      >
        {/* اطلاعات کاربر */}
        <div className="flex items-center gap-3 rounded-xl bg-bg/70 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <UserRound size={20} />
          </div>

          <div className="min-w-0 flex-1 text-start">
            <p className="truncate text-sm font-bold text-text">
              {user?.name || user?.userName}
            </p>

            <p className="mt-1 text-xs text-muted">
              {t("auth.account")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={t("cart.close")}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-text/10 hover:text-text"
          >
            <X size={15} />
          </button>
        </div>

        {/* دکمه خروج */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10"
        >
          <span>{t("auth.logout")}</span>
          <LogOut size={17} className="rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
