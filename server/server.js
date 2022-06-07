require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const pool = require("./db");
const osuApi = require("osuApi")

//middleware
app.use(cors());
app.use(express.json());

/*
    Redirect user to osu! OAuth2 system
 */
app.get('/auth2', (req, res) => {
    res.redirect(
        `https://osu.ppy.sh/oauth/authorize?client_id=${process.env.API_CLIENT_ID}&redirect_uri=http://localhost:5000/oauth-callback/&response_type=code`
    )
})

/*
    We exchange the callback code for an user Api token
 */
app.get('/auth2-callback', ({query: { code } }, res) => {
    //the osu oauth redirects to our redirect uri with a code
    //we exchange the code for an user token with osuApi.getToken
    //then we use the user token to request the user api data with getUserMe
    //finally we post to our own express server the data we just got
    osuApi.getToken(code)
        .then((token) => {
            osuApi.getUserMe(token)
                .then ((_res) => {
                    let data = _res.data;
                    let user = osuApi.parseUserJson(data);
                    axios.post("http://localhost:3001/api/v1/usuario", {body: JSON.stringify(user)})
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            res.redirect("/");
        })
        .catch(err => console.log(err))
});

/*
    Insert new user
 */
app.post("/api/v1/usuario", (req, res) => {
    let userApi = JSON.parse(req.body.body);
    console.log(userApi);
    res.status(201).json({
        status: "success",
        data: {}
    })
})

app.listen(3001, () => {
    console.log("Server started on port 3001");
});
