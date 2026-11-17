import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "../NotFound.css";

const NotFoundTemp = () => {
  const { t } = useLanguage();

  return (
    <main
      dir="rtl"
      className="not-found relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-bg px-5 py-16"
    >
      {/* پس‌زمینه متحرک */}
      <div className="nf-glow nf-glow-one" />
      <div className="nf-glow nf-glow-two" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* تصویرسازی مرکزی */}
        <div className="nf-scene relative mx-auto mb-8 flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
          <div className="nf-orbit nf-orbit-one" />
          <div className="nf-orbit nf-orbit-two" />
          <div className="nf-orbit nf-orbit-three" />

          <div className="nf-number absolute inset-0 flex items-center justify-center">
            404
          </div>

          <div className="nf-phone relative z-10 flex h-28 w-16 items-center justify-center rounded-[22px] border-[5px] border-border bg-surface shadow-2xl sm:h-36 sm:w-20">
            <div className="absolute top-2 h-1 w-6 rounded-full bg-border" />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand sm:h-14 sm:w-14">
              <Search size={27} strokeWidth={1.8} />
            </div>
            <div className="absolute bottom-1.5 h-1 w-5 rounded-full bg-border" />
          </div>

          <div className="nf-float nf-float-one absolute right-5 top-8 flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface text-brand shadow-lg">
            <ShoppingBag size={20} />
          </div>

          <div className="nf-float nf-float-two absolute bottom-10 left-2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-brand shadow-lg">
            <Sparkles size={18} />
          </div>

          <span className="nf-dot absolute right-12 bottom-12 h-2 w-2 rounded-full bg-brand" />
          <span className="nf-dot nf-dot-delay absolute left-12 top-12 h-3 w-3 rounded-full bg-brand/60" />
        </div>

        {/* متن */}
        <div className="nf-content">
          <p className="mb-3 text-sm font-bold tracking-[0.25em] text-brand">
            {t("nf.label")}
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            {t("nf.title")}
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
            {t("nf.description")}
          </p>

          {/* دکمه‌ها */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="nf-primary-btn inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-1 hover:shadow-xl sm:w-auto"
            >
              <Home size={17} />
              {t("nf.home")}
            </Link>

            <Link
              to="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-6 py-3.5 text-sm font-bold text-text transition hover:-translate-y-1 hover:border-brand hover:text-brand sm:w-auto"
            >
              {t("nf.products")}
              <ArrowLeft size={17} />
            </Link>
          </div>
        </div>

        <div className="nf-bottom-line mx-auto mt-12 h-px w-24 bg-gradient-to-l from-transparent via-brand/60 to-transparent" />
      </div>
    </main>
  );
};

export default NotFoundTemp;