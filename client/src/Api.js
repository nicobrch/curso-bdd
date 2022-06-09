const axios = require ('axios').default;
const apiUrl = 'http://localhost:3001/api/v1'

export const fetchUser = (id) => {
    console.log('Fetching Torneo...');
    return axios
        .get(apiUrl + '/usuario/' + id)
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const fetchUsers = () => {
    console.log('Fetching Users...');
    return axios
        .get(apiUrl + '/usuario')
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const fetchTorneo = (id) => {
    console.log('Fetching Torneo...');
    return axios
        .get(apiUrl + '/torneo/' + id)
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const fetchTorneos = () => {
    console.log('Fetching Torneos...');
    return axios
        .get(apiUrl + '/torneo')
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const fetchPeriferico = (id) => {
    console.log('Fetching Periferico...');
    return axios
        .get(apiUrl + '/periferico/' + id)
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const fetchPerifericos = () => {
    console.log('Fetching Perifericos...');
    return axios
        .get(apiUrl + '/periferico')
        .then(res => res.data)
        .catch(err => console.error(err.message));
};