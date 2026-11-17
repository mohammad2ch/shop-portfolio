import { useLanguage } from "../../context/LanguageContext";
import useBestSellers from "../../hooks/useBestSellers";
import ProductSlider from "./ProductSlider";

const BestSellers = () => {
  const { t } = useLanguage();
  //   const { data, isLoading, error } = useBestSellers();
  const { data, isLoading, error, rateLoading, rateError } = useBestSellers();
  //console.log({ rial: data[0]?.rial, rateLoading, rateError });
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 text-start">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          {t("bs.title")}
        </h2>
        <p className="mt-3 text-muted">{t("bs.subtitle")}</p>
      </div>

      {error ? (
        <p className="text-muted">{t("bs.error")}</p>
      ) : (
        <ProductSlider
          products={data}
          isLoading={isLoading}
          badge={t("bs.badge")}
        />
      )}
    </section>
  );
};

export default BestSellers;
