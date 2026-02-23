import { configureStore } from '@reduxjs/toolkit'
import authApi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import productApi from './features/products/productsApi';
import reviewsApi from './features/reviews/reviewsApi';
import cartReducer from './features/cart/CartSlice'
import orderApi from './features/orders/orderApi'; // Ekhane 'A' boro hater korun
import statsApi from './features/stats/statsApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        auth: authReducer,
        [productApi.reducerPath]: productApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
         cart: cartReducer,
         [orderApi.reducerPath]: orderApi.reducer, // Ekhane 'A' boro hater
         [statsApi.reducerPath]: statsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        authApi.middleware, 
        productApi.middleware, 
        reviewsApi.middleware, 
        orderApi.middleware, // Ekhane 'A' boro hater
        statsApi.middleware
    )
})