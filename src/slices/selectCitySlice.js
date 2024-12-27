import { createSlice } from "@reduxjs/toolkit";

const selectCitySlice  = createSlice({
    name : "searchSlice",
    initialState : {
        value : ""
    },
    reducers:{
        updateSelect : (state,action)=>{
            state.value = [...action.payload];
            console.log('text = ',state.value);
        }
    }
});

export const { updateSelect } = selectCitySlice.actions;

export default selectCitySlice.reducer;