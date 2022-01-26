import './navBar.css';
import { useHistory } from "react-router-dom";
import Logo from '../../../src/logo.jpeg';
import styled from 'styled-components';
import { nrOfItems, number } from '../Item/item';
import useForceUpdate from 'use-force-update';

import { useEffect, fetchData, forceUpdate, styles } from 'react';

const Cart = styled.div`
    width: 10vw;
    height: 10vh;
    font-weight: 600;
    font-family: Poppins;
    font-size: 1vw;
    text-align: center;
    margin-top: 3vh;
    color: #8E888A;
    cursor: pointer;
`
const Meniu = styled.div`
    width: 10vw;
    height: 10vh;
    font-weight: 600;
    font-family: Poppins;
    font-size: 1vw;
    text-align: center;
    margin-top: 3vh;
    color: #8E888A;
    cursor: pointer;
`
const Description = styled.div`
    width: 10vw;
    height: 10vh;
    font-weight: 600;
    font-family: Poppins;
    font-size: 1vw;
    text-align: center;
    margin-top: 3vh;
    color: #8E888A;
    cursor: pointer;
`
export function CartCircle() {

    console.log("ONCLICK");
    var nrOfItems=0;
    for (var i=0; i<number.length; i++) {
        nrOfItems = nrOfItems + number[i];
    }
    console.log("NR OF ITEMS " + nrOfItems);
    return nrOfItems;
}


export function NavBar(props) {

    const history = useHistory();
    const shoppingCartRoute = () => {
        history.push("/shoppingCart");
    }
    const mainPageRoute = () => {
        history.push("/main");
    }
    const loginRoute = () => {
        history.push("/");
    }
    const aboutUsRoute = () => {
        history.push("/aboutUs");
    }

    return (
        <section className='navBarSection'>
            <section className='namePart'> 
                <img className='poza' src={Logo} onClick={loginRoute}/>
            </section>
            <section className='searchBarPart'>

            </section>
            <section className='meniuPart'>
                <Meniu onClick={mainPageRoute}>Meniu</Meniu>
            </section>
            <section className='descriptionPart'>
                <Description onClick={aboutUsRoute}>Despre noi</Description>
            </section>
            <section className='cartPart'>
                <Cart onClick={shoppingCartRoute}>Cosul meu</Cart>
            </section>
            <section className='notification'>

                <div className={CartCircle()>0 ? 'notif1' : 'notif2' }>{CartCircle()}</div>
            </section>
            
        </section>
       
    )
        
}