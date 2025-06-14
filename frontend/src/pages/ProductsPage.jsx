import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductFormModal from '../Components/ProductFormModal';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Products</h2>
      <button onClick={() => setShowModal(true)}>Add Product</button>
      {showModal && <ProductFormModal onClose={() => setShowModal(false)} />}
      {loading ? <p>Loading...</p> : (
        <ul>
          {products.map(product => (
            <li key={product._id}>{product.title} - ${product.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;
