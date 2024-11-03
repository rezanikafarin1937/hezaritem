import { createSlice,  createAsyncThunk  } from "@reduxjs/toolkit";
import { useState } from "react";
import axios from "axios";

export const fetchUsers =  createAsyncThunk ("userSlice/fetchData", async (obj) => {
    console.log('page = ',obj.page);
    console.log('text = ',obj.text);
    const URL = `http://localhost/back-sef/public/api/users?page=${obj.page}`;
    console.log('URL = ',URL);
    const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
          "Bearer hL3mLquFhdkhpj6qEfIBfjyOioIMLe34lr6kmQ9S4R5G77zR0sEzQpfL1zC6ZQaveBRK21K1amv4lBz5x3Gu5wySwvuY15ZqRCvV",
  
        },
      };
    
    try {
    const res = await axios.get(URL,config);
    return JSON.stringify(res.data.data.filter(d => d.name.indexOf(obj.text) > -1 ));
  } catch (err) {
    console.log(err);
  }
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    data: [],
    loading: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled,(state,action)=>{
        state.data = action.payload;
        state.loading = false
    });
    builder.addCase(fetchUsers.pending,(state) =>{
        state.loading = true;
    });
    builder.addCase(fetchUsers.rejected,(state)=>{
        state.loading = false;
        state.errorMessage = "error in fetch data";
    });
  },
});

export default userSlice.reducer;