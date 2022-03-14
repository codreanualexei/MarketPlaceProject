import { createSlice } from "@reduxjs/toolkit";

const itemStruct ={     //Creez un Json pentru un item
    name:'',
    quantity:0,
    price:0
}

export const shoppingCartSlice = createSlice({
    name:"shoppingCart",
    initialState:{
        items:[]  //Lista de item-uri
    },
    reducers:{
        addItem: (state,action)=>{
            state.items= [...state.items, action.payload] // asta este in loc de push, as se adauga in array
        },
        removeItem:(state,action)=>{
            state.items=state.itemCnt+1;
        },

    }
});

export const {addItem,removeItem} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;