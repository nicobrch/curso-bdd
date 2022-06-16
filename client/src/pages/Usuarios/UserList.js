import React, {useEffect, useState} from "react";
import "./Usuario.css";
import {fetchUsers} from "../../Api";
import { DeleteOutline } from "@mui/icons-material"
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";

const UserList = () => {

    const [datos, setDatos] = useState(null);
    useEffect(() => {
        fetchUsers().then(d => setDatos(d));
    }, []);

    if (datos === null){
        return (
            <div className="lista">
                <div className="container rounded">
                    <h1 className="titulo">Cargando...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="lista">
            <div className="container rounded">
                <Row>
                    <Col>
                        <h1 className="titulo">Usuarios</h1>
                    </Col>
                    <Col align="right">
                        <Link to="../admin/usuario">
                            <button className="botonInsertar">Insertar Nuevo Usuario</button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <table className="table table-responsive">
                        <thead>
                        <tr>
                            <th className="titulo" style={{width: '1%'}}>Id</th>
                            <th className="titulo" style={{width: '1%'}}>Avatar</th>
                            <th className="titulo" style={{width: '8%'}}>Username</th>
                            <th className="titulo" style={{width: '1%'}}>PP</th>
                            <th className="titulo" style={{width: '2%'}}>Global Rank</th>
                            <th className="titulo" style={{width: '2%'}}>Country Rank</th>
                            <th className="titulo" style={{width: '2%'}}>Playcount</th>
                            <th className="titulo" style={{width: '2%'}}>Playtime</th>
                            <th className="titulo" style={{width: '2%'}}>Region</th>
                            <th className="titulo" style={{width: '2%'}}>Pais</th>
                            <th className="titulo" style={{width: '12%'}}>Creado</th>
                            <th className="titulo" style={{width: '12%'}}>Actualizado</th>
                            <th className="titulo" style={{width: '1%'}}>Editar</th>
                            <th className="titulo" style={{width: '1%'}}>Borrar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {datos.map(data => (
                            <tr key={data.id}>
                                <td className="texto">{data.id}</td>
                                <td>
                                    <img src={data.avatar_url} alt="avatar" className="avatar"/>
                                </td>
                                <td className="texto">{data.username}</td>
                                <td className="texto">{data.pp}</td>
                                <td className="texto">{data.global_rank}</td>
                                <td className="texto">{data.country_rank}</td>
                                <td className="texto">{data.playcount}</td>
                                <td className="texto">{data.play_time}</td>
                                <td className="texto">{data.region}</td>
                                <td className="texto">{data.country}</td>
                                <td className="texto">{data.created_at}</td>
                                <td className="texto">{data.updated_at}</td>
                                <td>
                                    <Link to={`${data.id}`}>
                                        <button className="botonEditar">Editar</button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`${data.id}?state=edit`}>
                                        <DeleteOutline className="botonBorrar"/>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Row>
            </div>
        </div>
    );
}

export default UserList;