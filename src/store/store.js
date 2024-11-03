import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../slices/productSlice'
import searchSlice from "../slices/searchSlice";
import searchUserSlice from "../slices/searchUserSlice";
import userSlice from "../slices/userSlice";
import forceRenderSlice from "../slices/forceRenderSlice";
const store = configureStore({
    reducer:{
        searchSlice,
        productSlice,
        searchUserSlice,
        userSlice,
        forceRenderSlice
    }
});

export default store;
