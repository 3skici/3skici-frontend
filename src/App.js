import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/layout/Login";
import Signup from "./components/layout/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ProductsManagement from "./pages/ProductsManagement";
import EditProduct from "./pages/EditProduct";
import AboutUs from "./pages/About";
import Products from "./components/products/Product";
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
import ChatPage from "./chat/ChattingPage";
import ProductSmallCard from "./components/products/ProductSmallCard";
import ChatWindow from "./components/conversation/ChatWindow";
import ProductDetails from "./components/products/ProductDetails";
function App() {

  return (
    <Layout>
      <Routes>
        {/* Default route redirects to English version */}
        <Route path="/" element={<Navigate to={`/en`} replace />} />

        {/* Language-specific routes */}
        <Route path="/:lang" element={<Home />} />
        <Route path="/:lang/about" element={<AboutUs />} />
        <Route path="/:lang/products" element={<ProductsManagement />} />
        <Route path="/:lang/browse-products" element={<Products />} />
        <Route path="/:lang/selling-product" element={<SellingProduct />} />
        <Route path="/:lang/edit-product/:id" element={<EditProduct />} />
        <Route path="/:lang/login" element={<Login />} />
        <Route path="/:lang/cat" element={<Category />} />
        <Route path="/:lang/categories" element={<CategoryList />} />
        <Route path="/:lang/signup" element={<Signup />} />
        <Route path="/:lang/profile" element={<Profile />} />
        <Route path="/:lang/user-dashboard" element={<UserDashboard />} />
        <Route path="/:lang/admin" element={<AdminDashboard />} />
        <Route path="/:lang/forgot-password" element={<ForgotPassword />} />
        <Route path="/:lang/faq" element={<FAQ />} />
        <Route path="/:lang/fav" element={<FavoritesPage />} />
        <Route path="/:lang/contact-us" element={<ContactUs />} />
        <Route path="/:lang/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/:lang/sitemap" element={<Sitemap />} />
        <Route path="/:lang/user-settings" element={<UserSettings />} />
        <Route path="/:lang/chat" element={<ChatWindow />} />
        <Route path="/:lang/chatting" element={<ChatPage />} />
        <Route path="/:lang/card" element={<ProductSmallCard />} />
        <Route path="/:lang/product/:id" element={<ProductDetails />} />
        <Route
          path="/:lang/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route path="/:lang/filter" element={<ProductSearchAndFilter />} />
        <Route path="/:lang/report" element={<Report />} />
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
