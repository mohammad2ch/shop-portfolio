import { Toaster } from "sonner";
import { useLanguage } from "../context/LanguageContext";

const AppToaster = () => {
  const { lang } = useLanguage();

  // offset: کمی پایین‌تر از Header چسبنده
  return <Toaster position="top-center" offset={88} dir={lang === "fa" ? "rtl" : "ltr"} />;
};

export default AppToaster;