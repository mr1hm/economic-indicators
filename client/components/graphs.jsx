import React, { Component } from 'react';

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
    for (let j = 0; j < GDPandPopulation.length; j++) {
      yAxis.push(GDPandPopulation[j].country.value)
    }
    this.setState({ xAxis, yAxis })
  }

  render() {
    return (
      <div className="graph d-flex">
        <canvas id="canvas" ref={this.canvasRef} style={{ width: '650px', height: '400px' }} />
      </div>
    );
  }
}
