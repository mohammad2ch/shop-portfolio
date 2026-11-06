import { useState } from "react";
import { Check, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import useSendMessage from "../hooks/useSendMessage";

const initial = { name: "", email: "", subject: "", message: "" };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ذخیره‌ی کلید خطا (نه متن)، تا با عوض شدن زبان ترجمه شود
const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = "contact.error.required";
  if (!v.email.trim()) e.email = "contact.error.required";
  else if (!emailRe.test(v.email)) e.email = "contact.error.email";
  if (!v.subject.trim()) e.subject = "contact.error.required";
  if (!v.message.trim()) e.message = "contact.error.required";
  else if (v.message.trim().length < 10) e.message = "contact.error.short";
  return e;
};

const inputClass =
  "w-full rounded-2xl border bg-bg px-4 py-3 text-start outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

const Field = ({ label, error, children }) => {
  return (
    <label className="block text-start">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-red-500">{error}</span>}
    </label>
  );
};

const ContactForm = () => {
  const { t } = useLanguage();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const { mutate, isPending, isSuccess, isError, reset } = useSendMessage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    mutate(values, { onSuccess: () => setValues(initial) });
  };

  const cls = (name) =>
    `${inputClass} ${errors[name] ? "border-red-500" : "border-border"}`;

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-black/5 md:p-10">
      {isSuccess ? (
        <div className="flex min-h-80 flex-col items-center justify-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/30">
            <Check size={30} />
          </span>
          <h2 className="mt-6 text-2xl font-bold">{t("contact.success.title")}</h2>
          <p className="mt-2 text-muted">{t("contact.success.text")}</p>
          <button
            onClick={reset}
            className="mt-8 rounded-full border border-border px-6 py-2.5 font-medium transition-colors hover:border-brand hover:text-brand"
          >
            {t("contact.success.again")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <h2 className="text-start text-2xl font-bold">{t("contact.form.title")}</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t("contact.form.name")} error={errors.name && t(errors.name)}>
              <input name="name" autoComplete="name" value={values.name} onChange={handleChange} className={cls("name")} />
            </Field>
            <Field label={t("contact.form.email")} error={errors.email && t(errors.email)}>
              <input name="email" type="email" autoComplete="email" dir="ltr" value={values.email} onChange={handleChange} className={cls("email")} />
            </Field>
          </div>

          <Field label={t("contact.form.subject")} error={errors.subject && t(errors.subject)}>
            <input name="subject" value={values.subject} onChange={handleChange} className={cls("subject")} />
          </Field>

          <Field label={t("contact.form.message")} error={errors.message && t(errors.message)}>
            <textarea name="message" rows={6} value={values.message} onChange={handleChange} className={`${cls("message")} resize-none`} />
          </Field>

          {isError && <p className="text-start text-sm text-red-500">{t("contact.fail")}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand to-fuchsia-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:shadow-brand/50 disabled:opacity-70 disabled:hover:translate-y-0 md:w-auto"
          >
            {isPending ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                {t("contact.sending")}
              </>
            ) : (
              <>
                {t("contact.send")}
                <Send size={18} className="rtl:-scale-x-100" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;