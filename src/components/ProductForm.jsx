import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import FormField from "./FormField";
import ImageUploader from "./ImageUploader";

const initial = { titleFa: "", titleEn: "", price: "", brand: "", code: "" };

const inputCls =
  "w-full rounded-2xl border bg-bg px-4 py-3 text-start outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

// برندهای موجود را از خود محصولات می‌سازد: [{ id, name }]
const getBrands = (products) => {
  const list = [];
  products.forEach((p) => {
    if (!list.some((b) => b.id === p.subCategory)) {
      list.push({ id: p.subCategory, name: p.subCategoryName });
    }
  });
  return list;
};

const ProductForm = ({ products, onSubmit, isPending }) => {
  const { t } = useLanguage();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const brands = useMemo(() => getBrands(products), [products]);
  const [images, setImages] = useState([]); // [{ id, file, url }]

  // ترجمه‌ی نام برند (مثلاً brand.samsung)، و اگر کلید نبود خود نام
  const brandLabel = (name) => {
    const key = `brand.${String(name).toLowerCase()}`;
    const text = t(key);
    return text === key ? name : text;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };
  const handleImages = (next) => {
    setImages(next);
    if (errors.images) setErrors((er) => ({ ...er, images: undefined }));
  };

  // کلید خطا را برمی‌گرداند (نه متن)، تا با عوض شدن زبان ترجمه شود
  const validate = () => {
    const e = {};
    const price = Number(values.price);
    const code = values.code.trim().toLowerCase();

    if (!values.titleFa.trim()) e.titleFa = "contact.error.required";
    if (!values.titleEn.trim()) e.titleEn = "contact.error.required";
    if (!values.price.trim() || !Number.isFinite(price) || price <= 0) {
      e.price = "ap.error.price";
    }
    if (!values.brand) e.brand = "contact.error.required";

    if (!code) e.code = "contact.error.required";
    else if (products.some((p) => String(p.code).toLowerCase() === code)) {
      e.code = "ap.error.codeTaken";
    }
    if (images.length === 0) e.images = "ap.error.images";
    return e;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("FORM SUBMITTED");
  e.stopPropagation();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    const brand = brands.find((b) => b.id === Number(values.brand));

    // همان شکل محصولات db.json (بدون id و image، که بعداً اضافه می‌شوند)
    onSubmit({
      code: values.code.trim(),
      title: values.titleFa.trim(),
      titleEN: values.titleEn.trim(),
      price: Number(values.price),
      category: 1,
      categoryName: "phone",
      subCategory: brand.id,
      subCategoryName: brand.name,
      image: images.map((i) => `/src/assets/imgs/phone/${i.file.name}`),
    });
  };

  const cls = (name) =>
    `${inputCls} ${errors[name] ? "border-red-500" : "border-border"}`;
  const err = (name) => errors[name] && t(errors[name]);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-black/5 md:p-10"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label={t("ap.titleFa")} error={err("titleFa")}>
          <input
            name="titleFa"
            dir="rtl"
            value={values.titleFa}
            onChange={handleChange}
            className={cls("titleFa")}
          />
        </FormField>
        <FormField label={t("ap.titleEn")} error={err("titleEn")}>
          <input
            name="titleEn"
            dir="ltr"
            value={values.titleEn}
            onChange={handleChange}
            className={cls("titleEn")}
          />
        </FormField>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label={t("ap.price")} error={err("price")}>
          <input
            name="price"
            inputMode="decimal"
            dir="ltr"
            value={values.price}
            onChange={handleChange}
            className={cls("price")}
          />
        </FormField>

        <FormField label={t("ap.brand")} error={err("brand")}>
          <select
            name="brand"
            value={values.brand}
            onChange={handleChange}
            className={cls("brand")}
          >
            <option value="">{t("ap.brand.select")}</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {brandLabel(b.name)}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label={t("ap.code")} error={err("code")}>
        <input
          name="code"
          dir="ltr"
          value={values.code}
          onChange={handleChange}
          className={cls("code")}
        />
      </FormField>

      <ImageUploader
        value={images}
        onChange={handleImages}
        error={err("images")}
      />
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:shadow-brand/50 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {isPending ? "uploading..." : t("ap.save")}
      </button>
    </form>
  );
};

export default ProductForm;
