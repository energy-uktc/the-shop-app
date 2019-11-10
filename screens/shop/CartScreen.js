import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text>${19.99}</Text>
        </Text>
        <Button title="Confirm Order" />
      </View>
      <View>
        <Text>CART ITEMS....</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center"
  },
  summaryText: {}
});
export default CartScreen;
