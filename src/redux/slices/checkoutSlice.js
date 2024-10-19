import {createSlice} from '@reduxjs/toolkit';

const initialState={
    shippingAddress:{},
    billingAddress:{},
};


const checkoutSlice=createSlice({
    name:'checkout',
    initialState,
    reducers:{
        SAVE_SHIPPING_ADDRESS(state,{payload}){
            state.shippingAddress=payload;
        },
        SAVE_BILLING_ADDRESS(state,{payload}){
            state.billingAddress=payload
        },
    },
});

export const {SAVE_BILLING_ADDRESS,SAVE_SHIPPING_ADDRESS}=checkoutSlice.actions;

export const selectBillingAddress=(state)=>state.checkout.billingAddress;
export const selectShippingAddress=(state)=>state.checkout.shippingAddress;

export default checkoutSlice.reducer;