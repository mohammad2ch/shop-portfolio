import { Link } from "react-router-dom";
import {
  ArrowUp,
  AtSign,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// لینک‌های سایت (همان کلیدهای هدر)
const links = [
  { to: "/", key: "nav.home" },
  { to: "/products", key: "nav.products" },
  { to: "/users", key: "nav.users" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

// نام برندها ترجمه نمی‌شه
const brands = ["Samsung", "Apple", "Xiaomi"];

// کلیدهای ترجمه: footer.f1.title / footer.f1.desc و ...
const features = [
  { icon: Truck, key: "footer.f1" },
  { icon: ShieldCheck, key: "footer.f2" },
  { icon: Headphones, key: "footer.f3" },
];

const socials = [
  { icon: Send, label: "Telegram", href: "#" },
  { icon: AtSign, label: "Instagram", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
];

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
  >
    <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
    {children}
  </Link>
);

const Footer = () => {
  const { lang, t } = useLanguage();
  const isRtl = lang === "fa";
  const year = new Date()
    .getFullYear()
    .toLocaleString(isRtl ? "fa-IR" : "en-US", {
      useGrouping: false,
    });

  return (
    <footer dir={isRtl ? "rtl" : "ltr"} className="px-4 pb-4 pt-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border/60 bg-surface/50 backdrop-blur-xl">
        {/* درخشش تزئینی پس‌زمینه */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 start-1/4 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 end-1/4 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl"
        />

        {/* نوار مزیت‌ها */}
        <div className="relative grid gap-4 border-b border-border/60 p-6 sm:grid-cols-3 md:px-8">
          {features.map(({ icon: Icon, key }) => (
            <div key={key} className="flex items-center gap-4 text-start">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand/15 to-fuchsia-500/15 text-brand">
                <Icon size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold">{t(`${key}.title`)}</p>
                <p className="text-xs text-muted">{t(`${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* بدنه اصلی */}
        <div className="relative grid gap-10 p-6 text-start md:grid-cols-2 md:p-8 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* برند */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/40">
                <ShoppingBag size={20} />
              </span>
              <span className="bg-linear-to-r from-text to-brand bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
                Shop
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
              {t("footer.tagline")}
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/60 text-text transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* دسترسی سریع */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">
              {t("footer.quick")}
            </h4>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{t(l.key)}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* برندها */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">
              {t("footer.brands")}
            </h4>
            <ul className="flex flex-col gap-3">
              {brands.map((b) => (
                <li key={b}>
                  <FooterLink to="/products">{b}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* تماس */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">
              {t("footer.contact")}
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-brand" />
                <span dir="ltr">support@shop.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-brand" />
                <span dir="ltr">+98 21 0000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="shrink-0 text-brand" />
                <span>{t("footer.address")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* نوار پایین */}
        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-border/60 px-6 py-5 text-xs text-muted sm:flex-row md:px-8">
          <p>
            © {year} Shop. {t("footer.rights")}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg/60 px-4 py-2 font-medium text-text transition-colors hover:border-brand hover:text-brand"
          >
            {t("footer.top")}
            <ArrowUp
              size={14}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
