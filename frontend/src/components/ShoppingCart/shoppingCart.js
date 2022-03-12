import './shoppingCart.css';
import { NavBar } from '../NavBar/navBar'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { MainPage } from '../MainPage/mainPage';
import Item from '../Item/item';
import { addElement } from '../Item/item';
import { all, itemName, number } from '../Item/item';
import { useEffect, useRef } from 'react';
import { CartCircle } from '../NavBar/navBar';
import { withTheme } from 'styled-components';

//Increase, Decrease si shoppingCart sunt functii diferite si au state diferit !
export function increase (x) {
    number[x] = number[x] +1;
    console.log("INCREASED");
}
export function decrease (x) {
    number[x] = number[x] -1;
    console.log("DECREASED");
}
export function ShoppingCart (props) {
    const history = useHistory();
    const mainPageRoute = () => {
        history.push("/main");
    }
    
    // const [cartItems, setCartItems] = useState([]);
    // const onAdd = (product) => {
    //     const exist = cartItems.find((x) => x.id === product.id);
    //     if(exist) {
    //         setCartItems(cartItems.map((x) => x.id === product.id ? {...exist, qty: exist.qty +1} : x));
    //     } else {
    //         setCartItems([...cartItems, { ...product, qty: 1}]);
    //     }
    //     console.log("aaa");
    // }

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const myContainer = useRef(null);
  console.log(myContainer.current);
  
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  useEffect(() => {
    fetch("/api/findArrOfItems",{
        headers: {"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify({
            "items":["61a53e4e2836777d8160da6c","61a53f432836777d8160da71"] // trebuie sa bagi un array cu item-urile care le vrei
        })
       })
      .then( (res )=> {
          if(res.status=="200")
          //daca status e 200 atunci inseamna ca serverula returnat ce trebuie fara erori
          // si returnam raspunsul in forma json pentru urmatoarea etapa de prelucrare a rezultatului
          return res.json();
          else{
              return false// returnam nimic pentru urmatorul then
              console.log("eroare request trebuie redirectionat cate o pagina 404 (de eroare)")
            }
        }
      )
      .then(
        (result) => {
                if(result ==false) return // daca raspunsul e fals atunci returnam nimic pentru urmatoarea etapa
                 // am facut sa nu apara erori dar undeva trebuie sa redirectionam user-ul catre o pagina 404 (de eroare)
                setIsLoaded(true);
                setItems(result);
    
                console.log("RESULTATELE") // Aici ai respunsul cu toate informatiile despre produsele cu acele id-uri
                console.log(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true); // Poate asta te poate ajuta sa-ti dai seama cand sa redirectionezi catre 404 page .... Nu ma prind cum functioneaza//
          setError(error);
        }
      )
  }, [])
   
    return (
        <section className="shoppingCart">
            <section className='navBar'>
                <NavBar />
            
            </section>
            <section className='content' >
                {itemName.length === 0 &&(
                    <div className='alignEmptyCart'>
                        <div className='emptyCart'>Nu ai niciun produs in cos.</div>
                        <button className='back' onClick={mainPageRoute}>Inapoi la magazin </button>
                        
                    </div>
                )}
                <div>
                    {itemName.map((item) =>(
                        
                        <div key={item.id} className='cartItemsList'>
                            {/* <img className='cartItemsImage' src={item.image} alt={item.description}/> */}
                            
                            <div className='products'>{item}</div>
                            <div className='quantity'>
                                <button className='quantityButton' onClick={() => {increase(itemName.indexOf(item));}}>+</button>
                                <div className='nr' ref={myContainer}>{number[itemName.indexOf(item)]}</div>
                                <button className='quantityButton' onClick={() => {decrease(itemName.indexOf(item)) }}>-</button>
                            </div>
                        </div>
         
                    ))}
                </div>
                <div>
                    { items.forEach(item => itemName.includes(item.name)? items.push(
                        <li>{item.name}</li>
                    ): null)

                    }
                </div>
               

            </section>

        </section>
    )
}