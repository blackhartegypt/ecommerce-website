import {configureStore,combineReducers} from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import filterReducer from './slices/filterSlice';
import orderReducer from './slices/orderSlice';
//order:orderReducer,


const rootReducer=combineReducers({
    auth:authReducer,
    product:productReducer,
    cart:cartReducer,
    checkout:checkoutReducer,
    filter:filterReducer,
    order:orderReducer,
})

const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
})

export default store;
