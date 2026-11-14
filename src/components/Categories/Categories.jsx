import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

import phones from "../assets/categories/phones.png";
import accessories from "../assets/categories/accessories.png";
import headphones from "../assets/categories/headphones.png";
import laptops from "../assets/categories/laptops.png";

const categories = [
  { key: "cat.phones", desc: "cat.phones.desc", to: "/products", img: phones, frame: "from-amber-300 to-orange-400" },
  { key: "cat.accessories", desc: "cat.accessories.desc", to: "/products", img: accessories, frame: "from-pink-300 to-rose-400" },
  { key: "cat.headphones", desc: "cat.headphones.desc", to: "/products", img: headphones, frame: "from-violet-400 to-purple-500" },
  { key: "cat.laptops", desc: "cat.laptops.desc", to: "/products", img: laptops, frame: "from-fuchsia-400 to-pink-500" },
];

// حالت نمایان شدن در هاور یا فوکوس کیبورد
const show =
  "group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100";

const Categories = () => {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          {t("cat.title")}
        </h2>
        <p className="mt-3 text-muted">{t("cat.subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {categories.map(({ key, desc, to, img, frame }) => (
          <Link
            key={key}
            to={to}
            aria-label={t(key)}
            className={`group relative block aspect-square rounded-[2rem] bg-linear-to-br p-2.5 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus-visible:-translate-y-2 md:rounded-[2.5rem] md:p-3.5 ${frame}`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-surface md:rounded-[2rem]">
              <img
                src={img}
                alt={t(key)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-focus-visible:scale-110"
              />

              {/* لایه‌ی فید (دسکتاپ) */}
              <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-t from-violet-950/90 via-violet-950/55 to-violet-950/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 md:block" />

              {/* متن هاور (دسکتاپ) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden p-6 text-start text-white md:block">
                <h3 className={`translate-y-4 text-xl font-bold opacity-0 transition-all duration-500 ${show}`}>
                  {t(key)}
                </h3>
                <p className={`mt-2 translate-y-4 text-sm leading-relaxed text-white/80 opacity-0 transition-all delay-75 duration-500 ${show}`}>
                  {t(desc)}
                </p>
                <span className={`mt-4 inline-flex translate-y-4 items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium opacity-0 backdrop-blur transition-all delay-150 duration-500 ${show}`}>
                  {t("cat.cta")}
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </span>
              </div>

              {/* اسم ثابت (موبایل) */}
              <span className="absolute inset-x-3 bottom-3 rounded-full bg-bg/80 px-4 py-2 text-center text-sm font-semibold backdrop-blur md:hidden">
                {t(key)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;