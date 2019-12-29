import Product from "../../models/product";
import {
  isTokenExpired,
  getUserData,
  refreshTokenIfExpired
} from "../../utils/authentication";
import * as authActions from "./auth";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      "https://rn-complete-guide-4f17e.firebaseio.com/products.json"
    );
    if (!response.ok) {
      throw new Error(
        `Something went wrong. ${
          response.statusText ? response.statusText : ""
        }`
      );
    }

    const resData = await response.json();

    let loadedProducts = [];
    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }
    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
    });
  };
};
export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    await refreshTokenIfExpired(dispatch, getState);
    let { idToken, expirationDate } = getState().auth;
    if (isTokenExpired(expirationDate)) {
      const { refreshToken } = await getUserData();
      await authActions.refreshToken(refreshToken);
      idToken = getState().auth.idToken;
    }

    const response = await fetch(
      `https://rn-complete-guide-4f17e.firebaseio.com/products/${productId}.json?auth=${idToken}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error(`Something went wrong.`);
    }
    dispatch({
      type: DELETE_PRODUCT,
      productId: productId
    });
  };
};

export const createProduct = (title, price, imageUrl, description) => {
  return async (dispatch, getState) => {
    await refreshTokenIfExpired(dispatch, getState);

    const tokenId = getState().auth.idToken;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-complete-guide-4f17e.firebaseio.com/products.json?auth=${tokenId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          price,
          imageUrl,
          description,
          ownerId: userId
        })
      }
    );
    if (!response.ok) {
      throw new Error(
        `Something went wrong. ${
          response.statusText ? response.statusText : ""
        }`
      );
    }
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        ownerId: userId,
        price,
        imageUrl,
        description
      }
    });
  };
};

export const updateProduct = (id, title, price, imageUrl, description) => {
  return async (dispatch, getState) => {
    await refreshTokenIfExpired(dispatch, getState);
    let { idToken } = getState().auth;
    const response = await fetch(
      `https://rn-complete-guide-4f17e.firebaseio.com/products/${id}.json?auth=${idToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          price,
          imageUrl,
          description
        })
      }
    );

    if (!response.ok) {
      console.log(response);

      throw new Error(
        `Something went wrong. ${
          response.statusText ? response.statusText : ""
        }`
      );
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      productData: {
        title,
        price,
        imageUrl,
        description
      }
    });
  };
};
