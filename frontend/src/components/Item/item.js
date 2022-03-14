import styled from "styled-components";
import { increment } from "../../features/navbar";
import { addItem, removeItem } from "../../features/shoppingCart";
import { useDispatch, useSelector} from "react-redux";

// import ReactStars from "react-rating-stars-component";
import "./item.css";
// import CartIcon from '../../../src/components/Item/cartIcon.png';
// import { AddToFavourites } from "./addToFavourites";
// import { useState } from 'react';
// import { ShoppingCart } from "../ShoppingCart/shoppingCart";
// import { refreshPage } from "../NavBar/navBar";
// import { CartCircle } from "../NavBar/navBar";


const Container = styled.div`
width: 30vw;
height: 75vh;
display: flex;
flex-direction:column;
background-color: #0C0A0F;
border-radius: 3%;
margin-right:1vw;
margin-left:1vw;
margin-bottom: 2vh;
border: 1px solid transparent;

&:hover {
    box-shadow: 0 10px 25px rgba(0,0,0,0.8);
    
}
`;
const Image = styled.div`
width: 28.5vw;
height: 43vh;
display: flex;
flex-direction:column;
background-color: white;
margin-left:auto;
margin-right:auto;
margin-top:1.5vh;
border-radius: 3%;
background: rgba(244,246,246,1);
`
const Name = styled.div`
width: 28.5vw;
height: 1vh;
margin:auto;
margin-right:auto;
margin-top:1.5vh;
border-radius: 3%;
color: #8E888A;
font-weight: 600;
font-family: Poppins;
font-size: 1.5vw;
text-align: center;
`

const Price = styled.div`
margin:auto;
margin-right:auto;
margin-top:0.5vh;
height: 2vh;
color: #8E888A;
font-weight: 600;
font-family: Poppins;
font-size: 1.1vw;
`
const Description = styled.div`
margin:auto;
margin-right:auto;
margin-top:2.5vh;
height: 2vh;
color: #8E888A;
font-weight: 600;
font-family: Poppins;
font-size: 0.9vw;
`

const AddToCart = styled.button`
height: 6vh;
width: 10vw;
font-weight: 600;
font-family: Poppins;
font-size: 1vw;
background-image: url("./cartIcon.png");
background-color: #1b1621;
border-radius: 15%;
border: none;
margin-left: auto;
margin-right: auto;
margin-bottom: 3vh;
color: #8E888A;
cursor: pointer;
    &:active{
    transform: translateY(0.5vh);
}
`


export default function Item(_id,image, name, description, itemPrice) {

    const dispatch = useDispatch()

    return (
        <Container>
            <Image>{image}</Image>
            <Name > {name}</Name>
            <Description> {description} </Description>
            <div className='price'>
            <Price> {itemPrice + " RON"}</Price>
            </div>
            <AddToCart className="addButton" onClick={  ()=>{ dispatch(increment()); dispatch(addItem({_id:_id,name:name,quantity:1,price:itemPrice})) } }  > Add to Cart</AddToCart>
        
        </Container>
    )

}