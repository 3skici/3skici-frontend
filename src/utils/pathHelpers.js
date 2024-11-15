// utils.js
export const getPathWithLanguage = (path, langCode) => {
  let segments = path.split('/');
  if (['en', 'ar', 'tr'].includes(segments[1])) {
    segments[1] = langCode; // Replace current language
  } else {
    segments.splice(1, 0, langCode); // Add the current language prefix
  }
  return segments.join('/');
};
