import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productsSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import checkoutReducer from "../features/checkout/checkoutSlice.js";
import orderReducer from "../features/order/orderSlice.js";
import { 
    persistReducer, persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import authReducer from "../features/auth/authSlice.jsx";

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'token'],
}
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orders: orderReducer,
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }), 
});

export const persistor = persistStore(store);