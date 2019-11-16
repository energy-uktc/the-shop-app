import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import CartItem from "../../components/shop/CartItem";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/colors";
import colors from "../../constants/colors";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const cartItemsArr = [];
    for (let key in state.cart.items) {
      cartItemsArr.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return cartItemsArr.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.abs(cartTotalAmount).toFixed(2)}
          </Text>
        </Text>
        <Button
          color={colors.accent}
          title="Confirm Order"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
            dispatch(cartActions.clearCart());
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            title={item.productTitle}
            price={item.productPrice}
            amount={item.sum}
            allowDeletion={true}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = navData => {
  return {
    headerTitle: "Cart" //navData.navigation.getParam("productTitle")
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: "white"
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});
export default CartScreen;
