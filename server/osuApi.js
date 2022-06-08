//http request
require('dotenv').config()
const axios = require("axios");
const apiURL = "https://osu.ppy.sh/api/v2";
const tokenURL = "https://osu.ppy.sh/oauth/token";
const usuarioURL = "http://localhost:3001/api/v1/usuario";

async function getMeToken(code){
    const body = {
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3001/oauth-callback/"
    };
    const params = {
        headers : {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };
    return await axios.post(tokenURL, body, params).then((_res) => _res.data.access_token);
}

async function getUserMe(token){
    const meUrl = apiURL + '/me/osu';
    const headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    };
    return await axios.get(meUrl, {headers: headers});
}

async function getToken(){
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

    return await axios.post(tokenURL, body, params).then((_res) => _res.data.access_token);
}

const getUserApi = async (token, id) => {
    const userUrl = apiURL + '/users/' + id + '/osu';
    const headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    };
    return await axios.get(userUrl, {headers: headers});
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
        country: data['country']['name'],
    }
}

const postUser = async (data) => {
    let user = parseUserJson(data);
    return await axios.post(usuarioURL, {
        id : parseInt(user.id),
        username : (user.username).toString(),
        pp : parseInt(user.pp),
        global_rank : parseInt(user.global_rank),
        country_rank : parseInt(user.country_rank),
        badges : user.badges,
        playcount : parseInt(user.playcount),
        play_time : parseInt(user.play_time),
        avatar_url : (user.avatar_url).toString(),
        country : (user.country).toString(),
    });
}

const updateUser = async (data, userId) => {
    let user = parseUserJson(data);
    return await axios.put(usuarioURL+'/'+userId, {
        id : parseInt(user.id),
        username : (user.username).toString(),
        pp : parseInt(user.pp),
        global_rank : parseInt(user.global_rank),
        country_rank : parseInt(user.country_rank),
        badges : user.badges,
        playcount : parseInt(user.playcount),
        play_time : parseInt(user.play_time),
        avatar_url : (user.avatar_url).toString(),
        country : (user.country).toString(),
    });
}

module.exports = {getMeToken, getUserMe, parseUserJson, getToken, getUserApi, postUser};