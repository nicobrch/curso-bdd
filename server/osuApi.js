//http request
require('dotenv').config()
const axios = require("axios");
const apiURL = "https://osu.ppy.sh/api/v2";

const getToken = async (code) => {
    const body = {
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:5000/oauth-callback/"
    };
    const params = {
        headers : {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };
    return await axios.post('https://osu.ppy.sh/oauth/token', body, params).then((_res) => _res.data.access_token);
}

const getUserMe = async (token) => {
    const meUrl = apiURL + '/me/osu';
    const headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    };
    return await axios.get(meUrl, {headers: headers});
}

const parseUserJson = (data) => {
    return {
        id: data['id'],
        username: data['username'],
        pp: data['statistics']['pp'],
        global_rank: data['statistics']['global_rank'],
        country_rank: data['statistics']['country_rank'],
        badges: data['badges'],
        playcount: data['statistics']['play_count'],
        play_time: data['statistics']['play_time'],
        avatar_url: data['avatar_url'],
        country_code: data['country']['code'],
        joined_date: data['join_date']
    }
}

module.exports = { getToken, getUserMe, parseUserJson };