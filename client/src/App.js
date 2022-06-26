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
import UsuarioEdit from "./pages/Usuarios/UsuarioEdit";
import PerifericoList from "./pages/Perifericos/PerifericoList";
import PerifericoInsert from "./pages/Perifericos/PerifericoInsert";
import PerifericoEdit from "./pages/Perifericos/PerifericoEdit";
import TorneoList from "./pages/Torneos/TorneoList";
import TorneoEdit from "./pages/Torneos/TorneoEdit";
import TorneoInsert from "./pages/Torneos/TorneoInsert";

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
                    <Route path="/insert/usuario" element={<UsuarioInsert/>}/>
                    <Route path="/editar/usuario/:id" element={<UsuarioEdit/>}/>

                    <Route path="/perifericos" element={<PerifericoList/>}/>
                    <Route path="/perifericos/:id" element={<PerifericoEdit/>}/>
                    <Route path="/insert/periferico" element={<PerifericoInsert/>}/>

                    <Route path="/torneos" element={<TorneoList/>}/>
                    <Route path="/torneos/:id" element={<TorneoEdit/>}/>
                    <Route path="/insert/torneo" element={<TorneoInsert/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;