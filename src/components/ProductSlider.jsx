import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import ProductCard from "./ProductCard";
import { useLanguage } from "../context/LanguageContext";

const arrowBtn =
  "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 shadow-lg backdrop-blur transition-colors hover:border-brand hover:text-brand md:flex";

const skeletonVisibility = ["", "hidden sm:block", "hidden lg:block", "hidden lg:block"];

const ProductSlider = ({ products = [], isLoading, badge }) => {
  const { t, lang } = useLanguage();
  const swiperRef = useRef(null);
  const isRtl = lang === "fa";

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skeletonVisibility.map((v, i) => (
          <div
            key={i}
            className={`${v} aspect-3/4 animate-pulse rounded-3xl border border-border bg-surface`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label={t("bs.prev")}
        className={`${arrowBtn} start-2`}
      >
        <ChevronLeft size={20} className="rtl:rotate-180" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label={t("bs.next")}
        className={`${arrowBtn} end-2`}
      >
        <ChevronRight size={20} className="rtl:rotate-180" />
      </button>

      <Swiper
        key={lang}
        dir={isRtl ? "rtl" : "ltr"}
        modules={[Autoplay, A11y]}
        onSwiper={(s) => (swiperRef.current = s)}
        spaceBetween={24}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        loop={products.length > 4}
        grabCursor
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        className="py-4"
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <ProductCard product={p} badge={badge} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;