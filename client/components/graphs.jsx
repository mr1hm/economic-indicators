import React, { Component } from 'react';
import Chart from 'chart.js';

export default class Graphs extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      xAxis: [],
      yAxis: [],
      countryAndValue: [],
    }
  }

  componentDidMount() {
    this.createDataPlots()
  }

  createDataPlots() {
    const { GDPandPopulation } = this.props;
    let xAxis = [], yAxis = [], countryAndValue = [];
    for (let i = 2005; i <= 2020; i++) {
      xAxis.push(i.toString())
    }
    let year = 2005;
    for (let j = 0; j < GDPandPopulation.length; j++) {
      yAxis.push(GDPandPopulation[j].populationByYear[year])
      year++;
    }
    this.setState({ xAxis, yAxis }, () => {
      const chartRef = this.canvasRef.current.getContext('2d');

      new Chart(chartRef, {
        type: 'line',
        data: {
          // Bring in data
          labels: this.state.xAxis,
          datasets: [
            {
              label: 'Population',
              data: this.state.yAxis,
            }
          ]
        },
        options: {
          // Customize chart options
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
