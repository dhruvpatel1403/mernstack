import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/actions/productActions';

const EditProductModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    image: Yup.string().url('Invalid URL').required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().positive('Must be positive').required('Required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(updateProduct(product.id, values));
    setSubmitting(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            title: product.title,
            image: product.image,
            description: product.description,
            price: product.price
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label>Title</label>
                <Field name="title" className="form-control" />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label>Image URL</label>
                <Field name="image" className="form-control" />
                <ErrorMessage name="image" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <Field name="description" as="textarea" className="form-control" />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label>Price</label>
                <Field name="price" type="number" className="form-control" />
                <ErrorMessage name="price" component="div" className="text-danger" />
              </div>
              <Button variant="primary" type="submit" disabled={isSubmitting}>Update</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
