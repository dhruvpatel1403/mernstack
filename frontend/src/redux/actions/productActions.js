import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://prodmanager-egeb.onrender.com/api/products'; // Change this to your Render URL when deploying

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: 'CREATE_PRODUCT_REQUEST' });
  try {
    const { data } = await axios.post(API_URL, product);
    dispatch({ type: 'CREATE_PRODUCT_SUCCESS', payload: data });
    toast.success('Product created successfully!');
  } catch (error) {
    dispatch({ type: 'CREATE_PRODUCT_FAILURE', payload: error.message });
    toast.error('Failed to create product');
  }
};

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const { data } = await axios.get(API_URL);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    toast.error('Failed to fetch products');
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: id });
    toast.success('Product deleted!');
  } catch (error) {
    toast.error('Failed to delete product');
  }
};

export const updateProduct = (id, updatedProduct) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, updatedProduct);
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: data });
    toast.success('Product updated!');
  } catch (error) {
    toast.error('Failed to update product');
  }
};
