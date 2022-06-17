import React from "react";
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import "./Usuario.css";

const Usuarios = ({datos}) => {

    return (
        <>
        {datos.map(data => (
            <div className="listaUsuarios" key={data.id}>
                <Row>
                    <Col xs={1} className="text-center"><span className="textoTabla">{data.id}</span></Col>
                    <Col xs={1} className="text-center">
                        <img src={data.avatar_url} alt="avatar" className="avatarUsuario"/>
                    </Col>
                    <Col xs={2} className="text-center"><span className="tituloTabla">{data.username}</span></Col>
                    <Col xs={1} className="text-center"><span className="textoTabla">{data.country_rank}</span></Col>
                    <Col xs={1} className="text-center"><span className="textoTabla">{data.global_rank}</span></Col>
                    <Col xs={1} className="text-center"><span className="textoTabla">{data.pp}</span></Col>
                    <Col xs={1} className="text-center"><span className="textoTabla">{data.playcount}</span></Col>
                    <Col xs={1} className="text-center"><span className="textoTabla">{data.country}</span></Col>
                    <Col xs={1} className="text-center"><span className="textoTabla">{data.region}</span></Col>
                    <Col xs={1} className="text-center">
                        <Link to={`${data.id}`}>
                            <button className="botonEditar">Editar</button>
                        </Link>
                    </Col>
                    <Col xs={1} className="text-center">
                        <button className="botonBorrar">Borrar</button>
                    </Col>
                </Row>
            </div>
        ))}
        </>
    )
}

export default Usuarios;