import React, {useState, useEffect} from "react";
import styles from "./Torneo.module.css";
import {Row, Col, Form, FormGroup} from "react-bootstrap";
import {updateTorneo, fetchTorneo} from "../../Api";
import toast, { Toaster } from "react-hot-toast";
import {useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";

const TorneoEdit = () => {

    const {id} = useParams();
    const [data, setData] = useState(null);
    const [nombre, setNombre] = useState("");
    const [rank, setRank] = useState("");
    const [prize, setPrize] = useState("");
    const [formato, setFormato] = useState("");
    const [loading, setLoading] = useState(true);

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
            await updateTorneo(id, nombre, rank, prize, formato);
            toast.success('Torneo actualizado!',
                {
                    style : {
                        color: 'white',
                        background: '#66B669',
                    }
                });
        } catch (err) {
            toast.error('No se pudo actualizar el torneo :(',
                {
                    style : {
                        color: 'white',
                        background: '#D85151',
                    }
                });
            console.error(err.message);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchTorneo(id).then(d => setData(d));
        setTimeout(() => {
            setLoading(false);
        }, 250)
    }, [id]);

    if (loading === true){
        return (
            <div className={styles.fondo}>
                <div className="container justify-content-center align-content-center">
                    <CircularProgress/>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.fondo}>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className={`${styles.container} container align-self-center col-5 rounded`}>
            <Row>
                <Col>
                    <h1 className={styles.titulo}>Editar Torneo: {id}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={onSubmitForm}>
                        <FormGroup>
                            <Form.Control
                                type="text"
                                placeholder={data['nombre']}
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Nombre
                            </Form.Text>
                            <Form.Control
                                type="text"
                                placeholder={data['rank_range']}
                                value={rank}
                                onChange={e => setRank(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Rank Range
                            </Form.Text>
                            <Form.Control
                                type="text"
                                placeholder={data['prizepool']}
                                value={prize}
                                onChange={e => setPrize(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Prizepool
                            </Form.Text>
                            <Form.Control
                                type="text"
                                placeholder={data['formato']}
                                value={formato}
                                onChange={e => setFormato(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Formato
                            </Form.Text>
                        </FormGroup>
                        <button className={styles.insertar} type="submit">
                            Editar y Actualizar
                        </button>
                    </Form>
                </Col>
            </Row>
            </div>
        </div>
    );
}

export default TorneoEdit;