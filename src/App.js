import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip, ResponsiveContainer } from 'recharts';

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
  render() {
    return (
      <div className="App">
        <PrimarySearchAppBar />
        <div className="bodyContainer">
          <div className="stockBody">
            <div className="stockCard">
              <div className="stockDetails">
                <p className="stockDetailsText">GOOG · $1,046</p>
                <p className="stockDetailsStats">-21.3(2.08%)</p>
              </div>
              <div className="stockChart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart className="lineChart" data={data}
                      margin={{top: 5, bottom: 5, right: 30}}>
                    <YAxis axisLine={false}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
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
            <p>watchlist</p>
          </div>

        

        </div>
      </div>
    );
  }
}

export default App;
