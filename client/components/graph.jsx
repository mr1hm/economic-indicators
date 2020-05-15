import React, { Component } from 'react';
import Chart from 'chart.js';
import { abbreviateNumbers } from './lib/helperFunctions';
import GraphTwo from './graphTwo';
let lineGraph, lineGraph2;

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvasRef2 = React.createRef();
    this.state = {
      graph1: {
        xAxis: [],
        yAxis: [],
      },
      graph2: {
        xAxis: [],
        yAxis: [],
      },
      countryAndValue: [],
      updated: false,
      countryView: {
        name: 'Arab World',
        indicator: 'Total GDP ($)'
      },
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

    // Needs Year selection
    // Work out logic for handling multiple graphs

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
          title: {
            display: true,
            text: countryView.name
          },
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 5,
              left: 15,
              right: 15,
              bottom: 15
            },
          },
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Year'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Value'
              },
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
    const { data: { totalGDP }, handleCountrySelect, countryView, } = this.props
    const indicators = ['Total GDP ($)', 'Total Population', 'Interest Rate (%)', 'Unemployment Rate (%)', 'Inflation Rate (%)', 'GDP Growth Rate (%)'];
    return (
      <>
        <section className="row country-selection">
          <div className="col d-flex">
            <label className="d-flex align-items-center country-select-label">Country</label>
            <select onChange={handleCountrySelect} className="country-selection-box" name="name">
              {totalGDP.map((val, i) => <option key={i}>{val.country.value}</option>)}
            </select>
            <label className="d-flex align-items-center country-indicator-select-label">Indicators</label>
            <select onChange={handleCountrySelect} className="country-indiciator-selection-box" name="indicator">
              {indicators.map((val, i) => <option key={i}>{val}</option>)}
            </select>
          </div>
        </section>
        <section className="row graph-container">
          <div className="col-6 d-flex">
            <div className="graph d-flex">
              <canvas id="canvas" ref={this.canvasRef} style={{ width: '700px' }} />
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="graph d-flex">
              {/* <GraphTwo countryView={countryView} data={this.props.data} handleCountrySelect={handleCountrySelect} /> */}
            </div>
          </div>
        </section>
      </>
    );
  }
}
