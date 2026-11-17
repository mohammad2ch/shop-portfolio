import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import useProducts from "../hooks/useProducts";
import ProductForm from "../components/ProductsComponents/ProductForm";
import useCreateProduct from "../hooks/useCreateProduct";

const AddProductTemp = () => {
  const { t } = useLanguage();
  const { data: products = [], isLoading, error } = useProducts();
  const { mutate: createProduct, isPending } = useCreateProduct();
  return (
    <section className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -top-24 start-1/4 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-10 md:pt-14">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t("pd.back")}
        </Link>

        <div className="mt-6 text-start">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {t("ap.title")}
          </h1>
          <p className="mt-2 text-muted">{t("ap.subtitle")}</p>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="h-96 animate-pulse rounded-3xl border border-border bg-surface" />
          ) : error ? (
            <p className="text-muted">{t("bs.error")}</p>
          ) : (
            <ProductForm
              products={products}
              onSubmit={(productData) => createProduct(productData)}
              isPending={isPending}
            />
          )}
        </div>

       
      </div>
    </section>
  );
};

export default AddProductTemp;
