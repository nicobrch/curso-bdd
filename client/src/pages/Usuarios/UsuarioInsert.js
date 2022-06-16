import React, {useState} from "react";
import "./Usuario.css";
import {Row, Col, Form} from "react-bootstrap";
import {postUser} from "../../Api";

const UsuarioInsert = () => {

    const [userId, setUserId] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { userId };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="lista">
            <div className="container rounded">
                <Row>
                    <Col>
                        <h1 className="titulo">Insertar nuevo Usuario</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={onSubmitForm}>
                            <Form.Control
                                type="text"
                                placeholder="osu! id"
                                value={userId}
                                onChange={e => setUserId(e.target.value)}
                            />
                            <Form.Text className="texto">
                                Solo la ID sin url
                            </Form.Text>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className="botonInsertar">
                            Insertar
                        </button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default UsuarioInsert;