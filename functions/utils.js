function processQuery(query){
    const { countryColumns } = require('./db');
    const queryKeys = Object.keys(query);
    let processedQuery = {};
    // remove the query keys that are not in the countryColumns
    if (queryKeys.length > 0) {
            queryKeys.forEach((key) => {
                if(countryColumns.includes(key)){
                    processedQuery[key] = JSON.parse(query[key]);
                }
            });
    }
    return processedQuery;
}
module.exports = {
    processQuery
}