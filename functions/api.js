
const router = require('express').Router();
const { queryCities, queryCountries } = require('./db');
const { processQuery } = require('./utils');
// get all Countries queryCountries
router.get('/countries', async (req, res) => {
    let query = processQuery(req.query);
    const countries = await queryCountries(query);
    res.json(countries);
});

// get all cities
router.get('/cities', async (req, res) => {
    const country = req.query.country;
    // remove the country from the query
    delete req.query.country;
    const query = processQuery(req.query);
    console.log(query,country);
    const cities = await queryCities(query, country);
    res.json(cities);
});

module.exports = router;
