import {createSlice} from '@reduxjs/toolkit';


const initialState={
    filteredProducts:[],
};

const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{

        FILTER_BY_SEARCH(state,{payload}){
            const {products,search}=payload;
            const tempProducts=products.filter((product)=>{
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase())
            })
            state.filteredProducts=tempProducts;

        },

        SORT_PRODUCTS(state,{payload}){
            const {products,sort}=payload;
            let tempProducts=[];

            if (sort==="latest"){
                tempProducts=products;
            }

            if (sort==="lowest-price"){
                tempProducts=products.slice().sort((a,b)=>{
                    return a.price-b.price;
                });
            }

            if (sort ==="highest-price"){
                tempProducts=products.slice().sort((a,b)=>{
                    return b.price-a.price
                });
            }

            if (sort==="a-z"){
                tempProducts=products.slice().sort((a,b)=>{
                    return a.name.localeCompare(b.name);
                });
            }

            if (sort==="z-a"){
                tempProducts=products.slice().sort((a,b)=>{
                    return b.name.localeCompare(a.name);
                });
            }
            state.filteredProducts=tempProducts;

        },

        FILTER_BY_CATEGORY(state,{payload}){
            const {products,category}=payload;
            let tempProducts=[];
            if(category==="All"){
                tempProducts=products;
            }else{
                tempProducts=products.filter((product)=>{
                    product.category===category
                })
            }

            state.filteredProducts=tempProducts;

        },

        FILTER_BY_BRAND(state,{payload}){
            const {products,brand}=payload;
            let tempProducts=[];
            
            if (brand="All"){
                tempProducts=products;
            }else{
                tempProducts=products.filter((product)=>{
                    product.brand=brand
                })
            }
            state.filteredProducts=tempProducts;
        },

        FILTER_BY_PRICE(state,{payload}){
            const {products,price}=payload;
            let tempProducts=[];
            tempProducts=products.filter((product)=>product.price<=price)

            state.filteredProducts=tempProducts;
        }

    }
})


export const {
    FILTER_BY_BRAND,
    FILTER_BY_PRICE,
    FILTER_BY_CATEGORY,
    FILTER_BY_SEARCH,
    SORT_PRODUCTS
}=filterSlice.actions;

export const selectFilteredProducts =(state)=>state.filter.filteredProducts;

export default filterSlice.reducer
