import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Languages, Moon, ShoppingBag, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

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

const iconBtn =
  "group flex h-10 items-center justify-center gap-1.5 rounded-full border border-border bg-bg/60 px-3 text-sm font-medium text-text transition-colors hover:border-brand hover:text-brand";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header dir="ltr" className="sticky top-0 z-50 px-4 pt-3">
      <div
        className={`mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center rounded-2xl border border-border/60 px-4 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-surface/90 shadow-xl shadow-black/10"
            : "bg-surface/50"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 justify-self-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/40">
            <ShoppingBag size={20} />
          </span>
          <span className="bg-linear-to-r from-text to-brand bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
            Shop
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 rounded-full border border-border/60 bg-bg/60 p-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-self-end">
          <button onClick={toggleLang} className={iconBtn} aria-label="Change language">
            <Languages size={16} />
            {lang === "en" ? "FA" : "EN"}
          </button>

          <button onClick={toggleTheme} className={`${iconBtn} w-10 px-0`} aria-label="Toggle theme">
            <span className="transition-transform duration-500 group-hover:rotate-180">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </span>
          </button>

          <Link
            to="/login"
            className="rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:shadow-brand/50"
          >
            {t("nav.login")}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;