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
    this.setState({ xAxis, yAxis }, () => {
      const { xAxis, yAxis, countryAndValue } = this.state;
      let stepSize = 10, columnSize = 50, rowSize = 50, margin = 10, sections = 263, valMax = 2000000, valMin = 0, xScale, yScale;
      const canvas = this.canvasRef.current
      const context = canvas.getContext('2d');
      context.fillStyle = 'white'
      context.font = '20 pt Verdana'
      context.fillRect(0, 0, canvas.width, canvas.height)
      yScale = (canvas.height - columnSize - margin) / (valMax - valMin)
      xScale = (canvas.width - rowSize) / sections
      context.strokeStyle = '#009933' // Color of grid lines
      context.beginPath()
      for (let i = 0; i <= sections; i++) {
        let x = i * xScale
        context.fillText(xAxis[i], x, columnSize - margin)
        context.moveTo(x, columnSize)
        context.lineTo(x, canvas.height - margin)
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
