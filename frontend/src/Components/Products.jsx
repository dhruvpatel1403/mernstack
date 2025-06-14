import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/actions/productActions';
import ProductFormModal from './ProductFormModal';
import EditProductModal from './EditProductModal';

function Products() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <Container fluid className="py-5" style={{ paddingTop: '56px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary display-6">Explore Our Collection</h2>
        <Button variant="outline-primary" size="sm" className="mt-3" onClick={() => setShowModal(true)}>
          Add Product
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Row className="g-4 justify-content-center">
          {products.map(product => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="h-100 shadow border-0"
                style={{ transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
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
                  src={product.image}
                  alt={product.title}
                  style={{ height: '220px', objectFit: 'cover', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
                />
                <Card.Body className="d-flex flex-column p-3">
                  <Card.Title className="fw-bold">{product.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
                    {product.description}
                  </Card.Text>
                  <h5 className="text-primary mt-2">${product.price}</h5>
                  <div className="d-flex justify-content-end gap-2 mt-auto">
                    <BsPencil style={{ cursor: 'pointer' }} onClick={() => handleEditClick(product)} />
                    <BsTrash style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(product._id)} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <ProductFormModal show={showModal} handleClose={() => setShowModal(false)} />
      {selectedProduct && (
        <EditProductModal show={editModal} handleClose={() => setEditModal(false)} product={selectedProduct} />
      )}
    </Container>
  );
}

export default Products;
