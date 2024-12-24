import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../Global/BaseUrl";

export const fetchProvince = createAsyncThunk(
  "provinceSlice/fetchProvinces",
  async () => {
    try {
      const res = await axios.get(BaseURL + "/provinces");
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const provinceSlice = createSlice({
  name: "provinceSlice",
  initialState: {
    data: [],
    loading: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvince.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProvince.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProvince.rejected, (state) => {
        state.errorMessage = "error in fetch data";
        state.loading = false;
      });
  },

});
export default provinceSlice.reducer;
