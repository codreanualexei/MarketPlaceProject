import './shoppingCart.css';
import { NavBar } from '../NavBar/navBar'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { MainPage } from '../MainPage/mainPage';
import Item from '../Item/item';
import { addElement } from '../Item/item';
import { useEffect, useRef } from 'react';
import { CartCircle } from '../NavBar/navBar';
import { withTheme } from 'styled-components';
import {loadStripe} from '@stripe/stripe-js';
import { useDispatch, useSelector} from 'react-redux';
import { addItem,removeItem } from '../../features/shoppingCart';
import { increment,decrement } from '../../features/navbar';


export function ShoppingCart (props) {

    const arrItems = useSelector(state=>{return state.shoppingCart.items}) //Array cu obiecte json pentru item-uri
    const dispatch = useDispatch()
    
    const history = useHistory();
    const mainPageRoute = () => {
        history.push("/main");
    }

  const myContainer = useRef(null);
  console.log(myContainer.current);

const stripePromise = loadStripe("pk_test_51JtYOwDdCFBi5ZCFkATMF7Bhw0AihvQNRI7IGESELNOdUGiXik6VaG571xXomo5mnYDUG450qLgjxmqg4kGjgoLr00tLv8BMpx")

async function pay () {
  const stripe = await stripePromise;

  console.log("fuctia PAY")
  fetch('/api/creatependingcommand',{
   headers: {"Content-Type":"application/json"},
   method:"POST",
   body:JSON.stringify({
    "email":"codreanualexeialexandru@gmail.com",
    "description":"blabla",
    "itemList":[{
      "_id":"61a53e4e2836777d8160da6c",
      "units":"1"
    },
    {
      "_id":"61a53fe72836777d8160da74",
      "units":"1"
    }
  ]
  })
  })
  .then( (response)=>{
   return response.json()
  })
  .then((session)=>{
   if(session.message){
     alert(session.message)
     return
   }else
   console.log(session.id) //Asta dupa plata o sa-l trimitem la server
   const result = stripe.redirectToCheckout({sessionId:session.id})
   return result
   
  })
  .then((result)=>{
   if(result.error){
     alert(result.error.message)
   }
  })
  .catch((error)=>{
   console.log("error",error)
  })
}


    return (
        <section className="shoppingCart">
            <section className='navBar'>
                <NavBar />
            
            </section>
            <section className='content' >
            <div className='objects'>
                {arrItems.length === 0 &&(
                    <div className='alignEmptyCart'>
                        <div className='emptyCart'>Nu ai niciun produs in cos.</div>
                        <button className='back' onClick={mainPageRoute}>Inapoi la magazin </button>
                        
                    </div>
                )}
                <div>
                    {arrItems.map((item) =>(
                        
                        <div key={item._id} className='cartItemsList'>
                            {/* <img className='cartItemsImage' src={item.image} alt={item.description}/> */}
                            
                            <div className='products'>{item.quantity}</div>
                            <div className='quantity'>
                                <button className='quantityButton' onClick={() => {dispatch(increment()); dispatch(addItem({_id:item._id,name:item.name,quantity:1,price:item.price})) }}>+</button>
                                <div className='nr' ref={myContainer}>{}</div>
                                <button className='quantityButton' onClick={() => {dispatch(decrement()); dispatch(removeItem({_id:item._id,name:item.name,quantity:1,price:item.price})) }}>-</button>
                                                                                                            
                            </div>
                        </div>
         
                    ))}
                </div>
                <div>
                    { 

                    }
                </div>
               

                </div>
                <section className='payment'>
                <button className='paymentButton' onClick={() => pay()}>Pay Default</button>
            </section>
            </section>
            

        </section>
    )
}