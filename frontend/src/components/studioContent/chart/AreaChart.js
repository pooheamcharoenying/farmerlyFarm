import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar,
} from 'recharts';


// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
//   {
//     name: 'Page H', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page I', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page J', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page K', uv: 3490, pv: 4300, amt: 2100,
//   },
//   {
//     name: 'Page L', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page M', uv: 1890, pv: 4800, amt: 2181,
//   },
// ];



export default class Example extends React.Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c1rLyqj1/';

  constructor(props) {
    super(props);
    console.log('vuvu')
    console.log(props.chartData[0])
    this.yo = props.key1[0]
  }


  saySomething = (chartDataKey) => {
    console.log('say something');
    console.log(chartDataKey)
    return (
      <Bar type="monotone" dataKey="correct" stackId="1" stroke="#8884d8" fill="#21C207" />
    )
  }

  saySomethingLoop = (chartDataKey) => {
    this.saySomething();
  }

  getUnit = (chartDataKey) => {
    if (this.props.type == "Total") {
      return (" คะแนน")
    }
    else if (this.props.type == "Percentage") {
      return (" %")
    }
    else if (this.props.type == "Completed Lessons") {
      return (" บทเรียน")
    }
  }

  getChartData = () => {

    // this.saySomething();
    var newy = Object();

    console.log(this.props.chartData)
    if (this.props.type == "total") {
      return (this.props.chartData)
    } else if (this.props.type == "percentage") {
      newy.correct = this.props.chartData[0];
      newy.wrong = 100 * this.props.chartData.wrong / (this.props.chartData.correct + this.props.chartData.wrong);
      console.log('newy')
      console.log(this.props.chartData[0])
      return (this.props.chartData)
    }

    return (this.props.chartData)
  }



  render() {
    return (
      <div style={{ width: "100%"}}>

        <BarChart
          width={150 * this.props.chartData.length}
          height={300}
          data={this.props.chartData}
          margin={{
            top: 10, right: 30, left: 30, bottom: 0,
          }}
          // unit = {this.getUnit()}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" width={1000} allowDataOverflow={true} />
          {/* <YAxis unit="%" label={{ value: 'pv of page', angle: -90, position: 'insideLeft' }} /> */}
          <YAxis unit={this.getUnit()} />
          <Tooltip />

          {/* {console.log('this.props.chartDataKeyList')}
          {console.log(this.props.chartDataKeyList)}

          {this.props.chartDataKeyList.map((chartDataKey) => {
                this.saySomething(chartDataKey)
          })} */}

            {/* {this.saySomethingLoop()} */}

            {console.log('yo')}
            {console.log(this.props.chartDataKeyList[0])}

            <Bar type="monotone" dataKey={this.props.key1[0].dataKey} stackId="1" stroke="#8884d8" fill={this.props.key1[0].fill} unit={this.getUnit()} />
            <Bar type="monotone" dataKey={this.props.key2[0].dataKey} stackId="1" stroke="#8884d8" fill={this.props.key2[0].fill} unit={this.getUnit()} />
            <Bar type="monotone" dataKey={this.props.key3[0].dataKey} stackId="1" stroke="#8884d8" fill={this.props.key3[0].fill} unit={this.getUnit()} />


            {/* <Bar type="monotone" dataKey="wrong" stackId="1" stroke="#82ca9d" fill="#DA230D" />
          <Bar type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          <Bar type="monotone" dataKey="correct" stackId="1" stroke="#8884d8" fill="#21C207" />
          <Bar type="monotone" dataKey="wrong" stackId="1" stroke="#82ca9d" fill="#DA230D" />
          <Bar type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />  */}





          </BarChart>


        {/* </div> */}


      </div>

    );
  }
}
