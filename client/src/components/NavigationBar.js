import React from "react";
import {Component} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

class NavigationBar extends Component {
    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-3">
                <Container>
                    <Navbar.Brand href="#home">BabyStalker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-center flex-grow-1 pe-3">
                            <Nav.Link href="#">Usuarios</Nav.Link>
                            <Nav.Link href="#">Perifericos</Nav.Link>
                            <Nav.Link href="#">Torneos</Nav.Link>
                            <Nav.Link href="#">Badges</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default NavigationBar;