import React, {useEffect, useState} from "react";
import "./Usuario.css";
import {fetchUsers} from "../../Api";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import Usuarios from "./Usuarios";
import Pagination from "../../components/Pagination/Pagination";

const UserList = () => {
    const [datos, setDatos] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);

    useEffect(() => {
        fetchUsers().then(d => setDatos(d));
    }, []);

    if (datos === null){
        return (
            <div className="usuario">
                <div className="container rounded">
                    <h1 className="tituloLista">Cargando...</h1>
                </div>
            </div>
        )
    }

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="usuario">
            <div className="container rounded">
                <Row>
                    <Col>
                        <h1 className="tituloLista">Usuarios</h1>
                    </Col>
                    <Col align="right">
                        <Link to="../admin/usuario">
                            <button className="botonInsertar">Insertar Nuevo Usuario</button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={1} className="text-center"><span className="tituloTabla">ID</span></Col>
                    <Col xs={3} className="text-center"><span className="tituloTabla">Usuario</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Nacional</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Global</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">PP</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Playcount</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Pais</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Region</span></Col>
                    <Col xs={2} className="text-center"><span className="tituloTabla">Accion</span></Col>
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