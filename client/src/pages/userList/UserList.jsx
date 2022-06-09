import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
const axios = require('axios').default;

export default function UserList() {
   const [data, setData] = useState([]);

   const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
   };

   const getUsers = async () => {
      try {
         const response = await axios.get('http://localhost:3001/api/v1/usuario');
         const jsonData = await response.data;
         setData(jsonData);
      } catch (err) {
         console.error(err.message);
      }
   }

   useEffect( () => {
      getUsers();
   }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar_url} alt="" />
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
              <button className="userListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
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
