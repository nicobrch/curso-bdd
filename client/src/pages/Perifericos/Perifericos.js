import React from "react";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import styles from "./Periferico.module.css";
import {deleteUser} from "../../Api";

const Perifericos = ({datos}) => {

    const deleteUsuario = async (id) => {
        try {
            await deleteUser(id);
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
                    <Col xs={1} className="text-center">
                        <img src={data.avatar_url} alt="avatar" className={styles.avatar}/>
                    </Col>
                    <Col xs={2} className="text-center"><span className={styles.tituloTabla}>{data.username}</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.textoTabla}>{data.country_rank}</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.textoTabla}>{data.global_rank}</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.textoTabla}>{data.pp}</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.textoTabla}>{data.playcount}</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.textoTabla}>{data.country}</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.textoTabla}>{data.region}</span></Col>
                    <Col xs={1} className="text-center">
                        <Link to={`${data.id}`}>
                            <button className={`${styles.boton} ${styles.Editar}`}>Editar</button>
                        </Link>
                    </Col>
                    <Col xs={1} className="text-center">
                        <button className={`${styles.boton} ${styles.Borrar}`} onClick={() => deleteUsuario(data.id)}>Borrar</button>
                    </Col>
                </Row>
            </div>
        ))}
        </>
    )
}

export default Perifericos;