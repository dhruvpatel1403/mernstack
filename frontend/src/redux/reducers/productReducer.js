const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PRODUCT_REQUEST':
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_PRODUCT_SUCCESS':
      return { ...state, loading: false, products: [...state.products, action.payload] };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'CREATE_PRODUCT_FAILURE':
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    case 'UPDATE_PRODUCT_SUCCESS':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };

    default:
      return state;
  }
};
