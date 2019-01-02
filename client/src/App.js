//LOAD IN LATEST CLOSE FROM SERVER
//make the get function work for any stock
//make the chart into a component 
//make it so when i add data to database collection it doest overwrite everything else in the collection

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import StockContainer from './components/StockContainer';

class App extends Component {

  state = {
    data: null,
    googl: [],
    hotStocks: [],
    dataRetrieved: false
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));

    this.callGOOG()
      .then(res => this.setState({ 
        googl: res.data, 
      }))
      .then(console.log(this.state.googl))
      .catch(err => console.log(err));

    this.callHotStocks()
      .then(res => this.setState({ 
        hotStocks: res.data, 
        dataRetrieved: true,
      }))
      .then(console.log(this.state.hotStocks))
      .catch(err => console.log(err));
  }
  
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };  

  callGOOG = async () => {
    const response = await fetch('/GOOG')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  callHotStocks = async () => {
    const response = await fetch('/hotStocks')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  renderHotStocks = () => {
    let colour = ''
    let id = 0
    return this.state.hotStocks.map((element) => {

      id++
      (Math.sign(element.daily.differencePrice) === 1 ) ? colour = '#66CD00' : colour = '#8884d8'
      
      // if (Math.sign(element.daily.differencePrice) === 1) {
      //   colour = '#66CD00'
      //   console.log('green')
      // } else {
      //   colour = '#cd000a'
      //   console.log('not green')
      // }

      return (
        <StockContainer key={id} data={element.daily} colour={colour}/>
      )
    })
  }

  render() {

    const { dataRetrieved, hotStocks } = this.state
    const currentData = this.state.googl['daily']
    //const currentClose = currentData.intraday[currentData.intraday.length - 1].closing_price

    return (
      <div className="App">
        <PrimarySearchAppBar />
            
        <div className="bodyContainer">
          <p className="stockTitle">Best Performers</p>

          {dataRetrieved ? (
            <div className="stockBody">
              {this.renderHotStocks()}
            </div>
          ) : ( 
            <p>loading</p> 
          )}
          
          <p className="stockTitle">Worst Performers</p>
          {dataRetrieved ? (
            <div className="stockBody">
              {this.renderHotStocks()}
            </div>
          ) : ( 
            <p>loading</p> 
          )}
                    
          <div className="watchlistBody">
            <p>{this.state.data}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
