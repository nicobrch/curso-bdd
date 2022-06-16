import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import "./Usuario.css";
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
            <div className="usuario">
                <div className="container rounded">
                    <h1 className="titulo">Cargando...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="usuario">
            <TableHeader
            identificador={data.id}
            foto={data.avatar_url}
            titulo={data.username}
            update={data.updated_at}
            />
            <div className="container rounded">
            </div>
            <div className="container rounded">

            </div>
        </div>
    );
}

export default Usuario;