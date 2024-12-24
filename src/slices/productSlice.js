import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../Global/BaseUrl";


export const fetchProducts = createAsyncThunk(
  "productSlice/fetchAPI",
  async () => {
    try {
      const res = await axios.get(BaseURL + "/products");
      console.log('PROUCTS = ',res)
      return res.data.data;
    } catch (err) {
      console.log(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.errorMessage = "error in fetch data";
        state.loading = false;
      });

  },
});
export default productSlice.reducer;
