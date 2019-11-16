import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(item => item.ownerId === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          item => item.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          item => item.id !== action.productId
        )
      };
  }
  return state;
};
