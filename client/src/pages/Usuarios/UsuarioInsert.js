import React, {useState} from "react";
import "./Usuario.css";
import {Row, Col, Form, FormGroup} from "react-bootstrap";
import {postUser} from "../../Api";
import toast, { Toaster } from "react-hot-toast";

const UsuarioInsert = () => {

    const [userId, setUserId] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        if (userId === ""){
            return (
                toast.error('No ha ingresado ningun usuario',
                    {
                        style : {
                            color: 'white',
                            background: '#D85151',
                        }
                    })
            )
        }
        try {
            await postUser(userId);
            toast.success('Usuario insertado!',
                {
                    style : {
                        color: 'white',
                        background: '#66B669',
                    }
                });
        } catch (err) {
            toast.error('No se pudo insertar el usuario :(',
                {
                    style : {
                        color: 'white',
                        background: '#D85151',
                    }
                });
            console.error(err.message);
        }
    };

    return (
        <div className="usuario">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
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