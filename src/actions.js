const requestCountries = () => {
    return { type: 'REQUESTED_COUNTRIES' }
};

const requestCountriesSuccess = (data) => {
    let res='';
    if (data && Array.isArray(data)){
        res={};
        for(let i=0; i<data.length; i++){
            let {name, capital, population, alpha2Code, flag} = data[i];
            let firstLetter = name.substring(0,1).toLowerCase();
            !res[firstLetter] && (res[firstLetter]={});
            res[firstLetter][name] = {name, capital, population, alpha2Code, flag};
        }
    }
    return { type: 'REQUESTED_COUNTRIES_SUCCEEDED', data: res }
};

const requestCountriesError = () => {
    return { type: 'REQUESTED_COUNTRIES_FAILED' }
};

const fetchCountries = () => {
    return { type: 'FETCHED_COUNTRIES' }
};

export {requestCountries, requestCountriesSuccess, requestCountriesError, fetchCountries}