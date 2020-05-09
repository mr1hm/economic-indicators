const Pool = require('pg').Pool;
const conn = require('./db_conn');

const storeCountries = (req, res, next) => {
  const { countries } = req.body
  console.log(countries)
  for (let i = 0; i < countries.length; i++) {
    conn.query(`INSERT INTO countries (name, country_iso3_code) VALUES ($1, $2) returning *`, [countries[i].countryName, countries[i].countryiso3code], (err, results) => {
      if (err) throw err;
      res.status(201)
    })
  }
}

const getAllData = (req, res, next) => {
  conn.query(`select * from data`)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err))
}


module.exports = {
  storeCountries,
}
