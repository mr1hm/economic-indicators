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
    const selectData = {
      'Total GDP ($)': 'totalGDP',
      'Total Population': 'totalPopulation',
      'Interest Rate (%)': 'interestRate',
      'Unemployment Rate (%)': 'unemploymentRate',
      'Inflation Rate (%)': 'inflationRate',
      'GDP Growth Rate (%)': 'GDPGrowthRate',
    }
    const indicators = {
      'Total GDP ($)': 'totalGDPByYear',
      'Total Population': 'totalPopulationByYear',
      'Interest Rate (%)': 'interestRateByYear',
      'Unemployment Rate (%)': 'unemploymentRateByYear',
      'Inflation Rate (%)': 'inflationRateByYear',
      'GDP Growth Rate (%)': 'GDPGrowthRateByYear',
    }
    let xAxis = [], yAxis = [], totalGDP = [], countryAndValue = [];
    for (let i = 2000; i <= 2020; i++) {
      xAxis.push(i.toString())
    }
    let year = '2000'
    const findCountry = data[selectData[countryView.indicator]].find(val => val.country.value === countryView.name)
    if (!findCountry) console.log('woops, that country doesnt exist');
    for (const key in findCountry[indicators[countryView.indicator]]) {
      if (key >= year) {
        yAxis.push(findCountry[indicators[countryView.indicator]][key]);
      }
    }
    this.setState({ xAxis, yAxis }, () => {
      const chartRef = this.canvasRef.current.getContext('2d');

      if (typeof lineGraph !== 'undefined') lineGraph.destroy();
      lineGraph = new Chart(chartRef, {
        type: 'line',
        data: {
          // Bring in data
          labels: this.state.xAxis,
          datasets: [
            {
              label: countryView.indicator,
              data: this.state.yAxis,
              borderColor: '#6610f2'
            },
          ]
        },
        options: {
          // Customize options here
          scales: {
            yAxes: [{
              ticks: {
                callback: function (value, index, values) {
                  if (value < 1000000) return value;
                  if (value >= 1000000000000) return value / 1e12 + 'T';
                  if (value >= 1000000000) return value / 1e9 + 'B';
                  if (value >= 1000000) return value / 1e6 + 'M';
                }
              }
            }]
          }
        }
      });
    })
  }

  render() {
    return (
      <div className="graph d-flex">
        <canvas id="canvas" ref={this.canvasRef} style={{ width: '700px', height: '100%' }} />
      </div>
    );
  }
}
