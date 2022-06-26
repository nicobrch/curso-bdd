import React, {useState} from "react";
import styles from "./Usuario.module.css";
import {Row, Col, Form, FormGroup} from "react-bootstrap";
import {updateUser} from "../../Api";
import toast, { Toaster } from "react-hot-toast";
import {useParams} from "react-router-dom";

const UsuarioEdit = () => {

    const [region, setRegion] = useState("");
    const {id} = useParams();

    const onSubmitForm = async e => {
        e.preventDefault();
        if (region === ""){
            return (
                toast.error('No ha ingresado ninguna region',
                    {
                        style : {
                            color: 'white',
                            background: '#D85151',
                        }
                    })
            )
        }
        try {
            await updateUser(id, region);
            toast.success('Region insertada!',
                {
                    style : {
                        color: 'white',
                        background: '#66B669',
                    }
                });
        } catch (err) {
            toast.error('No se pudo insertar la region :(',
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
                    <h1 className={styles.titulo}>Editar Usuario: {id}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={onSubmitForm}>
                        <FormGroup>
                            <Form.Control
                                type="text"
                                placeholder="nombre de region"
                                value={region}
                                onChange={e => setRegion(e.target.value)}
                            />
                            <Form.Text className={styles.texto}>
                                Region
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

export default UsuarioEdit;