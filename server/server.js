require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
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
                    osuApi.postUser(data)
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            res.redirect("/");
        })
        .catch(err => console.log(err))
});

/*
    Insert new user from API data
 */
app.post('/api/v1/usuario', async (req, res) => {
    try {
        const body = req.body;
        const newUser = await pool.query(
            `INSERT INTO usuario(id, username, pp, global_rank, country_rank, playcount, play_time, avatar_url, created_at, updated_at, country) VALUES(${body.id}, '${body.username}', ${body.pp}, ${body.global_rank}, ${body.country_rank}, ${body.playcount}, ${body.play_time}, '${body.avatar_url}', current_timestamp, current_timestamp, '${body.country}')`
        );
        if (body.badges.length !== 0){
           for (let i=0; i< body.badges.length; i++){
              try {
                 await pool.query(
                  `INSERT INTO badge(descripcion, image_url) VALUES ('${body.badges[i].description}', '${body.badges[i].image_url}')`
              );
                 await pool.query(
                  `INSERT INTO usuario_badge(user_id, badge_id) VALUES (${body.id}, (SELECT id FROM badge WHERE descripcion = '${body.badges[i].description}'))`
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

/*
    Update user and user_badge
 */
app.put('/api/v1/usuario/:id', async (req, res) => {
   try {
      const userId = req.params.id;
      const body = req.body;

      const updateUser = await pool.query(
            `UPDATE usuario SET username = '${body.username}', pp = ${body.pp}, global_rank = ${body.global_rank}, country_rank = ${body.country_rank}, playcount = ${body.playcount}, play_time = ${body.play_time}, avatar_url = '${body.avatar_url}', updated_at = current_timestamp, country ='${body.country}' WHERE id = ${userId}`
      );
      /*
      if (body.badges.length !== 0){
           for (let i=0; i< body.badges.length; i++){
              try {
                 await pool.query(
                  `UPDATE usuario_badge SET descripcion = '${body.badges[i].description}', image_url = '${body.badges[i].image_url}' WHERE id = ${body.id}`
              );
              } catch (err) {
                 console.error(err.message);
              }
           }
        }
       */
      res.status(200).json(updateUser.rows[0]);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Algo salio mal :(');
   }
})

/*
    Get all users
 */
app.get('/api/v1/usuario', async (req, res) => {
   try {
      const allUsers = await pool.query(
            `SELECT * from usuario ORDER BY global_rank`
      );
      res.status(200).json(allUsers.rows);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Algo salio mal :(');
   }
})

/*
    Get one user by ID
 */
app.get('/api/v1/usuario/:id', async (req, res) => {
   try {
      const userId = req.params.id;

      const user = await pool.query(
            `SELECT * from usuario WHERE id = ${userId}`
      );
      res.status(200).json(user.rows[0]);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Algo salio mal :(');
   }
})

/*
    Insert new torneo
 */
app.post('/api/v1/torneo', async (req, res) => {
    try {
        const body = req.body;
        const newTorneo = await pool.query(
            `INSERT INTO torneo(name, rank_range, badged, prizepool, bws, url, spreadsheet_url, cierre_regs, formato, cover_url, descripcion) VALUES ('${body.name}', '${body.rank_range}', ${body.badged}, '${body.prizepool}', ${body.bws}, '${body.url}', '${body.spreadsheet_url}', '${body.cierre_regs}', '${body.formato}', '${body.cover_url}', '${body.descripcion}')`
        )
        res.status(200).json(newTorneo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Algo salio mal :(');
    }
})

/*
    Update torneo
 */
app.put('/api/v1/torneo/:id', async (req, res) => {
    try {
        const body = req.body;
        const torneoId = req.params.id;
        const updateTorneo = await pool.query(
            `UPDATE torneo SET name ='${body.name}', rank_range = '${body.rank_range}', badged = ${body.badged}, prizepool = '${body.prizepool}', bws = ${body.bws}, url = '${body.url}', spreadsheet_url = '${body.spreadsheet_url}', cierre_regs = '${body.cierre_regs}', formato = '${body.formato}', cover_url = '${body.cover_url}', descripcion = '${body.descripcion}' WHERE id = ${torneoId}`
        )
        res.status(200).json(updateTorneo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Algo salio mal :(');
    }
})

/*
    Get all torneos
 */
app.get('/api/v1/torneo', async (req, res) => {
   try {
      const allTorneos = await pool.query(
            `SELECT * from torneo`
      );
      res.status(200).json(allTorneos.rows);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Algo salio mal :(');
   }
})

/*
    Get one torneo by ID
 */
app.get('/api/v1/torneo/:id', async (req, res) => {
   try {
      const torneoId = req.params.id;

      const torneo = await pool.query(
            `SELECT * from torneo WHERE id = ${torneoId}`
      );
      res.status(200).json(torneo.rows[0]);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Algo salio mal :(');
   }
})

/*
    Insert new periferico
 */
app.post('/api/v1/periferico', async (req, res) => {
    try {
        const body = req.body;
        const newPeriferico = await pool.query(
            `INSERT INTO periferico(marca, modelo, url, tipo_id) VALUES ('${body.marca}', '${body.modelo}', '${body.url}', ${body.tipo_id})`
        )
        res.status(200).json(newPeriferico.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Algo salio mal :(');
    }
})

/*
    Update periferico
 */
app.put('/api/v1/periferico/:id', async (req, res) => {
    try {
        const body = req.body;
        const perifericoId = req.params.id;
        const updateTorneo = await pool.query(
            `UPDATE periferico SET marca ='${body.marca}', modelo = '${body.modelo}', url = ${body.url}, tipo_id = ${body.tipo_id} WHERE id = ${perifericoId}`
        )
        res.status(200).json(updateTorneo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Algo salio mal :(');
    }
})

/*
    Get all perifericos
 */
app.get('/api/v1/periferico', async (req, res) => {
   try {
      const allPerifericos = await pool.query(
            `SELECT * from periferico ORDER BY marca`
      );
      res.status(200).json(allPerifericos.rows);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Algo salio mal :(');
   }
})

/*
    Get one periferico by ID
 */
app.get('/api/v1/periferico/:id', async (req, res) => {
   try {
      const perifericoId = req.params.id;

      const periferico = await pool.query(
            `SELECT * from periferico WHERE id = ${perifericoId}`
      );
      res.status(200).json(periferico.rows[0]);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Algo salio mal :(');
   }
})

app.listen(3001, () => {
    console.log("Server started on port 3001");
});
