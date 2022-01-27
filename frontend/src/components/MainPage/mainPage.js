// import { Item } from '../Item/item'
import './mainPage.css'
import Item, { itemName } from '../Item/item'
import { NavBar } from '../NavBar/navBar'
import { ThemeConsumer } from 'styled-components'
import { useState, useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';



export function MainPage(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    
    //HTTP request cu metoda 'GET'
    fetch("/getAllItems") //o ruta locala cand pornesti serverul
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
  fetch('/payment',{
   headers: {"Content-Type":"application/json"},
   method:"POST",
   body:JSON.stringify({
     "cart":[{      //Trebuie sa faci un array din asta, cu forma asta. si la fiecare clock sa trimita ce este in cos
       "_id":"61a53e4e2836777d8160da6c",
       "quantity":"5"   //id-urie le iei din mainPage cumva, iti apar cu primul fetch.....
     },
     {
       "_id":"61a53fe72836777d8160da7c",
       "quantity":"3"
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
        <section className='mainPage'>
            <section className='navBar'>
                <NavBar />

            </section>
            <section className='content'>
            
            <button onClick={() => pay()}>Pay Default</button>

            {items.map(item => (
          <div key={item._id}>
            {Item(item.title,100,item.price)}
          </div>))}

                {/* {Item('Telefon mobil Apple iPhone 13 Pro Max, 128GB, 5G, Sierra Blue',5,5000)}
                {Item('Telefon mobil Huawei Y6P, Dual SIM, 64GB, 4G, Midnight Black',4.5,6000,5000)}
                {Item('Telefon mobil Samsung Galaxy F02s, Dual SIM, 32GB, 3GB RAM, 4G',1,800,700)}
                {Item('bla bla bla',1,500,100)}
                {Item('Telefon mobil Apple iPhone 13 Pro Max, 128GB, 5G, Sierra Blue',5,5000)}
                {Item('Telefon mobil Huawei Y6P, Dual SIM, 64GB, 4G, Midnight Black',4.5,6000,5000)}
                {Item('Telefon mobil Samsung Galaxy F02s, Dual SIM, 32GB, 3GB RAM, 4G',1,800,700)}
                {Item('bla bla bla',1,500,100)}
                {Item('Telefon mobil Apple iPhone 13 Pro Max, 128GB, 5G, Sierra Blue',5,5000)}
                {Item('Telefon mobil Huawei Y6P, Dual SIM, 64GB, 4G, Midnight Black',4.5,6000,5000)}
                {Item('Telefon mobil Samsung Galaxy F02s, Dual SIM, 32GB, 3GB RAM, 4G',1,800,700)}
                {Item('bla bla bla',1,500,100)}
                {Item('Telefon mobil Apple iPhone 13 Pro Max, 128GB, 5G, Sierra Blue',5,5000)}
                {Item('Telefon mobil Huawei Y6P, Dual SIM, 64GB, 4G, Midnight Black',4.5,6000,5000)}
                {Item('Telefon mobil Samsung Galaxy F02s, Dual SIM, 32GB, 3GB RAM, 4G',1,800,700)}
               */}
            </section>

        </section>
    )
    
}