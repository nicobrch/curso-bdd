import React, {useEffect, useState} from "react";
import styles from "./Torneo.module.css";
import {fetchTorneos} from "../../Api";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import Torneos from "./Torneos";
import Pagination from "../../components/Pagination/Pagination";
import {CircularProgress} from "@mui/material";
import { Toaster } from "react-hot-toast";

const TorneoList = () => {
    const [datos, setDatos] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(8);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchTorneos().then(d => setDatos(d));
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
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className={`${styles.container} container rounded`}>
                <Row>
                    <Col>
                        <h1 className={styles.titulo}>Torneos</h1>
                    </Col>
                    <Col align="right">
                        <Link to="../insert/torneo">
                            <button className={styles.insertar}>Insertar Nuevo Torneo</button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={1} className="text-center"><span className={styles.tituloTabla}>ID</span></Col>
                    <Col xs={3} className="text-center"><span className={styles.tituloTabla}>Nombre</span></Col>
                    <Col xs={2} className="text-center"><span className={styles.tituloTabla}>Rank</span></Col>
                    <Col xs={2} className="text-center"><span className={styles.tituloTabla}>Prize</span></Col>
                    <Col xs={2} className="text-center"><span className={styles.tituloTabla}>Formato</span></Col>
                    <Col xs={2} className="text-center"><span className={styles.tituloTabla}>Accion</span></Col>
                </Row>
                    <Torneos datos={currentItems}/>
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

export default TorneoList;