import { createSlice } from "@reduxjs/toolkit";

const forceRenderSlice  = createSlice({
    name : "forceRenderSlice",
    initialState : {
        value : false
    },
    reducers:{
        updateForceRender : (state,action)=>{
            state.value = action.payload;
            console.log('text = ',state.value);
        }
    }
});

export const { updateForceRender } = forceRenderSlice.actions;

export default forceRenderSlice.reducer;