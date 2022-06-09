import "../itemList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import { fetchUsers } from "../../Api";

export default function UserList() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchUsers().then(u => setData(u));
    }, []);

    if (data === null) {
        return <p>Loading profile...</p>;
    }

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "username",
          headerName: "User",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="itemListItem">
                <img className="itemListImg" src={params.row.avatar_url} alt="" />
                {params.row.username}
              </div>
            );
          },
        },
        { field: "pp", headerName: "PP", width: 120 },
        { field: "global_rank", headerName: "Rank G.", width: 150 },
        { field: "country_rank", headerName: "Rank N.", width: 150 },
        { field: "playcount", headerName: "Playcount", width: 150 },
        { field: "country", headerName: "Pais", width: 120 },
        { field: "updated_at", headerName: "Update", width: 130},
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
