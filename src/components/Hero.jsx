import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

//ایمپورت گیف ها
import s1d from "../assets/Hero/1-dark.gif";
import s1l from "../assets/Hero/1-light.gif";
import s2d from "../assets/Hero/2-dark.gif";
import s2l from "../assets/Hero/2-light.gif";
import s3d from "../assets/Hero/3-dark.gif";
import s3l from "../assets/Hero/3-light.gif";
import s4d from "../assets/Hero/4-dark.gif";
import s4l from "../assets/Hero/4-light.gif";

//ارتباط گیف ها
const scenes = [
  { key: "hero.scene1", img: { dark: s1d, light: s1l } },
  { key: "hero.scene2", img: { dark: s2d, light: s2l } },
  { key: "hero.scene3", img: { dark: s3d, light: s3l } },
  { key: "hero.scene4", img: { dark: s4d, light: s4l } },
];

const Hero = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const total = height - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -top / total)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.min(
    scenes.length - 1,
    Math.floor(progress * scenes.length),
  );

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Background glows */}
        <div className="pointer-events-none absolute -top-24 start-1/4 h-96 w-96 rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 end-1/4 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pt-24 md:grid-cols-2">
          {/* Text */}
          <div className="text-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm font-medium text-brand backdrop-blur">
              <Sparkles size={14} />
              {t("hero.badge")}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              {t("hero.title")}
            </h1>

            <p className="mt-5 max-w-lg text-lg text-muted">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-7 py-3 font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:shadow-brand/50"
              >
                {t("hero.cta")}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-border bg-surface/60 px-7 py-3 font-semibold backdrop-blur transition-colors hover:border-brand hover:text-brand"
              >
                {t("hero.secondary")}
              </Link>
            </div>

            {/* Progress bar */}
            <div className="mt-10 h-1 w-48 rounded-full bg-border">
              <div
                className="h-full rounded-full bg-linear-to-r from-brand to-fuchsia-500"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="relative mx-auto">
            <div
              className="relative h-[420px] w-[210px] rounded-[2.5rem] border-[10px] border-[#1a1625] bg-black shadow-2xl shadow-brand/30 transition-transform duration-150 ease-out md:h-[540px] md:w-[270px] md:rounded-[2.75rem] dark:border-[#2a2438]"
              style={{
                transform: `perspective(1200px) rotateY(${(0.5 - progress) * 30}deg) rotateX(${progress * 6}deg) scale(${1 + progress * 0.1})`,
              }}
            >
              {/* Notch */}
              <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

              {/* Screen */}
              {/* Screen */}
              <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] md:rounded-[2.1rem]">
                {scenes.map(({ key, img }, i) => (
                  <div
                    key={key}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={img[theme]}
                      alt={t(key)}
                      className="h-full w-full object-cover"
                    />
                    <p className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-4 pb-6 pt-16 text-center text-base font-bold text-white">
                      {t(key)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scene dots */}
            <div className="absolute -end-10 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
              {scenes.map((s, i) => (
                <span
                  key={s.key}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "h-8 bg-brand" : "h-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className={`absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-sm text-muted transition-opacity duration-300 ${
            progress > 0.05 ? "opacity-0" : "opacity-100"
          }`}
        >
          {t("hero.scroll")}
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
