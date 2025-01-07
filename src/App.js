import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/layout/Login";
import Signup from "./components/layout/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import EditProduct from "./components/products/EditProduct";
import AboutUs from "./pages/About";
import ProductSearchAndFilter from "./components/filter&search/ProductSearchAndFilter";
import Report from "./components/report/Report";
import SellingProduct from "./components/products/SellingProduct";
import Layout from "./components/layout/Layout";
import FAQ from "./pages/FAQ";
import FavoritesPage from "./pages/Favorite";
import ContactUs from "./pages/ContactUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import Sitemap from "./pages/Sitemap";
import ErrorPage from "./pages/ErrorPage";
import UserSettings from "./pages/UserSettings";
import CategoryList from "./components/categories/CategoryList";
import ChatPage from "./components/chat/ChatPage";
import ProductSmallCard from "./components/products/ProductSmallCard";
import ProductDetails from "./components/products/ProductDetails";
import ChatRoom from "./components/chat/ChatRoom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sustainability from "./pages/Sustainability";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "./features/products/favoriteSlice";
import Test from "./pages/Test";
import LocalizedFontWrapper from "./components/helpers/LocalizedFontWrapper";
import Settings from "./components/layout/Settings";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const hasFetchedFavorites = useSelector(
    (state) => state.favorites.hasFetched
  );

  useEffect(() => {
    if (userId && !hasFetchedFavorites) {
      dispatch(fetchFavorites(userId));
    }
  }, [userId, hasFetchedFavorites, dispatch]);

  return (
    <Layout>
      {/* ToastContainer to render toast notifications */}
      <ToastContainer />
      <LocalizedFontWrapper>
        <Routes>
          {/* Default route redirects to English version */}
          <Route path="/" element={<Navigate to={`/en`} replace />} />
          <Route
            path="/:lang/edit-product/:productId"
            element={<EditProduct />}
          />

          {/* Language-specific routes */}
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/about-us" element={<AboutUs />} />
          <Route path="/:lang/selling-product" element={<SellingProduct />} />
          <Route
            path="/:lang/edit-product/:productId"
            element={<EditProduct />}
          />
          <Route path="/:lang/login" element={<Login />} />
          <Route path="/:lang/cat" element={<Category />} />
          <Route path="/:lang/categories" element={<CategoryList />} />
          <Route path="/:lang/signup" element={<Signup />} />
          <Route path="/:lang/profile" element={<Profile />} />
          <Route path="/:lang/forgot-password" element={<ForgotPassword />} />
          <Route path="/:lang/faq" element={<FAQ />} />
          <Route path="/:lang/fav" element={<FavoritesPage />} />
          <Route path="/:lang/contact-us" element={<ContactUs />} />
          <Route
            path="/:lang/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/:lang/sitemap" element={<Sitemap />} />
          <Route path="/:lang/user-settings" element={<UserSettings />} />
          <Route path="/:lang/chat" element={<ChatPage />} />
          <Route path="/:lang/chat-room/" element={<ChatRoom />} />
          <Route path="/:lang/card" element={<ProductSmallCard />} />
          <Route path="/:lang/product/:id" element={<ProductDetails />} />
          <Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:lang/settings" element={<Settings />} />
          <Route
            path="/:lang/3skici-and-sustainability"
            element={<Sustainability />}
          />
          <Route
            path="/:lang/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route path="/:lang/filter" element={<ProductSearchAndFilter />} />
          <Route path="/:lang/report" element={<Report />} />
          {/* Catch-all route for 404 pages */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </LocalizedFontWrapper>
    </Layout>
  );
}

export default App;
