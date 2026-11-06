import { Link } from "react-router-dom";
import { ArrowRight, Headphones, Info, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// عددها نمونه‌اند
const stats = [
  { value: 10000, plus: true, label: "about.stat1" },
  { value: 500, plus: true, label: "about.stat2" },
  { value: 30, plus: true, label: "about.stat3" },
  { value: 4.9, plus: false, label: "about.stat4" },
];

const values = [
  { Icon: ShieldCheck, title: "about.v1.title", text: "about.v1.text" },
  { Icon: Truck, title: "about.v2.title", text: "about.v2.text" },
  { Icon: Headphones, title: "about.v3.title", text: "about.v3.text" },
];

const AboutTemp = () => {
  const { t, lang } = useLanguage();
  const format = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });

  return (
    <section className="relative overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-24 start-1/4 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 end-1/4 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 md:pt-20">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm font-medium text-brand backdrop-blur">
            <Info size={14} />
            {t("about.badge")}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            {t("about.title")}
          </h1>
          <p className="mt-5 text-lg text-muted">{t("about.subtitle")}</p>
        </div>

        {/* Story + stats */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <div className="text-start">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {t("about.story.title")}
            </h2>
            <p className="mt-5 leading-8 text-muted">{t("about.story.p1")}</p>
            <p className="mt-4 leading-8 text-muted">{t("about.story.p2")}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, plus, label }) => (
              <div
                key={label}
                className="rounded-3xl border border-border bg-surface p-6 text-start transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10"
              >
                <p className="bg-linear-to-r from-brand to-fuchsia-500 bg-clip-text text-4xl font-extrabold text-transparent">
                  {format.format(value)}
                  {plus && "+"}
                </p>
                <p className="mt-2 text-sm text-muted">{t(label)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            {t("about.values.title")}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-3xl border border-border bg-surface p-7 text-start transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/30 transition-transform group-hover:scale-110">
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{t(title)}</h3>
                <p className="mt-2 leading-7 text-muted">{t(text)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl bg-linear-to-br from-brand to-fuchsia-500 p-10 text-center text-white shadow-xl shadow-brand/30 md:p-14">
          <h2 className="text-2xl font-extrabold md:text-4xl">{t("about.cta.title")}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-violet-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {t("about.cta.button")}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/40 px-7 py-3 font-semibold transition-colors hover:bg-white/15"
            >
              {t("about.cta.contact")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTemp;