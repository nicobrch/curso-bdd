import "../itemList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchPerifericos} from "../../Api";

export default function PerifericosList() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchPerifericos().then(p => setData(p));
    }, []);

    if (data === null) {
        return <p>Loading perifericos...</p>;
    }

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "marca",
          headerName: "Marca",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="itemList">
                <img className="itemListImg" src={params.row.imagen_url} alt="" />
                {params.row.marca}
              </div>
            );
          },
        },
        { field: "modelo", headerName: "Modelo", width: 240 },
        { field: "url", headerName: "Link", width: 160 },
        { field: "tipo_id", headerName: "ID Tipo", width: 130 },
        { field: "tipo", headerName: "Tipo", width: 150 },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/user/" + params.row.id}>
                  <button className="itemListEdit">Editar</button>
                </Link>
                <Link to={"/delete/user/" + params.row.id}>
                  <DeleteOutline className="itemListDelete"/>
                </Link>
              </>
            );
          },
        },
    ];

    return (
        <div className="itemList">
            <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={16}
            checkboxSelection
            />
        </div>
    );
}
