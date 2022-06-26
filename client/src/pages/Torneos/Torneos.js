import React from "react";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import styles from "./Torneo.module.css";
import {deleteTorneo} from "../../Api";
import toast from "react-hot-toast";

const Torneos = ({datos}) => {

    const borrarTorneo = async (id) => {
        try {
            await deleteTorneo(id);
            toast.success('Torneo borrado! Reinicia la página',
                {
                    style : {
                        color: 'white',
                        background: '#D85151',
                    }
                });
        } catch(e) {
            console.log(e.message);
        }
    }

    return (
        <>
        {datos.map(data => (
            <div className={styles.item} key={data.id}>
                <Row>
                    <Col xs={1} className="text-center"><span className={styles.textoTabla}>{data['id']}</span></Col>
                    <Col xs={3} className="text-center"><span className={styles.textoTabla}>{data['nombre']}</span></Col>
                    <Col xs={2} className="text-center"><span className={styles.textoTabla}>{data['rank_range']}</span></Col>
                    <Col xs={2} className="text-center"><span className={styles.textoTabla}>{data['prizepool']}</span></Col>
                    <Col xs={2} className="text-center"><span className={styles.textoTabla}>{data['formato']}</span></Col>
                    <Col xs={1} className="text-center">
                        <Link to={`${data.id}`}>
                            <button className={`${styles.boton} ${styles.Editar}`}>Editar</button>
                        </Link>
                    </Col>
                    <Col xs={1} className="text-center">
                        <button className={`${styles.boton} ${styles.Borrar}`} onClick={() => borrarTorneo(data.id)}>Borrar</button>
                    </Col>
                </Row>
            </div>
        ))}
        </>
    )
}

export default Torneos;