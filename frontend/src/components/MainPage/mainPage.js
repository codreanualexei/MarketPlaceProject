// import { Item } from '../Item/item'
import './mainPage.css'
import Item, { itemName } from '../Item/item'
import { NavBar } from '../NavBar/navBar'
import { ThemeConsumer } from 'styled-components'
import { useState, useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';

import { increment } from '../../features/navbar';
import { useDispatch, useSelector} from 'react-redux';
import { addItem } from '../../features/shoppingCart';

export function MainPage(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  
  // Note: the empty deps array [] means
  // this useEffect will run once

  useEffect(() => {
    
    //HTTP request cu metoda 'GET'
    fetch("/api/getAllItems") //o ruta locala cand pornesti serverul
      .then(res => res.json()) //primul pas dupa request
      .then(                   //al doilea pas dupa request
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result)  // rezultatele obtinute dupa request
        },

        (error) => {          //cazul cand da eroare
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  

const stripePromise = loadStripe("pk_test_51JtYOwDdCFBi5ZCFkATMF7Bhw0AihvQNRI7IGESELNOdUGiXik6VaG571xXomo5mnYDUG450qLgjxmqg4kGjgoLr00tLv8BMpx")

async function pay () {
  const stripe = await stripePromise;

  console.log("fuctia PAY")
  fetch('/api/payment',{
   headers: {"Content-Type":"application/json"},
   method:"POST",
   body:JSON.stringify({
    "email":"contact.andreiescu@gmail.com",
    "description":"blabla",
    "itemList":[{
      "_id":"61a53e4e2836777d8160da6c",
      "units":"5"
    },
    {
      "_id":"61a53fe72836777d8160da74",
      "units":"3"
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

const arrayItems = useSelector(state=>{return state.shoppingCart.items})

    return (
        <section className='mainPage'>
            <section className='navBar'>
                <NavBar/> 

            </section>
            <section className='mainContent'>
{/*             
            <button onClick={() => pay()}>Pay Default</button> */}

           {items.map(item => (
          <div key={item._id}>
            {Item(item._id,'https://andreiescu.herokuapp.com/'+item.image.replace('\\','/'),item.title,item.description,item.price)}
          </div>))}
            </section>

        </section>
    )
    
}