import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import styles from "./TableHeader.module.css";

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
            <div className={`${styles.container} container rounded`}>
                <Row>
                    <Col>
                        <img src={this.state.foto} alt={""} className={styles.foto}/>
                        <span className={styles.titulo}>{this.state.titulo}</span>
                    </Col>
                    <Col align="right">
                        <div>
                            <span className={styles.update}>Ultima actualizacion:</span>
                        </div>
                        <div>
                            <span className={styles.update}>{this.state.update}</span>
                        </div>
                        <div>
                            <Link to={`../borrar/${this.state.identificador}`}>
                                <button className={`${styles.boton} ${styles.Actualizar}`}>Actualizar</button>
                            </Link>
                            <Link to={`../borrar/${this.state.identificador}`}>
                                <button className={`${styles.boton} ${styles.Borrar}`}>Borrar</button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TableHeader;