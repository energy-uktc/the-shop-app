export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId: productId
  };
};

export const createProduct = (title, price, imageUrl, description) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      price,
      imageUrl,
      description
    }
  };
};

export const updateProduct = (id, title, price, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title,
      price,
      imageUrl,
      description
    }
  };
};
