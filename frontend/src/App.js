
import './App.css';
import React from 'react';
import { AccountBox } from './components/LoginPage/accountPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainPage } from './components/MainPage/mainPage';
import {ShoppingCart} from './components/ShoppingCart/shoppingCart';
import { AboutUs } from './components/AboutUs/aboutUs';
import {Welcome} from './components/WelcomePage/welcome';
import { NavBar } from './components/NavBar/navBar';

function App() {
  
  return (
      <main>
        {/* <section className='nav'>
        <NavBar />
        </section>
        <section className='routes'> */}
        <BrowserRouter>
            <Switch>
                {/* <Route path="/" component={AccountBox} exact /> */}
                <Route path = '/' component={Welcome} exact/>
                <Route path='/main' component={MainPage} />
                <Route path='/shoppingCart' component={ShoppingCart} />
                <Route path='/aboutUs' component={AboutUs} />
                
            </Switch>
        </BrowserRouter>
        {/* </section> */}
      </main>

    
  );
}

export default App;
