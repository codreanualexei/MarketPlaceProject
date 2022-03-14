import { createSlice } from "@reduxjs/toolkit";
import { findDOMNode } from "react-dom";

const itemStruct ={     //Asa o sa arate un item
    _id:'',
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
            
            let exist=0
            exist =state.items.findIndex((item)=>{return item._id==action.payload._id})

            if(exist!=-1){  //daca exista modificam quantity
                
                state.items.map(item=>{
                    if(item._id==action.payload._id){
                        item.quantity=item.quantity+1
                        return item
                    }

                    })

            }else{
                state.items= [...state.items, action.payload] // asta este in loc de push, as se adauga in array
            }
            

        },
        removeItem:(state,action)=>{

            let exist=0
            exist =state.items.findIndex((item)=>{return item._id==action.payload._id})

            if(exist!=-1){  //daca exista modificam quantity
                
                state.items.map(item=>{
                    if(item._id==action.payload._id){
                        item.quantity=item.quantity-1
                        return item
                    }

                    })

                if(state.items[exist].quantity==0){
                        state.items.splice(exist,1)
                }

            }


        },

    }
});

export const {addItem,removeItem} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;