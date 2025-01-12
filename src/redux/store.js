import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import productsReducer from "../features/products/productsSlice";
import favoriteReducer from "../features/products/favoriteSlice";
import languageReducer from "../features/languages/languageActions";
import chatReducer from "../features/chat/chatSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import socketMiddleware from "../middleware/socketMiddleware";
import statsReducer from "../features/stats/statsSlice";
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

// Persist configuration for the products slice (to persist selectedProduct)
const persistProductsConfig = {
  key: "products",
  storage,
  whitelist: ["selectedProduct"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedProductsReducer = persistReducer(
  persistProductsConfig,
  productsReducer
);

const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: persistedReducer,
    categories: categoriesReducer,
    products: persistedProductsReducer,
    favorites: favoriteReducer,
    chats: chatReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
