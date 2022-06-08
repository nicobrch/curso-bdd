require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const pool = require("./db");
const osuApi = require("./osuApi")

/*
    middleware
 */
app.use(cors());
app.use(express.json());

/*
    Redirect user to osu! OAuth2 system
 */
app.get('/oauth', (req, res) => {
    res.redirect(
        `https://osu.ppy.sh/oauth/authorize?client_id=${process.env.API_CLIENT_ID}&redirect_uri=http://localhost:3001/oauth-callback/&response_type=code`
    )
})

/*
    Get callback code and get user data with token
 */
app.get('/oauth-callback', ({query: { code } }, res) => {
    /*
        osu redirects the user to our page with a code
        we exchange the code for an user token with osuApi.getToken
        then we use the token to make an api request and get the user data
        finally we post to our own express server
     */
    osuApi.getMeToken(code)
        .then((token) => {
            osuApi.getUserMe(token)
                .then ((_res) => {
                    let data = _res.data;
                    let user = osuApi.parseUserJson(data);
                    axios.post("http://localhost:3001/api/v1/usuario", {
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
                    })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            res.redirect("/");
        })
        .catch(err => console.log(err))
});

/*
   Ingresar usuario desde administrador con ID
 */
app.get('/admin/usuario/:id', (req, res) => {
   let userId = req.params.id;

    osuApi.getToken()
        .then((token) => {
            osuApi.getUserApi(token, userId)
                .then ((_res) => {
                    let data = _res.data;
                    let user = osuApi.parseUserJson(data);
                    axios.post("http://localhost:3001/api/v1/usuario", {
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
                    })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            res.redirect("/");
        })
        .catch(err => console.log(err))
});

/*
    Insert new user with OAuth
 */
app.post("/api/v1/usuario", async (req, res) => {
    try {
        const body = req.body;
        const newUser = await pool.query(
            `INSERT INTO usuario(id, username, pp, global_rank, country_rank, playcount, play_time, avatar_url, created_at, updated_at, country) VALUES(${body.id}, '${body.username}', ${body.pp}, ${body.global_rank}, ${body.country_rank}, ${body.playcount}, ${body.play_time}, '${body.avatar_url}', current_timestamp, current_timestamp, '${body.country}')`
        );
        if (body.badges.length !== 0){
           for (let i=0; i< body.badges.length; i++){
              try {
                 await pool.query(
                  `INSERT INTO usuario_badge(user_id, descripcion, image_url) VALUES (${body.id}, '${body.badges[i].description}', '${body.badges[i].image_url}')`
              );
              } catch (err) {
                 console.error(err.message);
              }
           }
        }
        res.status(200).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Algo salio mal :(');
    }
})

app.listen(3001, () => {
    console.log("Server started on port 3001");
});
