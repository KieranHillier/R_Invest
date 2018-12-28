//LOAD IN LATEST CLOSE FROM SERVER
//make the get function work for any stock
//make the chart into a component 

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class App extends Component {

  state = {
    data: null,
    googl: [],
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
        dataRetrieved: true
      }))
      .then(console.log(this.state.googl))
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

  render() {

    const { dataRetrieved } = this.state
    const currentData = this.state.googl['12/28/2018']
    //const currentClose = currentData.intraday[currentData.intraday.length - 1].closing_price

    return (
      <div className="App">
        <PrimarySearchAppBar />
            
        <div className="bodyContainer">
          <div className="stockBody">
            <div className="stockCard">
              <div className="stockDetails">
                <p className="stockDetailsText">`GOOG · $1047`</p>
                <p className="stockDetailsStats">-21.3(2.08%)</p>
              </div>
              <div className="stockChart">
              {dataRetrieved ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart className="lineChart" data={currentData.intraday}
                      margin={{top: 5, bottom: 5, right: 30}}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <YAxis axisLine={false} tickLine={false} interval={0} allowDecimals={false} type="number" domain={['auto', 'auto']}/>
                    <XAxis axisLine={false} padding={{left:10}} tickLine={false} interval={6} height={30} dataKey="time" reversed={true}/>
                    <CartesianGrid vertical={false}/>
                    <Tooltip coordinate={{ x: 1000, y: 0 }}/>
                    <Area type="monotone" dataKey="closing_price" dot={false} stroke="#8884d8" activeDot={{r: 8}} fill="url(#colorUv)"/>
                  </AreaChart>
                </ResponsiveContainer>
              ) : ( 
                <p>loading</p> 
              )}
              </div>
              
            </div>
            <div className="stockCard">
              <ResponsiveContainer width="100%" height="90%">
                <LineChart className="lineChart" data={data}
                    margin={{top: 5, bottom: 5, right: 30}}>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="stockCard">
              <ResponsiveContainer width="100%" height="90%">
                <LineChart className="lineChart" data={data}
                    margin={{top: 5, bottom: 5, right: 30}}>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="watchlistBody">
            <p>{this.state.data}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
