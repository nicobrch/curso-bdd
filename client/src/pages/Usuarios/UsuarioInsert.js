import React, {useState} from "react";
import "./Usuario.css";
import {Row, Col, Form, FormGroup} from "react-bootstrap";
import {postUser} from "../../Api";

const UsuarioInsert = () => {

    const [userId, setUserId] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            await postUser(userId);
            alert('Usuario insertado!');
        } catch (err) {
            alert('Error!')
            console.error(err.message);
        }
    };

    return (
        <div className="usuario">
            <div className="container rounded col-4 align-self-center">
                <Row>
                    <Col>
                        <h1 className="titulo">Insertar nuevo Usuario</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={onSubmitForm}>
                            <FormGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="osu! id"
                                    value={userId}
                                    onChange={e => setUserId(e.target.value)}
                                />
                                <Form.Text className="texto">
                                    Solo la ID sin url
                                </Form.Text>
                            </FormGroup>
                            <button className="botonInsertar" type="submit">
                                Insertar
                            </button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default UsuarioInsert;