import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import embraceLogo from '../assets/embraceLogo.png';

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" style={{ fontFamily: 'Ubuntu Sans, sans-serif' }} className="sticky-top">
      <Container className="justify-content-between">
        <Navbar.Brand href="#home">
          <img src={embraceLogo} alt="Embrace Logo" style={{ maxWidth: '120px', maxHeight: '100px', marginRight: '10px' }} />
          <span>Events.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto text-dark">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#schedule">Events</Nav.Link>
            <Nav.Link href="#blog">Blog</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <Button variant="outline-dark">Buy ticket</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
