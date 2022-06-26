import React, {useState} from "react";
import styles from "./Torneo.module.css";
import {Row, Col, Form, FormGroup} from "react-bootstrap";
import {postTorneo} from "../../Api";
import toast, { Toaster } from "react-hot-toast";

const TorneoInsert = () => {

    const [nombre, setNombre] = useState("");
    const [rank, setRank] = useState("");
    const [prize, setPrize] = useState("");
    const [formato, setFormato] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        if (nombre === "" || rank === "" || prize === "" || formato === ""){
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
            await postTorneo(nombre, rank, prize, formato);
            toast.success('Torneo insertado!',
                {
                    style : {
                        color: 'white',
                        background: '#66B669',
                    }
                });
        } catch (err) {
            toast.error('No se pudo insertar el torneo :(',
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
                    <h1 className={styles.titulo}>Insertar nuevo Torneo</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={onSubmitForm}>
                        <FormGroup>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Nombre
                            </Form.Text>
                            <Form.Control
                                type="text"
                                placeholder="5k-25k"
                                value={rank}
                                onChange={e => setRank(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Rank Range
                            </Form.Text>
                            <Form.Control
                                type="text"
                                placeholder="$100"
                                value={prize}
                                onChange={e => setPrize(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Prizepool
                            </Form.Text>
                            <Form.Control
                                type="text"
                                placeholder="4v4"
                                value={formato}
                                onChange={e => setFormato(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Formato
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

export default TorneoInsert;