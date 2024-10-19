import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState={
    cartItems:localStorage.getItem("cartItems")
        ? JSON.parse(localstorage.getItem("cartItems"))
        :[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
    previousURL:"",
};

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        ADD_TO_CART(state,{payload}){
            const productIndex=state.cartItems.findIndex((item)=>item.id=payload.id)
            
            if (productIndex >= 0) {
                state.cartItems[productIndex].cartQuantity += 1;
                toast.info(`${payload.name} increased by one`,{position:'top-left'})
            }else{
                const tempProduct={...payload,cartQuantity:1};
                state.cartItems.push(tempProduct);
                toast.success(`${payload.name} added to the cart`, {position:"top-left"})
            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        DECREASE_CART(state,{payload}){
            const productIndex=state.cartItems.findindex((item)=>
                item.id===payload.id
             );

             if (state.cartItems[productIndex].cartQuantity > 1 ){
                state.cartItems[productIndex].cartQuantity-=1;
             }else if (state.cartItems[productIndex].cartQuantity ===1 ){
                const newCartItem=state.cartItems.filter(
                    (item)=>item.id=payload.id
                )
                state.cartItems=newCartItem;
             }
             localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        REMOVE_FROM_CART(state,{payload}){
            state.cartItems=state.cartItems.filter((item)=> item.id !== payload.id)
            toast.success(`${payload.name} removed from the cart`, {position:'top-left'})
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        CALCULATE_SUBTOTAL(state){
            state.cartTotalAmount=cartItems
            .reduce((total,item)=>total+ item.price*item.cartQuantity,0)
        },

       CALCULATE_TOTAL_QUANTITY(state){
            state.cartTotalQuantity=cartItems
            .reduce((total,item)=>total+item.cartQuantity,0)
       },
       
       SAVE_URL(state,{payload}){
            state.previousURL=payload
       },

       CLEAR_CART(state){
            state.cartItems=[];
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
       }
    }
})

export const {
    CALCULATE_TOTAL_QUANTITY,SAVE_URL,REMOVE_FROM_CART,ADD_TO_CART,
    CALCULATE_SUBTOTAL,DECREASE_CART,CLEAR_CART
}=cartSlice.actions

export const selectCartItems=(state)=>state.cart.cartItems;
export const selectCartTotalQuantity=(state)=>state.cart.cartTotalQuantity;
export const selectCartTotalAmount=(state)=>state.cart.cartTotalAmount;
export const selectPreviousURL=(state)=>state.cart.previousURL;

export default cartSlice.reducer;
