import {Component} from "react";
import {Mouse, Keyboard, BorderColor, Monitor} from "@mui/icons-material"
import styles from "./FeaturedInfo.module.css";
import {Col, Card, Button, Row} from "react-bootstrap";
import {Icon} from "@mui/material";

class FeaturedInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tipo : this.props.tipo,
            icon : this.props.icon,
            marca : this.props.marca,
            modelo : this.props.modelo,
            config : this.props.config
        }
        switch (this.state.icon){
            case 'Mouse':
                this.state.icon = <Mouse/>;
                break;
            case 'Teclado':
                this.state.icon = <Keyboard/>;
                break;
            case 'Tablet':
                this.state.icon = <BorderColor/>;
                break;
            case 'Monitor':
                this.state.icon = <Monitor/>
                break;
            default:
                break;
        }
    }

    handleConfig = (event) => {
        event.preventDefault();
        switch (this.state.tipo){
            case 'Mouse':
                alert(`Polling Rate: ${this.state.config[0]}\nDPI: ${this.state.config[1]}`)
                break;
            case 'Teclado':
                alert(`Switch: ${this.state.config}`)
                break;
            case 'Tablet':
                alert(`Area: ${this.state.config}`)
                break;
            case 'Monitor':
                alert(`Herzios: ${this.state.config[0]}\nResolucion: ${this.state.config[1]}`)
                break;
            default:
                break;
        }
    }

    render(){

        return (
            <Col>
                <Card className={styles.contenedor}>
                    <Card.Body>
                        <Row>
                            <Col xs={8}>
                            <Card.Title className={styles.titulo}>{this.state.marca}</Card.Title>
                                <Card.Text className={styles.modelo}>
                                    {this.state.modelo}
                                </Card.Text>
                            </Col>
                            <Col xs={4}>
                                <div className={styles.icon}>
                                    {this.state.icon}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" id={this.state.tipo} onClick={this.handleConfig}>Config</Button>
                            </Col>
                            <Col>
                                <Button variant="warning">Editar</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default FeaturedInfo;