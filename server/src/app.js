const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");
const axios = require("axios").default;
const osu = require("./osu");
const ftr = require("./features");
app.use(cors());
app.use(express.json());

// Oauth redirect
app.get("/oauth", (req, res) => {
    res.redirect(
        `https://osu.ppy.sh/oauth/authorize?client_id=${process.env.API_CLIENT_ID}&redirect_uri=http://localhost:5000/oauth-callback/&response_type=code`
    )
});

// Oauth callback
app.get("/oauth-callback", ({query : {code}}, res) => {
    osu.getMeToken(code)
        .then((token) => {
            osu.getUserMe(token)
                .then((_res) => {
                    let data = ftr.parseUserJson(_res.data);
                    axios.post("http://localhost:5000/api/v1/usuario", data)
                        .catch(err => console.error(err.message));
                }).catch(err => console.error(err.message));
            res.redirect("/");
        }).catch(err => console.error(err.message));
})

// Torneos

// Obtener todos los usuarios
app.get("/api/v1/usuario", async (req, res) => {
    try {
        const usuarios = await pool.query(
            `SELECT * FROM usuario ORDER BY global_rank`
        );
        res.status(200).json(usuarios.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

// Obtener un usuario mediante su ID
app.get("/api/v1/usuario/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const usuario = await pool.query(
            `SELECT * FROM usuario WHERE id = ${id}`
        );
        res.status(200).json(usuario.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

// Insertar un usuario mediante la ID
app.post("/admin/usuario", async (req, res) => {
    let {id} = req.body;
    osu.getToken()
        .then((token) => {
            osu.getUserData(token, id)
                .then((_res) => {
                    let data = ftr.parseUserJson(_res.data);
                    axios.post("http://localhost:5000/api/v1/usuario", data)
                        .catch(err => console.error(err.message));
                }).catch(err => console.error(err.message));
            res.redirect("/");
        }).catch(err => console.error(err.message));
})

// Insertar Usuario
app.post("/api/v1/usuario", async (req, res) => {
    try {
        const body = req.body;
        // Insertar usuario con datos de la API
        await pool.query(
            `INSERT INTO usuario(id, username, pp, global_rank, country_rank, playcount, play_time, avatar_url, created_at, updated_at, country) VALUES(${body.id}, '${body.username}', ${body.pp}, ${body.global_rank}, ${body.country_rank}, ${body.playcount}, ${body.play_time}, '${body.avatar_url}', current_timestamp, current_timestamp, '${body.country}') ON CONFLICT DO NOTHING`
        );

        let badges = ftr.filterBadges(body.badges);

        // Insertar medallas en caso que el usuario tenga
        if (badges.length !== 0){
            // Hacemos un GET para obtener la cantidad de medallas registradas hasta el momento
            let currentBadges;
            await axios.get("http://localhost:5000/api/v1/badge")
                .then((_res) => {
                    currentBadges = _res.data;
                })
            let currentTorneos;
            await axios.get("http://localhost:5000/api/v1/torneo")
                .then((_res) => {
                    currentTorneos = _res.data;
                })

            for (let i=0; i<badges.length; i++){
                let skip = false;

                // Omitir badges que ya existen en la tabla badges
                for (let j=0; j<currentBadges.length; j++){
                    if (badges[i].description === currentBadges[j]['descripcion']){
                        skip = true;
                        break;
                    }
                }
                if (skip === true){
                    continue;
                }

                // Parseamos la medalla nueva en caso que tenga apostrofes '
                const descripcion = ftr.parseBadge(badges[i].description);

                // Insertamos la medalla en la tabla BADGES
                try {
                    await pool.query(
                        `INSERT INTO badge(descripcion, image_url) VALUES ('${descripcion}', '${badges[i]['image_url']}')`
                    );
                } catch (err) {
                    console.error(err.message);
                }

                // Omitir torneos que ya existen en la tabla torneos
                for (let k=0; k<currentTorneos.length; k++){
                    if (badges[i].description === currentTorneos[k]['nombre']){
                        skip = true;
                        break;
                    }
                }
                if (skip === true){
                    continue;
                }

                // Insertamos un torneo mediante el nombre de la badge
                try {
                    await pool.query(
                        `INSERT INTO torneo(nombre, badge_id) VALUES ('${descripcion}', (SELECT id FROM badge b WHERE '${descripcion}' = b.descripcion))`
                    );
                } catch (err) {
                    console.error(err.message);
                }
            }

            for (let j=0; j<badges.length; j++){
                const descripcion = ftr.parseBadge(badges[j].description);
                // Asignamos cada medalla del usuario con las medallas existentes de badges usando la tabla usuario_badge
                try {
                    await pool.query(
                        `INSERT INTO usuario_badge(user_id, badge_id) VALUES (${body.id}, (SELECT id FROM badge WHERE image_url = '${badges[j]['image_url']}'))`
                    );
                } catch (err) {
                    console.error(err.message);
                }
                // Asignamos al usuario los torneos correspondiente a sus medallas
                try {
                    await pool.query(
                        `INSERT INTO usuario_torneo(user_id, torneo_id, estado) VALUES (${body.id}, (SELECT id FROM torneo WHERE nombre = '${descripcion}'), 'Ganado')`
                    );
                } catch (err) {
                    console.error(err.message);
                }
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

app.post("/admin/update/usuario", async (req, res) => {
    const {id} = req.body;
    const {region} = req.body;
    osu.getToken()
        .then((token) => {
            osu.getUserData(token, id)
                .then((_res) => {
                    let data = ftr.parseUserJson(_res.data);
                    axios.put("http://localhost:5000/admin/usuario", {id: id, region: region, api: data})
                        .catch(err => console.error(err.message));
                }).catch(err => console.error(err.message));
            res.redirect("/");
        }).catch(err => console.error(err.message));
})

app.delete("/admin/usuario/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query(
            `DELETE FROM usuario WHERE id = ${id}`
        );
        res.json("Borrado!");
    } catch (e){
        console.log(e.message);
    }
})

// Actualizar Usuario
app.put("/admin/usuario", async (req, res) => {
    try {
        const {id} = req.body;
        const {region} = req.body;
        let {api} = req.body;

        console.log(region);

        if (region !== undefined){
            await pool.query(
                `UPDATE usuario SET username = '${api.username}', pp = ${api.pp}, global_rank = ${api.global_rank}, country_rank = ${api.country_rank}, playcount = ${api.playcount}, play_time = ${api.play_time}, avatar_url = '${api.avatar_url}', country = '${api.country}', region = '${region}', updated_at = current_timestamp WHERE id = ${id}`
            )
        } else {
            await pool.query(
                `UPDATE usuario SET username = '${api.username}', pp = ${api.pp}, global_rank = ${api.global_rank}, country_rank = ${api.country_rank}, playcount = ${api.playcount}, play_time = ${api.play_time}, avatar_url = '${api.avatar_url}', country = '${api.country}', updated_at = current_timestamp WHERE id = ${id}`
            )
        }
        let badges = ftr.filterBadges(api.badges);

        if (badges.length !== 0){
            let userBadges;
            await axios.get("http://localhost:5000/api/v1/usuariobadges/" + id)
                .then((_res) => {
                    userBadges = _res.data;
            })
            let currentTorneos;
            await axios.get("http://localhost:5000/api/v1/torneo")
                .then((_res) => {
                    currentTorneos = _res.data;
            })
            if (badges.length <= userBadges.length){
                return;
            }
            for(let i=0; i<badges.length; i++){
                let skip = false;

                // Omitir badges que ya existen en la tabla badges
                for (let j=0; j<userBadges.length; j++){
                    if (badges[i].description === userBadges[j]['descripcion']){
                        skip = true;
                        break;
                    }
                }
                if (skip === true){
                    continue;
                }

                // Parseamos la medalla nueva en caso que tenga apostrofes '
                const descripcion = ftr.parseBadge(badges[i].description);

                // Insertamos la medalla en la tabla BADGES
                try {
                    await pool.query(
                        `INSERT INTO badge(descripcion, image_url) VALUES ('${descripcion}', '${badges[i]['image_url']}')`
                    );
                } catch (err) {
                    console.error(err.message);
                }

                // Omitir torneos que ya existen en la tabla torneos
                for (let k=0; k<currentTorneos.length; k++){
                    if (badges[i].description === currentTorneos[k]['nombre']){
                        skip = true;
                        break;
                    }
                }
                if (skip === true){
                    continue;
                }

                // Insertamos un torneo mediante el nombre de la badge
                try {
                    await pool.query(
                        `INSERT INTO torneo(nombre, badge_id) VALUES ('${descripcion}', (SELECT id FROM badge b WHERE '${descripcion}' = b.descripcion))`
                    );
                } catch (err) {
                    console.error(err.message);
                }
            }
            for (let j=0; j<badges.length; j++){
                const descripcion = ftr.parseBadge(badges[j].description);
                // Asignamos cada medalla del usuario con las medallas existentes de badges usando la tabla usuario_badge
                try {
                    await pool.query(
                        `INSERT INTO usuario_badge(user_id, badge_id) VALUES (${body.id}, (SELECT id FROM badge WHERE image_url = '${badges[j]['image_url']}'))`
                    );
                } catch (err) {
                    console.error(err.message);
                }
                // Asignamos al usuario los torneos correspondiente a sus medallas
                try {
                    await pool.query(
                        `INSERT INTO usuario_torneo(user_id, torneo_id, estado) VALUES (${body.id}, (SELECT id FROM torneo WHERE nombre = '${descripcion}'), 'Ganado')`
                    );
                } catch (err) {
                    console.error(err.message);
                }
            }
        }
    } catch (err){
        console.error(err.message);
        res.status(500).send("Na q hacerle papito algo salio mal");
    }
})

//Periferico

// Obtener todos los perifericos
app.get("/api/v1/periferico", async (req, res) => {
    try {
        const periferico = await pool.query(
            `SELECT p.id, p.marca, p.modelo, tp.tipo FROM periferico p JOIN tipo_periferico tp on p.tipo_id = tp.id order by marca`
        );
        res.status(200).json(periferico.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

app.get("/api/v1/periferico/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const periferico = await pool.query(
            `SELECT p.id, p.marca, p.modelo, tp.tipo FROM periferico p JOIN tipo_periferico tp on p.tipo_id = tp.id and p.id = ${id}`
        );
        res.status(200).json(periferico.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

// Obtener los perifericos de un usuario y sus configuraciones
app.get("/api/v1/usuarioperifericos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const torneos = await pool.query(
            `SELECT p.id, p.marca, p.modelo, p.url, tp.tipo, up.config FROM periferico p JOIN tipo_periferico tp ON p.tipo_id = tp.id JOIN usuario_periferico up ON p.id = up.periferico_id JOIN usuario u ON up.user_id = u.id AND u.id = ${id}`
        );
        res.status(200).json(torneos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

app.post("/admin/periferico", async (req, res) => {
    const {marca} = req.body;
    const {modelo} = req.body;
    const {tipo} = req.body;

    try {
        await pool.query(
            `INSERT INTO periferico(marca, modelo, tipo_id) VALUES ('${marca}', '${modelo}', (SELECT id FROM tipo_periferico WHERE tipo = '${tipo}'))`
        )
        res.json("Periferico insertado!");
    } catch (e){
        console.log(e.message);
    }
})

app.put("/admin/periferico/:id", async (req, res) => {
    const {id} = req.params;
    const {marca} = req.body;
    const {modelo} = req.body;
    const {tipo} = req.body;
    console.log("Holaaa");

    try {
        await pool.query(
            `UPDATE periferico SET marca = '${marca}', modelo = '${modelo}', tipo_id = (SELECT id FROM tipo_periferico WHERE tipo = '${tipo}') WHERE id = ${id}`
        )
        res.json("Periferico actualizado!");
    } catch (e){
        console.log(e.message);
    }
})

app.delete("/admin/periferico/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query(
            `DELETE FROM periferico WHERE id = ${id}`
        );
        res.json("Borrado!");
    } catch (e){
        console.log(e.message);
    }
})

// Badges

// Obtener todas las badges
app.get("/api/v1/badge", async (req, res) => {
    try {
        const badges = await pool.query(
            `SELECT * FROM badge`
        );
        res.status(200).json(badges.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

// Obtener las badges de un usuario
app.get("/api/v1/usuariobadges/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const badges = await pool.query(
            `SELECT b.id, b.descripcion, b.image_url FROM badge b JOIN usuario_badge ub ON ub.badge_id = b.id JOIN usuario u ON ub.user_id = u.id AND u.id = ${id}`
        );
        res.status(200).json(badges.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

//Torneos

// Obtener todos los torneos
app.get("/api/v1/torneo", async (req, res) => {
    try {
        const torneos = await pool.query(
            `SELECT * FROM torneo order by nombre`
        );
        res.status(200).json(torneos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

app.get("/api/v1/torneo/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const torneos = await pool.query(
            `SELECT * FROM torneo WHERE id = ${id}`
        );
        res.status(200).json(torneos.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

// Obtener los torneos de un usuario
app.get("/api/v1/usuariotorneos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const torneos = await pool.query(
            `SELECT t.id, t.nombre, t.rank_range, t.badge_id, t.prizepool, ut.estado FROM torneo t JOIN usuario_torneo ut ON t.id = ut.torneo_id JOIN usuario u ON u.id = ut.user_id AND u.id = ${id}`
        );
        res.status(200).json(torneos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

app.post("/admin/torneo", async (req, res) => {
    const {nombre} = req.body;
    const {rank} = req.body;
    const {prize} = req.body;
    const {formato} = req.body;

    try {
        await pool.query(
            `INSERT INTO torneo(nombre, rank_range, prizepool, formato) VALUES ('${nombre}', '${rank}', '${prize}', '${formato}')`
        )
        res.json("Torneo insertado!");
    } catch (e){
        console.log(e.message);
    }
})

app.put("/admin/torneo/:id", async (req, res) => {
    const {id} = req.params;
    const {nombre} = req.body;
    const {rank} = req.body;
    const {prize} = req.body;
    const {formato} = req.body;

    try {
        await pool.query(
            `UPDATE torneo SET nombre = '${nombre}', rank_range = '${rank}', prizepool = '${prize}', formato = '${formato}' WHERE id = ${id}`
        )
        res.json("Torneo actualizado!");
    } catch (e){
        console.log(e.message);
    }
})

app.delete("/admin/torneo/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query(
            `DELETE FROM torneo WHERE id = ${id}`
        );
        res.json("Borrado!");
    } catch (e){
        console.log(e.message);
    }
})

app.listen(5000, () => {
    console.log("Server has started on port 5000");
})