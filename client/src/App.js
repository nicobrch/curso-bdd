import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home/Home";
import UserList from "./pages/Usuarios/UserList";
import Usuario from "./pages/Usuarios/Usuario";
import UsuarioInsert from "./pages/Usuarios/UsuarioInsert";
import PerifericoList from "./pages/Perifericos/PerifericoList";

const App = () => {

    return (
        <Router>
            <Topbar/>
            <div className="contenedor">
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/usuarios" element={<UserList/>}/>
                    <Route path="/usuarios/:id" element={<Usuario/>}/>
                    <Route path="/admin/usuario" element={<UsuarioInsert/>}/>
                    <Route path="/perifericos" element={<PerifericoList/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;