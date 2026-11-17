import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Languages,
  Menu,
  Moon,
  ShoppingBag,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import useUsdRate from "../hooks/useUsdRate";
import UserMenu from "../components/UserMeno/UserMeno";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/products", key: "nav.products" },
  { to: "/users", key: "nav.users" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-linear-to-r from-brand to-fuchsia-500 text-white shadow-md shadow-brand/30"
      : "text-muted hover:bg-text/5 hover:text-text"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
    isActive
      ? "bg-linear-to-r from-brand to-fuchsia-500 text-white shadow-md shadow-brand/30"
      : "text-text hover:bg-text/5"
  }`;

const iconBtn =
  "group flex h-10 items-center justify-center gap-1.5 rounded-full border border-border bg-bg/60 px-3 text-sm font-medium text-text transition-colors hover:border-brand hover:text-brand";

const DESKTOP_BREAKPOINT = 800; // باید با min-[800px]: در کلاس‌ها یکی باشد

// لوگو بیرون از Header تعریف شده تا با هر رندر دوباره ساخته نشود
const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5">
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/40">
      <ShoppingBag size={20} />
    </span>
    <span className="bg-linear-to-r from-text to-brand bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
      Shop
    </span>
  </Link>
);

// نمایش نرخ دلار. اندازه و display از بیرون (className) تعیین می‌شود.
const RateBadge = ({
  rate,
  loading,
  error,
  stale,
  lang,
  t,
  className = "",
}) => {
  const isFa = lang === "fa";
  const failed = error && !rate;
  const dotColor = failed
    ? "bg-red-500"
    : stale
      ? "bg-amber-500"
      : "bg-emerald-500";
  const live = rate && !stale && !error;

  return (
    <div
      dir={isFa ? "rtl" : "ltr"}
      title={stale ? t("rate.stale") : undefined}
      className={`items-center gap-2 rounded-full border border-border/60 bg-bg/60 px-3 ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {live && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`}
        />
      </span>
      <span className="whitespace-nowrap text-muted">{t("rate.label")}</span>
      <span className="whitespace-nowrap font-bold tabular-nums text-text">
        {rate
          ? rate.toLocaleString(isFa ? "fa-IR" : "en-US")
          : loading
            ? "···"
            : "—"}
      </span>
      {rate && (
        <span className="whitespace-nowrap text-muted">{t("rate.unit")}</span>
      )}
    </div>
  );
};

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const { pathname } = useLocation();
  const { rate, loading, error, stale } = useUsdRate(); // فقط نرخ، بدون محصول
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const rateProps = { rate, loading, error, stale, lang, t };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // بستن منو بعد از رفتن به صفحه دیگر
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // قفل اسکرول صفحه + بستن با Escape + بستن هنگام بزرگ شدن صفحه
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () =>
      window.innerWidth >= DESKTOP_BREAKPOINT && setOpen(false);

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      dir="ltr"
      className="sticky top-0 z-50 px-4 pt-3 pb-4 min-[800px]:pb-0"
    >
      {/* ================= Desktop ================= */}
      <div
        className={`mx-auto hidden h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center rounded-2xl border border-border/60 px-4 backdrop-blur-xl transition-all duration-300 min-[800px]:grid ${
          scrolled ? "bg-surface/90 shadow-xl shadow-black/10" : "bg-surface/50"
        }`}
      >
        {/* Logo + نرخ دلار */}
        <div className="flex items-center gap-3 justify-self-start">
          <Logo />
          <RateBadge {...rateProps} className="hidden py-1.5 text-xs lg:flex" />
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1 rounded-full border border-border/60 bg-bg/60 p-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={linkClass}
            >
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-self-end">
          <button
            onClick={toggleLang}
            className={iconBtn}
            aria-label="Change language"
          >
            <Languages size={16} />
            {lang === "en" ? "FA" : "EN"}
          </button>

          <button
            onClick={toggleTheme}
            className={`${iconBtn} w-10 px-0`}
            aria-label="Toggle theme"
          >
            <span className="transition-transform duration-500 group-hover:rotate-180">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </span>
          </button>

          {/* login */}

          <UserMenu loginClassName="rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:shadow-brand/50" />
        </div>
      </div>

      {/* ================= Mobile / Tablet ================= */}
      <div className="relative min-[800px]:hidden">
        {/* پس‌زمینه تیره پشت منو */}
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        {/* نوار بالا */}
        <div
          className={`relative mx-auto flex h-14 max-w-7xl items-center justify-between rounded-2xl border border-border/60 px-3 backdrop-blur-xl transition-all duration-300 ${
            scrolled || open
              ? "bg-surface/90 shadow-xl shadow-black/10"
              : "bg-surface/50"
          }`}
        >
          <Logo />

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className={iconBtn}
              aria-label="Change language"
            >
              <Languages size={16} />
              {lang === "en" ? "FA" : "EN"}
            </button>

            <button
              onClick={toggleTheme}
              className={`${iconBtn} w-10 px-0`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-brand to-fuchsia-500 text-white shadow-md shadow-brand/30"
            >
              <Menu
                size={20}
                className={`absolute transition-all duration-300 ${
                  open
                    ? "rotate-90 scale-50 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                size={20}
                className={`absolute transition-all duration-300 ${
                  open
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-50 opacity-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* پنل منو */}
        <div
          id="mobile-menu"
          dir={lang === "fa" ? "rtl" : "ltr"}
          className={`absolute inset-x-0 top-full mx-auto mt-2 w-full max-w-7xl origin-top overflow-hidden rounded-2xl border border-border/60 bg-surface/95 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none invisible -translate-y-3 scale-95 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 p-3">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={mobileLinkClass}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
              >
                {t(l.key)}
                <ChevronRight size={18} className="opacity-60 rtl:rotate-180" />
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-border/60 p-3">
            {/* نرخ دلار در منوی موبایل */}
            <RateBadge
              {...rateProps}
              className="mb-3 flex w-full justify-center py-2.5 text-sm"
            />

          {/* login */}
            <div className="flex justify-center">
              <UserMenu loginClassName="flex w-full items-center justify-center rounded-xl bg-linear-to-r from-brand to-fuchsia-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-brand/30 transition-all active:scale-[0.98]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
