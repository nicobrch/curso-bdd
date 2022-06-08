import React, { Fragment, useEffect, useState } from "react";
import {Container} from "react-bootstrap";
const axios = require("axios");
const apiUrl = 'http://localhost:3001/api/v1'

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(apiUrl + '/usuario');
      const jsonData = await response.data;
      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
      <Container>
         <table className="table table-striped table-dark table-bordered table-md">
        <thead>
        <tr>
           <th className="th-sm" scope="col">Img</th>
          <th scope="col">ID</th>
          <th scope="col">Username</th>
          <th scope="col">PP</th>
          <th scope="col">Global Rank</th>
           <th scope="col">Country Rank</th>
          <th scope="col">Playcount</th>
          <th scope="col">Region</th>
          <th scope="col">Pais</th>
           <th scope="col">Updated</th>
        </tr>
        </thead>
        <tbody>
        {users.map (user => (
            <tr key={user.id}>
               <td><img src={user.avatar_url} className="img-fluid" style={styles.foto} alt="Foto"/></td>
               <td>{user.id}</td>
               <td>{user.username}</td>
               <td>{user.pp}</td>
               <td>{user.global_rank}</td>
               <td>{user.country_rank}</td>
               <td>{user.playcount}</td>
               <td>{user.region}</td>
               <td>{user.country}</td>
               <td>{user.updated_at}</td>
            </tr>
        ))}
        </tbody>
      </table>
      </Container>
  );
};

const styles = {
   foto : {
      height : "50px",
      width : "50px"
   }
}


export default ListUsers;