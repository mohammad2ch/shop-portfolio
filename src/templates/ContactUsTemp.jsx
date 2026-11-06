import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ContactForm from "../components/ContactForm";
import ContactMap from "../components/ContactMap";

const ContactUsTemp = () => {
  const { t } = useLanguage();

  // این مقادیر نمونه‌اند، با اطلاعات واقعی فروشگاهت عوضشان کن
  const items = [
    { Icon: Mail, label: t("contact.email"), value: "support@yourshop.com", href: "mailto:support@yourshop.com", ltr: true },
    { Icon: Phone, label: t("contact.phone"), value: "+98 21 0000 0000", href: "tel:+982100000000", ltr: true },
    { Icon: MapPin, label: t("contact.address"), value: t("contact.addressValue") },
    { Icon: Clock, label: t("contact.hours"), value: t("contact.hoursValue") },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-24 start-1/4 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 end-1/4 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 md:pt-20">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm font-medium text-brand backdrop-blur">
            <Mail size={14} />
            {t("contact.badge")}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            {t("contact.title")}
          </h1>
          <p className="mt-5 text-lg text-muted">{t("contact.subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info cards */}
          <div className="space-y-4 lg:col-span-2">
            {items.map(({ Icon, label, value, href, ltr }) => {
              const Wrapper = href ? "a" : "div";
              return (
                <Wrapper
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 rounded-3xl border border-border bg-surface p-5 text-start transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-fuchsia-500 text-white shadow-lg shadow-brand/30 transition-transform group-hover:scale-110">
                    <Icon size={22} />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{label}</span>
                    <span dir={ltr ? "ltr" : undefined} className="mt-0.5 inline-block font-semibold">
                      {value}
                    </span>
                  </span>
                </Wrapper>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
      <ContactMap/>
    </section>
  );
};

export default ContactUsTemp;