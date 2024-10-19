import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[],
    minPrice:null,
    maxPrice:null,
};

const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        STORE_PRODUCTS(state,{payload}){
            state.products=payload.products;
        },
        GET_PRICE_RANGE(state,{payload}){
            const price=payload.products.map(product=>product.price);
            state.minPrice=Math.min(...price);
            state.maxPrice=Math.max(...price);

        },
    },
});

export const {STORE_PRODUCTS,GET_PRICE_RANGE}=productSlice.actions;

export const selectProducts=(state)=>state.product.products;
export const selectMinPrice=(state)=>state.product.minPrice;
export const selectMaxPrice=(state)=>state.product.MaxPrice;

export default productSlice.reducer