import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productSlice from './features/product/productSlice';
import loadingSlice from './features/loading/loadingSlice';
import cartSlice from './features/cart/cartSlice';
import authSlice from './features/auth/authSlice';


const rootReducer = combineReducers({
  product: productSlice,
  loading: loadingSlice,
  cart: cartSlice,
  auth: authSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
