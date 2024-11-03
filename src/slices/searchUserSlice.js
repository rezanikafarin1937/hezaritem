import { createSlice } from "@reduxjs/toolkit";

const searchUserSlice = createSlice({
    name : "searchUserSlice",
    initialState : {
        value : ""
    },

    reducers: {
        updateSearch : (state,action) => {
            state.value = action.payload;
        }
    }
});

export const { updateSearch } = searchUserSlice.actions;

export default searchUserSlice.reducer;