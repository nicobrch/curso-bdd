import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./TableHeader.css";

class TableHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            identificador : this.props.identificador,
            foto : this.props.foto,
            titulo : this.props.titulo,
            update : this.props.update
        }
    }

    render(){
        return (
            <div className="container rounded">
                <Row>
                    <Col>
                        <img src={this.state.foto} alt={""} className={"foto"}/>
                        <span className="titulo">{this.state.titulo}</span>
                    </Col>
                    <Col align="right">
                        <div>
                            <span className="update">Ultima actualizacion:</span>
                        </div>
                        <div>
                            <span className="update">{this.state.update}</span>
                        </div>
                        <div>
                            <Link to={`../borrar/${this.state.identificador}`}>
                                <button className="boton Actualizar">Actualizar</button>
                            </Link>
                            <Link to={`../borrar/${this.state.identificador}`}>
                                <button className="boton Borrar">Borrar</button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TableHeader;