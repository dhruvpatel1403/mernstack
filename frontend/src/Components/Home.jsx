import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      style={{
        background: 'linear-gradient(to right, #6a11cb, #2575fc)', 
        color: 'white',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '56px',
        boxSizing: 'border-box',
      }}
    >
      <Container fluid className="p-0 h-100">
        <Row className="g-0 w-100 h-100 align-items-center">
          <Col
            lg={6}
            className="d-flex flex-column justify-content-center align-items-start px-5"
          >
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Welcome to ProdManage
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                lineHeight: '1.6',
                marginBottom: '2rem',
              }}
            >
              Effortlessly manage your products with our all-in-one tool. Create, view, edit, and delete products — fast, simple, and reliable.
            </p>
            <Button
              as={Link}
              to="/products"
              variant="light"
              size="lg"
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '500',
                color: '#6a11cb', 
              }}
            >
              Explore Products
            </Button>
          </Col>
          <Col
            lg={6}
            className="d-flex justify-content-center align-items-center p-4"
          >
            <img
              src="https://img.icons8.com/color/480/checked--v1.png"
              alt="Checklist"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
