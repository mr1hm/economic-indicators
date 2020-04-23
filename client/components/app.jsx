import React, { Component } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getIndicators();
  }

  getIndicators() {
    const fetchPopulation = fetch(`http://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD;SP.POP.TOTL?source=2&format=json&per_page=31680`) // Now properly retrieves all population data.
    Promise.all([fetchPopulation])
      .then(res => Promise.all(res.map(response => response.json())))
      .then(results => {
        console.log(results)
      })
      .catch(err => console.error(err));
  };

  render() {
    return <h1>HELLO</h1>
  }
}
