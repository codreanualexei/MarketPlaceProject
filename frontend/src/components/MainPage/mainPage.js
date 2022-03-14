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

  // las ce e mai sus ca sa mearga si scriu ce ar merge mai  bn pentru items

  let produs = {
    name:'',
    quantity:0,
    price:0
  }

  const [elements, setElemet] = useState([produs]);

  


  //--- !!State for sigle browser app!! Aici pui toate state-urile aplicatiei pentru a fi sigura ca se face re-render cand schimbi aici state-ul

  var [number, setNumber] = useState(0); //Number este numarul de click-uri sau item-uri
  //Aceasta functie va fi pasata ca parametru, este daca ca o callback function, adica un pointer, cand va fi apelata dintr-o alta componenta defapt se va apela aceasta functie, si va schimba state-ul acestei componente(mainPage)
  const CartCircle = ()=>{

      console.log("S-a apelat CartCircle") 
      setNumber(number+1)   // Cand e apelata functia se incrementeaza number cu 1 si returneaza
      return number;
  }

  const addElement= (newName,newPrice)=>{

    let exists = elements.forEach(element => {
        if(element.name==newName){
          element.quantity= element.quantity+1 //modificam cantitate
          setItems(elements)  // salvam noul array ca new state.
          return 0;
        }
    });

    if(!exists){
      let newItem={
        name:newName,
        quantity:1,
        price:newPrice
      }
      setItems(items.push(newItem))  //Adaugam in array un item nou si setam noul array ca state nou
    }
  }
  ///-----------------
  
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
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
  

 //HTTP request cu metoda 'POST' (adica dai parametri requestului)
 // fetch('route',{JSON parameters})
 //Daca apesi butonul se executa request cu parametri (POST) si te redirectioneaza pe pagina de plata
// In continuarea pentru plata trebuie sa faci un array pt cart
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

const itemsSh = useSelector(state=>{ return state.shoppingCart.items})

console.log("items:",itemsSh)
const dispatch = useDispatch()

    return (
        <section className='mainPage'>
            <section className='navBar'>
                <NavBar/> 

            </section>
            <section className='mainContent'>
{/*             
            <button onClick={() => pay()}>Pay Default</button> */}
            <button onClick={()=>{dispatch(increment())}}>increment items</button>
          
            <button onClick={()=>{dispatch(addItem({name:'produs',quantity:'2',price:'100'}))}}>add item</button>
            {items.map(item => (
          <div key={item._id}>
           
          </div>))}
            </section>

        </section>
    )
    
}