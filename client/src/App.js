//LOAD IN LATEST CLOSE FROM SERVER
//make the get function work for any stock
//make the chart into a component 
//make it so when i add data to database collection it doest overwrite everything else in the collection

import React, { Component } from 'react';
import './App.css';
import Button from "@material-ui/core/Button";
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import StockContainer from './components/StockContainer';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import TrendingStocksScreen from './screens/TrendingStocksScreen'
import DetailedStockScreen from './screens/DetailedStockScreen'
import HeaderAppBar from './components/HeaderAppBar';
import CategoriesScreen from './screens/CategoriesScreen';
import FriendsScreen from './screens/FriendsScreen';
import NewsScreen from './screens/NewsScreen';


class App extends Component {

  render() {
    return (
        <BrowserRouter>   
          <div>
            <HeaderAppBar/>    
            <Route path='/' component={TrendingStocksScreen} exact />
            <Route path='/detailedStock' component={DetailedStockScreen} />
            <Route path='/categories' component={CategoriesScreen} />
            <Route path='/friends' component={FriendsScreen} />
            <Route path='/news' component={NewsScreen} />
          </div>
        </BrowserRouter>   
    );
  }
}

export default App;
