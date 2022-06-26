import React, {useState} from "react";
import styles from "./Periferico.module.css";
import {Row, Col, Form, FormGroup} from "react-bootstrap";
import {postPeriferico} from "../../Api";
import toast, { Toaster } from "react-hot-toast";

const PerifericoInsert = () => {

    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [tipo, setTipo] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        if (marca === "" || modelo === "" || tipo === ""){
            return (
                toast.error('Rellene todos los campos',
                    {
                        style : {
                            color: 'white',
                            background: '#D85151',
                        }
                    })
            )
        }
        try {
            await postPeriferico(marca, modelo, tipo);
            toast.success('Periferico insertado!',
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
        <div className={styles.fondo}>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className={`${styles.container} container align-self-center col-4 rounded`}>
            <Row>
                <Col>
                    <h1 className={styles.titulo}>Insertar nuevo Periferico</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={onSubmitForm}>
                        <FormGroup>
                            <Form.Control
                                type="text"
                                placeholder="Marca"
                                value={marca}
                                onChange={e => setMarca(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Texto
                            </Form.Text>
                            <Form.Control
                                type="text"
                                placeholder="Modelo"
                                value={modelo}
                                onChange={e => setModelo(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Texto
                            </Form.Text>
                            <Form.Select value={tipo} onChange={e => setTipo(e.target.value)}>
                                <option>Mouse</option>
                                <option>Teclado</option>
                                <option>Monitor</option>
                                <option>Tablet</option>
                            </Form.Select>
                            <Form.Text className={styles.texto}>
                                Opcion
                            </Form.Text>
                        </FormGroup>
                        <button className={styles.insertar} type="submit">
                            Insertar
                        </button>
                    </Form>
                </Col>
            </Row>
            </div>
        </div>
    );
}

export default PerifericoInsert;