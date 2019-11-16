import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let newCartItem;
      if (state.items[addedProduct.id]) {
        newCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: newCartItem },
        totalAmount: state.totalAmount + prodPrice
      };
    case REMOVE_FROM_CART:
      const productId = action.productId;
      const selectedCartItem = state.items[productId];
      const currQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currQty > 1) {
        //reduce not erase
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );

        updatedCartItems = { ...state.items, [productId]: updatedCartItem };
      } else {
        //erase
        updatedCartItems = { ...state.items };
        delete updatedCartItems[productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
    case CLEAR_CART:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemsTotal = updatedItems[action.productId].sum;
      delete updatedItems[action.productId];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemsTotal
      };
  }
  return state;
};
