  import React from 'react';
  import i18n from 'i18next';
  import { useTranslation } from 'react-i18next';
  import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../features/languages/languageActions';

  const LanguageSwitcherDropdown = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { lang } = useParams();
    const language = useSelector((state) => state.language.language);

    const changeLanguage = (newLanguage) => {
      if (newLanguage !== language) {
        // Update Redux state
        dispatch(setLanguage(newLanguage));
  
        // Change language in i18next
        i18n.changeLanguage(newLanguage);
  
        // Modify the URL to include the new language code
        const pathSegments = location.pathname.split('/').filter(Boolean);
  
        // Replace the first segment if it's a language code
        if (['en', 'ar', 'tr'].includes(pathSegments[0])) {
          pathSegments[0] = newLanguage;
        } else {
          pathSegments.unshift(newLanguage);
        }
  
        const newPath = `/${pathSegments.join('/')}${location.search}${location.hash}`;
  
        // Navigate to the new URL
        navigate(newPath);
      }
    };


    React.useEffect(() => {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }, []);

    return (
      <div className="relative inline-block text-left">
        <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          {t('select_language')}
        </button>
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => changeLanguage('en')}
            >
              English
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => changeLanguage('ar')}
            >
              العربية
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => changeLanguage('tr')}
            >
              Türkçe
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default LanguageSwitcherDropdown;
