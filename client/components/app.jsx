import React, { Component } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        GDPandPopulation: [],
        interestRate: [],
        unemploymentRate: [],
        inflationRate: [],
      }
    }
  }

  componentDidMount() {
    this.getIndicators();
  }

  getIndicators() {
    const fetchPopulationAndGDP = fetch(`http://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD;SP.POP.TOTL?source=2&format=json&per_page=31680`) // Retrieves GDP and Population by Country.
    const fetchLendingInterestRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/FR.INR.LEND?format=json&per_page=15850`)
    const fetchUnemploymentRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/SL.UEM.TOTL.ZS?format=json&per_page=15850`)
    const fetchInflationRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/FP.CPI.TOTL.ZG?format=json&per_page=15850`)
    Promise.all([fetchPopulationAndGDP, fetchLendingInterestRate, fetchInflationRate, fetchUnemploymentRate])
      .then(res => Promise.all(res.map(response => response.json())))
      .then(results => {
        console.log(results)
        // Combine years to 1 object.
        const GDPandPopulationData = results[0][1]
        const interestRateData = results[1][1]
        let reduceGDPandPopulationData = GDPandPopulationData.reduce((acc, val, i) => {
          let yearsObj = {}; // Create empty object literal to store population data in by year.
          if (i > 15839) { // We don't want values from previous indexes, since those contain GDP values.
            // Find first matching country ID.
            const country = GDPandPopulationData.find(element => element.country.id === val.country.id)
            // Loop through remaining matching countries
            country.populationByYear = { ...country.populationByYear, [val.date]: val.value }
            // Set the year as property in yearsObj
            // Set year property to population value
            // Set property in first matching country called "years" and set it equal to yearsObj.
            // Push into new acc array.
            acc.push(country)
            return acc;
          } else {
            // Same thing here, except we're doing it for GDP.
            const country = GDPandPopulationData.find(element => element.country.id === val.country.id)
            country.gdpByYear = { ...country.gdpByYear, [val.date]: val.value }
            acc.push(country)
            return acc;
          }
        }, [])
        const reduceInterestRateData = interestRateData.reduce((acc, val, i) => {
          const country = interestRateData.find(element => element.country.id === val.country.id)
          country.interestRateByYear = { ...country.interestRateByYear, [val.date]: val.value }
          acc.push(country)
          return acc;
        }, [])
        const GDPandPopulation = [...new Set(reduceGDPandPopulationData)]
        const interestRate = [...new Set(reduceInterestRateData)]
        console.log(GDPandPopulation)
        console.log(interestRate)
        this.setState({ data: { ...this.state.data, GDPandPopulation, interestRate } })
      })
      .catch(err => console.error(err));
  };

  reduceByCountry(data) {

  }

  render() {
    const { data } = this.state;
    if (data.length === 0) {
      return <div>LOADING...</div>
    }
    return (
      <>
        <Header />
        <main className="container-fluid main-container">
          <h1>YOU ARE SO GAY SAM</h1>
        </main>
        <Footer />
      </>
    )
  }
}
