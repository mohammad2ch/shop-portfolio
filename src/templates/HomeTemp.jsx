import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
const HomeTemp = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand">{t("home.title")}</h1>
      <div className="mt-4 flex gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-lg bg-brand px-4 py-2 text-white"
        >
          {theme}
        </button>
        <button
          onClick={toggleLang}
          className="rounded-lg bg-brand px-4 py-2 text-white"
        >
          {lang}
        </button>
      </div>
    </div>
  );
};

export default HomeTemp;
