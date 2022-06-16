require('dotenv').config()
const axios = require("axios").default;
const apiUrl = "https://osu.ppy.sh/api/v2";
const tokenUrl = "https://osu.ppy.sh/oauth/token";

// Get token mediante oauth
const getMeToken = async (code) => {
    const body = {
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:5000/oauth-callback/",
    };
    const params = {
        headers : {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };
    return await axios.post(tokenUrl, body, params).then((_res) => _res.data.access_token);
}

const getUserMe = async (token) => {
    const meUrl = apiUrl + '/me/osu';
    const headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    };
    return await axios.get(meUrl, {headers: headers});
}

// Get token mediante guest client
const getToken = async () => {
    let body = {
        "client_id": process.env.API_CLIENT_ID,
        "client_secret": process.env.API_CLIENT_SECRET,
        "grant_type": "client_credentials",
        "scope": "public"
    }

    const params = {
        headers : {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };

    return await axios.post(tokenUrl, body, params).then((_res) => _res.data.access_token);
}

const getUserData = async (token, id) => {
    const userUrl = apiUrl + '/users/' + id + '/osu';
    const headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    };
    return await axios.get(userUrl, {headers: headers});
}

const parseUserJson = (userData) => {
    return {
        id: userData['id'],
        username: userData['username'],
        pp: userData['statistics']['pp'],
        global_rank: userData['statistics']['global_rank'],
        country_rank: userData['statistics']['country_rank'],
        badges: userData['badges'],
        playcount: userData['statistics']['play_count'],
        play_time: userData['statistics']['play_time'],
        avatar_url: userData['avatar_url'],
        country: userData['country']['name'],
    }
}

module.exports = ({getMeToken, getUserMe, getToken, getUserData, parseUserJson});