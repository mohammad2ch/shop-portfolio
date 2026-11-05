import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
const HomeTemp = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  return (
    <div>
      <Hero />
      <Categories/>
      <BestSellers/>
    </div>
  );
};

export default HomeTemp;
