const axios = require ('axios').default;
const apiUrl = 'http://localhost:5000/api/v1';
const adminUrl = 'http://localhost:5000/admin';

export const fetchUser = (id) => {
    console.log('Fetching User...');
    return axios
        .get(apiUrl + '/usuario/' + id)
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const postUser = (body) => {
    console.log('Inserting User...');
    return axios
        .post(adminUrl + '/usuario', {body: body, headers: { Accept : 'application/json'}})
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

export const fetchUserBadges = (id) => {
    console.log('Fetching User Badges...');
    return axios
        .get(apiUrl + '/userbadge/' + id)
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const fetchUserTorneos = (id) => {
    console.log('Fetching User Torneos...');
    return axios
        .get(apiUrl + '/usertorneo/' + id)
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const fetchUserPerifericos = (id) => {
    console.log('Fetching User Torneos...');
    return axios
        .get(apiUrl + '/userperiferico/' + id)
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const fetchUserConfig = (tipo, id) => {
    console.log('Fetching User Mouse Config...');
    tipo.toLowerCase();
    return axios
        .get(apiUrl + '/user' + tipo + '/' + id)
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

export const fetchBadge = (id) => {
    console.log('Fetching Badge...');
    return axios
        .get(apiUrl + '/badge/' + id)
        .then(res => res.data)
        .catch(err => console.error(err.message));
};

export const fetchBadges = () => {
    console.log('Fetching Badges...');
    return axios
        .get(apiUrl + '/badge')
        .then(res => res.data)
        .catch(err => console.error(err.message));
};