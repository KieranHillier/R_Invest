import React, { Component } from 'react';
import { LineChart, ReferenceLine, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';


const companyNames = {
  'AMZN': 'Amazon',
  'FB': 'Facebook',
  'GOOGL': 'Google',
  'TWTR': 'Twitter'
}

class StockContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      colorGraph: '',
      colorText: '',
    }
  }

  componentDidMount() {
    this.determineColour()
  }

  determineColour = () => {
    let colorGraph = ''
    let colorText = ''

    if (Math.sign(this.props.data.differencePrice) === 1) {
      colorGraph = '#66CD00'
      colorText = '#268700'
    } else {
      colorGraph = '#cd000a'
      colorText = '#a30109'
    }

    this.setState({
      colorGraph,
      colorText
    })
  }

  render() {

    const { data, colour } = this.props
    const { colorGraph, colorText } = this.state
    
    return (
      <div className="stockCard">
        <div className="stockTitleDetails">
          <p className="stockName">{companyNames[data.symbol]}</p>
          <p className="stockSymbol">{data.symbol}</p>
        </div>
        <div className="stockDetails">
          <p className="stockDetailsText">{data.closingPrice}</p>
          <p style={{color: colorGraph}} className="stockDetailsStats">{data.differencePrice}({data.differencePercentagePrice}%)</p>
        </div>
        <div className="stockChart">      
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart className="lineChart" data={data.intraday}
                margin={{top: 5, bottom: 0, right: 30, left: 0}}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colorGraph} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colorGraph} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <YAxis axisLine={false} width={50} tickLine={false} interval={0} allowDecimals={false} type="number" domain={['auto', 'auto']}/>
              <XAxis axisLine={false} padding={{left:10}} tickLine={false} interval={8} height={30} dataKey="time" reversed={true}/>
              <CartesianGrid vertical={false}/>
              <Tooltip coordinate={{ x: 1000, y: 0 }}/>
              <ReferenceLine y={data.startingPrice} stroke={colorText} strokeDasharray="3 3" />
              <Area type="linear" dataKey="closing_price" dot={false} stroke={colorText} activeDot={{r: 8}} fill={"url(#colorUv)"}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default StockContainer;