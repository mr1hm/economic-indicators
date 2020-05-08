import React, { Component } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import Loading from './layout/loading';
import Graphs from './graphs';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {
        totalGDP: [],
        totalPopulation: [],
        interestRate: [],
        unemploymentRate: [],
        inflationRate: [],
        GDPGrowthRate: [],
        GDPagricultureAndConstruction: [],
        GDPmanufacturing: [],
        GDPservices: [],
      },
      countryView: {
        name: 'Arab World',
        indicator: 'Total GDP ($)'
      },
    }
    this.handleCountrySelect = this.handleCountrySelect.bind(this)
  }

  componentDidMount() {
    this.getIndicators();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.setState({ loading: false })
    }
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
    const fetchTotalGDP = fetch(`http://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?source=2&format=json&per_page=15850`) // Retrieves GDP and Population by Country.
    const fetchTotalPopulation = fetch(`http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?source=2&format=json&per_page=15850`)
    const fetchLendingInterestRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/FR.INR.LEND?format=json&per_page=15850`)
    const fetchUnemploymentRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/SL.UEM.TOTL.ZS?format=json&per_page=15850`)
    const fetchInflationRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/FP.CPI.TOTL.ZG?format=json&per_page=15850`)
    const fetchGDPGrowthRate = fetch(`http://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=15850`)
    const fetchGDPAgricultureAndConstruction = fetch(`http://api.worldbank.org/v2/country/all/indicator/NV.AGR.TOTL.ZS;NV.IND.TOTL.ZS?source=2&format=json&per_page=31680`)
    const fetchGDPManufacturingAndMining = fetch(`http://api.worldbank.org/v2/country/all/indicator/NV.IND.MANF.ZS?source=2&format=json&per_page=31680`) // Need to find API query param for Mining.
    const fetchGDPServices = fetch(`http://api.worldbank.org/v2/country/all/indicator/NV.SRV.TOTL.ZS?format=json&per_page=31680`)
    Promise.all([
      fetchTotalGDP,
      fetchTotalPopulation,
      fetchLendingInterestRate,
      fetchUnemploymentRate,
      fetchInflationRate,
      fetchGDPGrowthRate,
      fetchGDPAgricultureAndConstruction,
      fetchGDPManufacturingAndMining,
      fetchGDPServices])
      .then(res => Promise.all(res.map(response => response.json())))
      .then(results => {
        console.log(results)
        // Instead of targeting these data sets separately, we can use a loop. Figure it out!
        const totalGDPData = results[0][1]
        const totalPopulationData = results[1][1]
        const interestRateData = results[2][1]
        const unemploymentRateData = results[3][1]
        const inflationRateData = results[4][1]
        const GDPGrowthRateData = results[5][1] // GDP Growth Rate by year - percentage.
        const GDPAgricultureAndConstructionData = results[6][1] // Percent of total GDP.
        const GDPManufacturingAndMiningData = results[7][1] // Percent of total GDP.
        const GDPServicesData = results[8][1]
        const reduceTotalGDPData = totalGDPData.reduce((acc, val, i) => {
          const country = totalGDPData.find(element => element.country.id === val.country.id)
          country.totalGDPByYear = { ...country.totalGDPByYear, [val.date]: val.value }
          acc.push(country)
          return acc;
        }, [])
        const reduceTotalPopulationData = totalPopulationData.reduce((acc, val, i) => {
          const country = totalPopulationData.find(element => element.country.id === val.country.id)
          country.totalPopulationByYear = { ...country.totalPopulationByYear, [val.date]: val.value }
          acc.push(country)
          return acc;
        }, [])
        // let reduceTotalGDPandPopulationData = totalGDPandPopulationData.reduce((acc, val, i) => {
        //   let yearsObj = {};
        //   if (i > 15839) {
        //     const country = totalGDPandPopulationData.find(element => element.country.id === val.country.id)
        //     country.populationByYear = { ...country.populationByYear, [val.date]: val.value }
        //     acc.push(country)
        //     return acc;
        //   } else {
        //     const country = totalGDPandPopulationData.find(element => element.country.id === val.country.id)
        //     country.totalGDPByYear = { ...country.totalGDPByYear, [val.date]: val.value }
        //     acc.push(country)
        //     return acc;
        //   }
        // }, [])
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
        const reduceAgrilcultureAndConstructionData = GDPAgricultureAndConstructionData.reduce((acc, val, i) => {
          const country = GDPAgricultureAndConstructionData.find(element => element.country.id === val.country.id)
          country.percentGDPfromAgricultureAndConstruction = { ...country.percentGDPfromAgricultureAndConstruction, [val.date]: val.value }
          acc.push(country)
          return acc;
        }, [])
        const reduceGDPManufacturingAndMiningData = GDPManufacturingAndMiningData.reduce((acc, val, i) => {
          const country = GDPManufacturingAndMiningData.find(element => element.country.id === val.country.id)
          country.percentGDPfromManufacturingAndMining = { ...country.percentGDPfromManufacturingAndMining, [val.date]: val.value }
          acc.push(country)
          return acc;
        }, [])
        const reduceGDPServicesData = GDPServicesData.reduce((acc, val, i) => {
          const country = GDPServicesData.find(element => element.country.id === val.country.id)
          country.percentGDPfromServices = { ...country.percentGDPfromServices, [val.date]: val.value }
          acc.push(country)
          return acc;
        }, [])
        const totalGDP = [...new Set(reduceTotalGDPData)]
        const totalPopulation = [...new Set(reduceTotalPopulationData)]
        const interestRate = [...new Set(reduceInterestRateData)]
        const unemploymentRate = [...new Set(reduceUnemploymentRateData)]
        const inflationRate = [...new Set(reduceInflationRateData)]
        const GDPGrowthRate = [...new Set(reduceGDPGrowthRateData)]
        const GDPAgricultureAndConstruction = [...new Set(reduceAgrilcultureAndConstructionData)]
        const GDPManufacturingAndMining = [...new Set(reduceGDPManufacturingAndMiningData)]
        const GDPServices = [...new Set(reduceGDPServicesData)]
        console.log('Total GDP:', totalGDP)
        console.log('Total Population:', totalPopulation)
        console.log('Interest Rate:', interestRate)
        console.log('Unemployment Rate:', unemploymentRate)
        console.log('Inflation Rate:', inflationRate)
        console.log('GDP Growth Rate:', GDPGrowthRate)
        console.log('GDP from Agriculture and Construction:', GDPAgricultureAndConstruction)
        console.log('GDP from Manufacturing and Mining:', GDPManufacturingAndMining)
        console.log('GDP from Services:', GDPServices)
        this.setState({ data: { ...this.state.data, totalGDP, totalPopulation, interestRate, unemploymentRate, inflationRate, GDPGrowthRate } })
      })
      .catch(err => console.error(err));
  };

  handleCountrySelect(e) {
    const name = e.target.name, value = e.target.value
    this.setState({ [name]: value })
  }

  render() {
    const { data: { totalGDP, totalPopulation, interestRate, unemploymentRate, inflationRate }, countryView } = this.state;
    if (this.state.loading) {
      return (
        <Loading loading={this.state.loading} />
      );
    }
    return (
      <>
        <Header />
        <main className="container-fluid main-container">
          <section className="row country-selection">
            <div className="col d-flex">
              <label className="d-flex align-items-center country-select-label">Country</label>
              <select onChange={this.handleCountrySelect} className="country-selection-box" name="countryView">
                {totalGDP.map((val, i) => <option key={i}>{val.country.value}</option>)}
              </select>
            </div>
          </section>
          <section className="row graph-container">
            <div className="col-6 d-flex">
              {countryView ? <Graphs countryView={countryView} data={this.state.data} /> : null}
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }
}
