import React, { Component } from 'react';
import Chart from 'chart.js';
let lineGraph;

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
    const { GDPandPopulation, interestRate, countryView } = this.props;
    let xAxis = [], yAxis = [], totalGDP = [], countryAndValue = [];
    for (let i = 2005; i <= 2020; i++) {
      xAxis.push(i.toString())
    }
    let year = '2005', findCountry;
    // NEED TO FIGURE OUT A BETTER WAY TO AUTOMATE THIS.
    if (GDPandPopulation) {
      findCountry = GDPandPopulation.find(val => val.country.value === countryView)
    }
    if (interestRate) {
      findCountry = interestRate.find(val => val.country.value === countryView)
    }
    if (!findCountry) console.log('woops, that country doesnt exist');
    for (const key in findCountry.populationByYear) {
      if (key >= year) {
        yAxis.push(findCountry.populationByYear[key]);
      }
    }
    for (const key in findCountry.totalGDPByYear) {
      if (key >= year) {
        totalGDP.push(findCountry.totalGDPByYear[key]);
      }
    }
    this.setState({ xAxis, yAxis, totalGDP }, () => {
      const chartRef = this.canvasRef.current.getContext('2d');

      if (typeof lineGraph !== 'undefined') lineGraph.destroy();

      if (GDPandPopulation) {
        lineGraph = new Chart(chartRef, {
          type: 'line',
          data: {
            // Bring in data
            labels: this.state.xAxis,
            datasets: [
              {
                label: 'Population',
                data: this.state.yAxis,
                borderColor: '#6610f2'
              },
              {
                label: 'Total GDP',
                data: this.state.totalGDP,
                borderColor: '#008000',
              }
            ]
          },
          options: {
            // Customize options here
          }
        });
      }
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
