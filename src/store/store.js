import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../slices/productSlice'
import searchSlice from "../slices/searchSlice";
import searchUserSlice from "../slices/searchUserSlice";
import userSlice from "../slices/userSlice";
import forceRenderSlice from "../slices/forceRenderSlice";
import citySlice from "../slices/citySlice";
import provinceSlice from "../slices/provinceSlice";
const store = configureStore({
    reducer:{
        searchSlice,
        productSlice,
        searchUserSlice,
        userSlice,
        forceRenderSlice,
        citySlice,
        provinceSlice
    }
});

export default store;
