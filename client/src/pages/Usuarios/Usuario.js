import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import "./Usuario.css";
import {Row, Col} from "react-bootstrap";
import {fetchUser} from "../../Api";
import {DeleteOutline} from "@mui/icons-material";

const Usuario = () => {
    const {id} = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchUser(id).then(d => setData(d));
    },);

    if (data === null){
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
                        <img src={data.avatar_url} alt={""} className={"usuarioAvatar"}/>
                        <span className="usuarioTitulo">{data.username}</span>
                    </Col>
                    <Col align="right">
                        <div>
                            <span className="usuarioUpdate">Ultima actualizacion:</span>
                        </div>
                        <div>
                            <span className="usuarioUpdate">{data.updated_at}</span>
                        </div>
                        <div>
                            <Link to={`${data.id}`}>
                                <button className="usuarioBotonBorrar">Borrar</button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="container rounded">
            </div>
            <div className="container rounded">

            </div>
        </div>
    );
}

export default Usuario;