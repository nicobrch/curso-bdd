import React from "react";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import styles from "./Periferico.module.css";
import {deletePeriferico} from "../../Api";

const Perifericos = ({datos}) => {

    const borrarPeriferico = async (id) => {
        try {
            await deletePeriferico(id);
        } catch(e) {
            console.log(e.message);
        }
    }

    return (
        <>
        {datos.map(data => (
            <div className={styles.item} key={data.id}>
                <Row>
                    <Col xs={1} className="text-center"><span className={styles.textoTabla}>{data.id}</span></Col>
                    <Col xs={3} className="text-center"><span className={styles.tituloTabla}>{data.marca}</span></Col>
                    <Col xs={4} className="text-center"><span className={styles.textoTabla}>{data.modelo}</span></Col>
                    <Col xs={2} className="text-center"><span className={styles.textoTabla}>{data.tipo}</span></Col>
                    <Col xs={1} className="text-center">
                        <Link to={`${data.id}`}>
                            <button className={`${styles.boton} ${styles.Editar}`}>Editar</button>
                        </Link>
                    </Col>
                    <Col xs={1} className="text-center">
                        <button className={`${styles.boton} ${styles.Borrar}`} onClick={() => borrarPeriferico(data.id)}>Borrar</button>
                    </Col>
                </Row>
            </div>
        ))}
        </>
    )
}

export default Perifericos;