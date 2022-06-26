import React, {useEffect, useState} from "react";
import styles from "./Usuario.module.css";
import {fetchUsers} from "../../Api";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import Usuarios from "./Usuarios";
import Pagination from "../../components/Pagination/Pagination";
import {CircularProgress} from "@mui/material";

const UserList = () => {
    const [datos, setDatos] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchUsers().then(d => setDatos(d));
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
                    <Usuarios datos={currentItems}/>
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

export default UserList;