import React, { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { BsPencil, BsTrash } from "react-icons/bs";
import headphoneImg from '../assets/headphone.jpg';
import watchImg from '../assets/watch.jpg';

const mockProducts = [
  {
    id: 1,
    title: "Noise-Canceling Headphones",
    desc: "High-fidelity over-ear headphones with superior comfort and noise isolation.",
    price: "$120",
    img: headphoneImg
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    desc: "Track your health metrics and stay connected on the move.",
    price: "$80",
    img: watchImg
  },
  {
    id: 3,
    title: "Ultra HD Laptop",
    desc: "Sleek and powerful laptop for work, play, and everything in between.",
    price: "$600",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
  }
];

function Products() {
  const [products] = useState(mockProducts);

  return (
    <Container
      fluid
      className="py-5"
      style={{
        paddingTop: '56px', // Offset for navbar
        background: '#f5f5f5',
        minHeight: '100vh'
      }}
    >
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary display-6">Explore Our Collection</h2>
        <Button variant="outline-primary" size="sm" className="mt-3">Add Product</Button>
      </div>

      <Row className="g-4 justify-content-center">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="h-100 shadow border-0"
              style={{
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
              }}
            >
              <Card.Img
                variant="top"
                src={product.img}
                alt={product.title}
                style={{
                  height: '220px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '0.5rem',
                  borderTopRightRadius: '0.5rem'
                }}
              />
              <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fw-bold">{product.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
                  {product.desc}
                </Card.Text>
                <h5 className="text-primary mt-2">{product.price}</h5>
                <div className="d-flex justify-content-end gap-2 mt-auto">
                  <BsPencil style={{ cursor: 'pointer' }} />
                  <BsTrash style={{ cursor: 'pointer', color: 'red' }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
