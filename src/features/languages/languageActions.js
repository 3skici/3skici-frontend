import i18n from "../../i18n";

// actions/languageActions.js
export const setLanguage = (language) => {
  // Set language in i18n
  i18n.changeLanguage(language);
  localStorage.setItem("selectedLanguage", language);
  return {
    type: "SET_LANGUAGE",
    payload: language,
  };
};

const initialState = {
  language: localStorage.getItem("selectedLanguage") || "en",
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default languageReducer;
