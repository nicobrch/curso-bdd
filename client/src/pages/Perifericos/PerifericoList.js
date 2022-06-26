import React, {useEffect, useState} from "react";
import styles from "./Periferico.module.css";
import {fetchUsers} from "../../Api";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import Perifericos from "./Perifericos";
import Pagination from "../../components/Pagination/Pagination";

const PerifericoList = () => {
    const [datos, setDatos] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);

    useEffect(() => {
        fetchUsers().then(d => setDatos(d));
    }, []);

    if (datos === null){
        return (
            <div className={styles.fondo}>
                <div className="container rounded">
                    <h1 className={styles.titulo}>Cargando...</h1>
                </div>
            </div>
        )
    }

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className={styles.fondo}>
            <div className={`${styles.container} container rounded`}>
                <Row>
                    <Col>
                        <h1 className={styles.titulo}>Usuarios</h1>
                    </Col>
                    <Col align="right">
                        <Link to="../insert/usuario">
                            <button className={styles.insertar}>Insertar Nuevo Usuario</button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={1} className="text-center"><span className={styles.tituloTabla}>ID</span></Col>
                    <Col xs={3} className="text-center"><span className={styles.tituloTabla}>Usuario</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.tituloTabla}>Nacional</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.tituloTabla}>Global</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.tituloTabla}>PP</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.tituloTabla}>Playcount</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.tituloTabla}>Pais</span></Col>
                    <Col xs={1} className="text-center"><span className={styles.tituloTabla}>Region</span></Col>
                    <Col xs={2} className="text-center"><span className={styles.tituloTabla}>Accion</span></Col>
                </Row>
                    <Perifericos datos={currentItems}/>
                <Row>
                <Pagination 
                itemsPerPage={itemPerPage}
                totalItems={datos.length}
                paginate={paginate}
                />
                </Row>
            </div>
        </div>
    );
}

export default PerifericoList;