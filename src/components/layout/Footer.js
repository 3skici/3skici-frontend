import { Link } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";

const Footer = () => {
  const currentLanguage = i18n.language;
  const faq = getPathWithLanguage("/faq", currentLanguage);
  const filter = getPathWithLanguage("/filter", currentLanguage);
  const report = getPathWithLanguage("/report/", currentLanguage);
  const contact = getPathWithLanguage("/contact-us/", currentLanguage);
  const sitemap = getPathWithLanguage("/sitemap/", currentLanguage);


  return (
    <footer className="bg-gray-800 p-4 mt-10 text-center flex flex-col text-white">
      {/* <p>&copy; 2024 3skici. All Rights Reserved.</p> */}
      <Link
        to={faq}
        className=" text-white  font-semibold  transition duration-200"
      >
        FAQ
      </Link>
      <Link
        to={filter}
        className=" text-white  font-semibold  transition duration-200"
      >
        Filter
      </Link>
      <Link
        to={report}
        className=" text-white  font-semibold  transition duration-200"
      >
        Report
      </Link>
      <Link
        to={contact}
        className=" text-white  font-semibold  transition duration-200"
      >
        Contact Us
      </Link>
      <Link
        to={sitemap}
        className=" text-white  font-semibold  transition duration-200"
      >
        Sitemap
      </Link>
    </footer>
  );
};
export default Footer;
