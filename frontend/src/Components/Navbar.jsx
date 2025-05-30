import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      style={{
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        width: '100vw',
      }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold' }}>
          ProdManage
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
