import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import styles from "./Usuario.module.css";
import {fetchUser} from "../../Api";
import TableHeader from "../../components/TableHeader/TableHeader";

const Usuario = () => {
    const {id} = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchUser(id).then(d => setData(d));
    },);

    if (data === null){
        return (
            <div className={styles.fondo}>
                <div className={`${styles.container} container rounded`}>
                    <h1 className={styles.titulo}>Cargando...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.fondo}>
            <TableHeader
            identificador={data.id}
            foto={data.avatar_url}
            titulo={data.username}
            update={data.updated_at}
            />
            <div className={`${styles.container} container rounded`}>
            </div>
            <div className={`${styles.container} container rounded`}>
            </div>
        </div>
    );
}

export default Usuario;