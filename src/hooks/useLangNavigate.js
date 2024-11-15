import { useNavigate, useLocation } from 'react-router-dom';
import i18n from 'i18next';

const useLangNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = i18n.language || 'en'; // Default to English if not set

  const navigateWithLang = (targetPath) => {
    const pathSegments = location.pathname.split('/');
    const currentLangSegment = pathSegments[1];

    let newPath = targetPath;
    if (['en', 'ar', 'tr'].includes(currentLangSegment)) {
      newPath = `/${currentLang}${targetPath.startsWith('/') ? targetPath : '/' + targetPath}`;
    } else {
      newPath = `/${currentLang}${targetPath.startsWith('/') ? targetPath : '/' + targetPath}`;
    }

    navigate(newPath);
  };

  return navigateWithLang;
};

export default useLangNavigate;
