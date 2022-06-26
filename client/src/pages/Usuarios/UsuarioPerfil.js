import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import styles from "./Usuario.module.css";
import {fetchUser,  fetchUserPerifericos, fetchUserBadges, fetchUserTorneos} from "../../Api";
import TableHeader from "../../components/TableHeader/TableHeader";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import {CircularProgress} from "@mui/material";
import {Row} from "react-bootstrap";

const axios = require('axios').default;

const Usuario = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [periferico, setPeriferico] = useState(null);
    const [badge, setBadges] = useState(null);
    const [torneo, setTorneos] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        axios.all([fetchUser(id), fetchUserPerifericos(id), fetchUserBadges(id), fetchUserTorneos(id)]).then(
            axios.spread((...allData) => {
                const userData = allData[0].data;
                const perifericoData = allData[1].data;
                const badgeData = allData[2].data;
                const torneoData = allData[3].data;
                setData(userData);
                setPeriferico(perifericoData);
                setBadges(badgeData);
                setTorneos(torneoData);
            })
        )
    }

    useEffect(() => {
        setLoading(true);
        getData();
        setTimeout(() => {
            setLoading(false);
        }, 250)
    }, []);

    if (loading === true){
        return (
            <div className={styles.fondo}>
                <div className="container justify-content-center align-content-center">
                    <CircularProgress/>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.fondo}>
            <TableHeader
            identificador={data.id}
            foto={data.avatar_url}
            titulo={data.username}
            update={data['updated_at']}
            />
            <div className={`${styles.container} container rounded`}>
                <p className={styles.tituloTabla}>Badges: {badge.length}</p>
                {badge.map(bdg => (
                    <span className={styles.badge}>
                        <img src={bdg['image_url']} alt={'badge'}/>
                    </span>
                ))}
            </div>
            <div className={`${styles.container} container rounded`}>
                <Row>
                    {periferico.map(prf => (
                        <FeaturedInfo
                            identificador={prf['id']}
                            tipo={prf['tipo']}
                            icon={prf['tipo']}
                            marca={prf.marca}
                            modelo={prf.modelo}
                            config = {prf['tipo'] === 'Teclado' ? prf.config.switch :
                                prf['tipo'] === 'Mouse' ? [prf.config['polling'], prf.config['dpi']] :
                                    prf['tipo'] === 'Tablet' ? prf.config['area'] :
                                        prf['tipo'] === 'Monitor' ? [prf.config['herzios'], prf.config['resolucion']] : null}
                        />
                    ))}
                </Row>
            </div>
            <div className={`${styles.container} container rounded`}>
                <p className={styles.tituloTabla}>Torneos Participados: {torneo.length}</p>
                {torneo.map(trn => (
                    <li className={styles.textoTabla}>
                        {trn['estado']} - {trn['nombre']}
                    </li>
                ))}
            </div>
        </div>
    );
}

export default Usuario;