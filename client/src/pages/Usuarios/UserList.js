import React, {useEffect, useState} from "react";
import "./Usuario.css";
import {fetchUsers} from "../../Api";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";

const UserList = () => {

    const [datos, setDatos] = useState(null);
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
                <hr></hr>
                <Row>
                    <Col xs={1} className="text-center"><span className="tituloTabla">ID</span></Col>
                    <Col xs={3} className="text-center"><span className="tituloTabla">Usuario</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Nacional</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Global</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">PP</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Pais</span></Col>
                    <Col xs={2} className="text-center"><span className="tituloTabla">Creado</span></Col>
                    <Col xs={2} className="text-center"><span className="tituloTabla">Accion</span></Col>
                </Row>
                {datos.map(data => (
                    <div className="lista" key={data.id}>
                        <Row>
                            <Col xs={1} className="text-center"><span className="textoTabla">{data.id}</span></Col>
                            <Col xs={1} className="text-center">
                                <img src={data.avatar_url} alt="avatar" className="avatar"/>
                            </Col>
                            <Col xs={2} className="text-center"><span className="tituloTabla">{data.username}</span></Col>
                            <Col xs={1} className="text-center"><span className="textoTabla">{data.country_rank}</span></Col>
                            <Col xs={1} className="text-center"><span className="textoTabla">{data.global_rank}</span></Col>
                            <Col xs={1} className="text-center"><span className="textoTabla">{data.pp}</span></Col>
                            <Col xs={1} className="text-center"><span className="textoTabla">{data.country}</span></Col>
                            <Col xs={2} className="text-center"><span className="textoTabla">{data.created_at}</span></Col>
                            <Col xs={1} className="text-center">
                                <Link to={`${data.id}`}>
                                    <button className="botonEditar">Editar</button>
                                </Link>
                            </Col>
                            <Col xs={1} className="text-center">
                                <Link to={`${data.id}`}>
                                    <button className="botonBorrar">Borrar</button>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;