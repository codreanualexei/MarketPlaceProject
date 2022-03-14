import { createSlice } from "@reduxjs/toolkit";

export const navBarSlice = createSlice({
    name:"navbar",
    initialState:{
        itemCnt:0
    },
    reducers:{
        increment: (state)=>{
            state.itemCnt=state.itemCnt+1;
        },
        decrement: (state)=>{
            state.itemCnt=state.itemCnt-1;
        }

    }
});

export const {increment,decrement} = navBarSlice.actions;

export default navBarSlice.reducer;