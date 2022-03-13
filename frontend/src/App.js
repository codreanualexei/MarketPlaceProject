
import './App.css';
import React, { Component } from 'react';
import FirstPage from './components/FirstPage/firstPage'
import { AccountBox } from './components/LoginPage/accountPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainPage } from './components/MainPage/mainPage';
import {ShoppingCart} from './components/ShoppingCart/shoppingCart';
import { AboutUs } from './components/AboutUs/aboutUs';
import { NavBar } from './components/NavBar/navBar';

function App() {
  
  return (
      <main>
      <NavBar numberOfItems={number}/>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={AccountBox} exact />
                <Route path='/main' component={MainPage} />
                <Route path='/shoppingCart' component={ShoppingCart} />
                <Route path='/aboutUs' component={AboutUs} />
                
            </Switch>
        </BrowserRouter>
      </main>

    
  );
}

export default App;
