import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./Slices/wishlistSlice";
import productSlice from "./Slices/productSlice";
import cartSlice from "./Slices/cartSlice";

const cartStore = configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer:wishlistSlice,
        cartReducer:cartSlice
    }
})

export default cartStore