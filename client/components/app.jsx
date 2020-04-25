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
    // Combine years to 1 object.
    // Create empty object literal to store population data in by year.
    // We don't want values from previous indexes, since those contain GDP values.
    // Find first matching country ID.
    // Loop through remaining matching countries
    // Set the year as property in yearsObj
    // Set year property to population value
    // Set property in first matching country called "years" and set it equal to yearsObj.
    // Push into new acc array.
    const fetchPopulationAndGDP = fetch(`http://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD;SP.POP.TOTL?source=2&format=json&per_page=31680`) // Retrieves GDP and Population by Country.
    const fetchLendingInterestRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/FR.INR.LEND?format=json&per_page=15850`)
    const fetchUnemploymentRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/SL.UEM.TOTL.ZS?format=json&per_page=15850`)
    const fetchInflationRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/FP.CPI.TOTL.ZG?format=json&per_page=15850`)
    const fetchGDPGrowthRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=15850`)
    const fetchGDPAgricultureAndConstruction = fetch(`http://api.worldbank.org/v2/country/all/indicator/NV.AGR.TOTL.ZS;NV.IND.TOTL.ZS?source=2&format=json&per_page=31680`)
    const fetchGDPManufacturingAndMining = fetch(`http://api.worldbank.org/v2/country/all/indicator/NV.IND.MANF.ZS?source=2&format=json&per_page=31680`) // Need to find API query param for Mining.
    Promise.all([
      fetchPopulationAndGDP,
      fetchLendingInterestRate,
      fetchUnemploymentRate,
      fetchInflationRate,
      fetchGDPGrowthRate,
      fetchGDPAgricultureAndConstruction,
      fetchGDPManufacturingAndMining])
      .then(res => Promise.all(res.map(response => response.json())))
      .then(results => {
        console.log(results)
        // Instead of targeting these data sets separately, we can use a loop. Figure it out!
        const totalGDPandPopulationData = results[0][1]
        const interestRateData = results[1][1]
        const unemploymentRateData = results[2][1]
        const inflationRateData = results[3][1]
        const GDPGrowthRateData = results[4][1] // GDP Growth Rate by year - percentage.
        const GDPAgricultureAndConstructionData = results[5][1] // Percent of total GDP.
        const GDPManufacturingAndMiningData = results[6][1] // Percent of total GDP.
        console.log(GDPAgricultureAndConstructionData)
        console.log(GDPManufacturingAndMiningData)
        let reduceTotalGDPandPopulationData = totalGDPandPopulationData.reduce((acc, val, i) => {
          let yearsObj = {};
          if (i > 15839) {
            const country = totalGDPandPopulationData.find(element => element.country.id === val.country.id)
            country.populationByYear = { ...country.populationByYear, [val.date]: val.value }
            acc.push(country)
            return acc;
          } else {
            const country = totalGDPandPopulationData.find(element => element.country.id === val.country.id)
            country.totalGDPByYear = { ...country.totalGDPByYear, [val.date]: val.value }
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
        const reduceUnemploymentRateData = unemploymentRateData.reduce((acc, val, i) => {
          const country = unemploymentRateData.find(element => element.country.id === val.country.id)
          country.unemploymentRateByYear = { ...country.unemploymentRateByYear, [val.date]: val.value }
          acc.push(country)
          return acc;
        }, [])
        const reduceInflationRateData = inflationRateData.reduce((acc, val, i) => {
          const country = inflationRateData.find(element => element.country.id === val.country.id)
          country.inflationRateByYear = { ...country.inflationRateByYear, [val.date]: val.value }
          acc.push(country)
          return acc;
        }, [])
        const reduceGDPGrowthRateData = GDPGrowthRateData.reduce((acc, val, i) => {
          const country = GDPGrowthRateData.find(element => element.country.id === val.country.id)
          country.GDPGrowthRateByYear = { ...country.GDPGrowthRateByYear, [val.date]: val.value }
          acc.push(country)
          return acc;
        }, [])
        const GDPandPopulation = [...new Set(reduceTotalGDPandPopulationData)]
        const interestRate = [...new Set(reduceInterestRateData)]
        const unemploymentRate = [...new Set(reduceUnemploymentRateData)]
        const inflationRate = [...new Set(reduceInflationRateData)]
        const GDPGrowthRate = [...new Set(reduceGDPGrowthRateData)]
        console.log('GDP and Population:', GDPandPopulation)
        console.log('Interest Rate:', interestRate)
        console.log('Unemployment Rate:', unemploymentRate)
        console.log('Inflation Rate:', inflationRate)
        console.log('GDP Growth Rate:', GDPGrowthRate)
        this.setState({ data: { ...this.state.data, GDPandPopulation, interestRate } })
      })
      .catch(err => console.error(err));
  };

  reduceByCountry(data) {

  }

  render() {
    const { GDPandPopulation, UnemploymentRate, InflationRate } = this.state.data;
    if (GDPandPopulation.length === 0) {
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
