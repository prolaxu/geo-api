const fs = require("fs").promises;
const path = require("path");
const { processQuery } = require("./utils");

const countryColumns = ["id", "name", "gmt", "time-zone", "time-zone-des"];
const cityColumns = ["id","name", "country", "lat-degree", "lat-minute", "lat-direction", "lon-degree", "lon-minute", "lon-direction", "state"];

const getCities = async (country) => {
    try{
        const content =await fs.readFile(path.join(__dirname, "..", "dbs","cities", `${country}.json`), {
            encoding: "utf-8"
        });
        return JSON.parse(content);
    }
    catch(e){
        return [];
    }
}
const getCountries = async () => {
    try {
        const content =await fs.readFile(path.join(__dirname, "..", "dbs", "countries.json"), {
            encoding: "utf-8"
        });
        return JSON.parse(content);
    } catch (error) {
        return [];
    }
}

const queryCountries = async (query={}) => {
    const countries = await getCountries();
    if(!query){
        return countries;
    }
    const filteredCountries = countries.filter((country) => {
        let isMatch = false;
        Object.keys(query).forEach((key) => {
            const index = countryColumns.indexOf(key);
            if(query[key].isLike){
                if(country[index].includes(query[key].value)){
                    isMatch= true;
                }
            }else{
                if(country[index] == query[key].value){
                    isMatch= true;
                }
            }
        });
        return isMatch;
    });
    return filteredCountries;
}

const findCountry = async (value,key="id") => {
    const index =countryColumns.indexOf(key);
    const countries = await getCountries();
    return countries.find((country) => country[index] == value);
}
const findCity = async (value, key="id") => {
    const index = cityColumns.indexOf(key);
    const cities = await getCities();
    return cities.find((city) => city[index] == value);
}

const queryCities = async (query={},country) => {
    const cities = await getCities(country);
    if(!query){
        return cities;
    }
    const filteredCities = cities.filter((city) => {
        let isMatch = false;
        Object.keys(query).forEach((key) => {
            const index = cityColumns.indexOf(key);
            if(query[key].isLike){
                if(city[index].includes(query[key].value)){
                    isMatch= true;
                }
            }else{
                if(city[index] == query[key].value){
                    isMatch= true;
                }
            }
        });
        return isMatch;
    });
    return filteredCities;
}


module.exports ={
    getCities,
    getCountries,
    countryColumns,
    queryCountries,
    findCountry,
    findCity,
    queryCities,
}