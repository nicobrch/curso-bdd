import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home/Home";
import UserList from "./pages/Usuarios/UserList";
import UsuarioPerfil from "./pages/Usuarios/UsuarioPerfil";
import UsuarioInsert from "./pages/Usuarios/UsuarioInsert";

const App = () => {

    return (
        <Router>
            <Topbar/>
            <div className={styles.contenedor}>
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/usuarios" element={<UserList/>}/>
                    <Route path="/usuarios/:id" element={<UsuarioPerfil/>}/>
                    <Route path="/admin/usuario" element={<UsuarioInsert/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;