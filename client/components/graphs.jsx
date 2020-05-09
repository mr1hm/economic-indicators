import React, { Component } from 'react';
import Chart from 'chart.js';
import { abbreviateNumbers } from './lib/helperFunctions';
let lineGraph, lineGraph2, lineGraph3, lineGraph4, lineGraph5, lineGraph6;

export default class Graphs extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      xAxis: [],
      yAxis: [],
      totalGDP: [],
      countryAndValue: [],
      updated: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.countryView !== this.props.countryView) this.createLineChart()
  }

  componentDidMount() {
    this.createLineChart()
  }

  createLineChart() {
    const { data, countryView } = this.props;
    let xAxis = [], yAxis = [], totalGDP = [], countryAndValue = [];
    for (let i = 2005; i <= 2020; i++) {
      xAxis.push(i.toString())
    }
    let year = '2005'
    // NEED TO FIGURE OUT A BETTER WAY TO AUTOMATE THIS.
    const findCountry = data.totalGDP.find(val => val.country.value === countryView)
    if (!findCountry) console.log('woops, that country doesnt exist');
    for (const key in findCountry.totalGDPByYear) {
      if (key >= year) {
        yAxis.push(findCountry.totalGDPByYear[key]);
      }
    }
    this.setState({ xAxis, yAxis, totalGDP }, () => {
      const chartRef = this.canvasRef.current.getContext('2d');

      if (typeof lineGraph !== 'undefined') lineGraph.destroy();
      lineGraph = new Chart(chartRef, {
        type: 'line',
        data: {
          // Bring in data
          labels: this.state.xAxis,
          datasets: [
            {
              label: 'Total GDP',
              data: this.state.yAxis,
              borderColor: '#6610f2'
            },
          ]
        },
        options: {
          // Customize options here
        }
      });
    })
  }

  render() {
    return (
      <div className="graph d-flex">
        <canvas id="canvas" ref={this.canvasRef} style={{ width: '650px', height: '400px' }} />
      </div>
    );
  }
}
