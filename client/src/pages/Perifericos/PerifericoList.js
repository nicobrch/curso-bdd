import React, {useEffect, useState} from "react";
import "./Perifericos.css";
import {fetchPerifericos} from "../../Api";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";

const PerifericoList = () => {

    const [datos, setDatos] = useState(null);
    useEffect(() => {
        fetchPerifericos().then(d => setDatos(d));
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
                        <h1 className="tituloLista">Perifericos</h1>
                    </Col>
                    <Col align="right">
                        <Link to="../admin/usuario">
                            <button className="botonInsertar">Insertar Nuevo Periferico</button>
                        </Link>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col xs={1} className="text-center"><span className="tituloTabla">ID</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Foto</span></Col>
                    <Col xs={2} className="text-center"><span className="tituloTabla">Marca</span></Col>
                    <Col xs={4} className="text-center"><span className="tituloTabla">Modelo</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Tipo</span></Col>
                    <Col xs={1} className="text-center"><span className="tituloTabla">Url</span></Col>
                    <Col xs={2} className="text-center"><span className="tituloTabla">Accion</span></Col>
                </Row>
                {datos.map(data => (
                    <div className="lista" key={data.id}>
                        <Row>
                            <Col xs={1} className="text-center"><span className="textoTabla">{data.id}</span></Col>
                            <Col xs={1} className="text-center">
                                <img src={data.id} alt="avatar" className="avatar"/>
                            </Col>
                            <Col xs={2} className="text-center"><span className="tituloTabla">{data.marca}</span></Col>
                            <Col xs={4} className="text-center"><span className="textoTabla">{data.modelo}</span></Col>
                            <Col xs={1} className="text-center"><span className="textoTabla">{data.tipo}</span></Col>
                            <Col xs={1} className="text-center"><span className="textoTabla">{data.url}</span></Col>
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

export default PerifericoList;