import i18n from "i18next";

const LocalizedFontWrapper = ({ children }) => {
  const currentLang = i18n.language;
  const fontClass =
    currentLang === "ar"
      ? "font-cairo"
      : currentLang === "tr"
      ? "font-noto"
      : "font-nunito";

  return <div className={fontClass}>{children}</div>;
};
export default LocalizedFontWrapper;
