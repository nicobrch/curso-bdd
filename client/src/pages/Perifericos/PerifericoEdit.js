import React, {useState, useEffect} from "react";
import styles from "./Periferico.module.css";
import {Row, Col, Form, FormGroup} from "react-bootstrap";
import {updatePeriferico, fetchPeriferico} from "../../Api";
import toast, { Toaster } from "react-hot-toast";
import {useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";

const PerifericoEdit = () => {

    const {id} = useParams();
    const [data, setData] = useState(null);
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [tipo, setTipo] = useState("");
    const [loading, setLoading] = useState(true);

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
            await updatePeriferico(id, marca, modelo, tipo);
            toast.success('Periferico actualizado!',
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

    useEffect(() => {
        setLoading(true);
        fetchPeriferico(id).then(d => setData(d));
        setTimeout(() => {
            setLoading(false);
        }, 250)
    }, []);

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
                    <h1 className={styles.titulo}>Editar Periferico: {id}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={onSubmitForm}>
                        <FormGroup>
                            <Form.Control
                                type="text"
                                placeholder={data.data['marca']}
                                value={marca}
                                onChange={e => setMarca(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Texto
                            </Form.Text>
                            <Form.Control
                                type="text"
                                placeholder={data.data['modelo']}
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
                                {data.data['tipo']}
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

export default PerifericoEdit;