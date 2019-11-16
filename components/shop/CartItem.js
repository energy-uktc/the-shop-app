import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemData}>
        <View style={styles.itemDataTop}>
          <Text style={styles.mainText}>{props.title}</Text>
        </View>
        <View style={styles.itemDataBottom}>
          <View style={styles.itemDataLeft}>
            <Text style={styles.quantity}>{props.quantity}</Text>
            <Text style={styles.quantity}>{"  x  "}</Text>
            <Text style={styles.quantity}>${props.price}</Text>
          </View>
          <View style={styles.itemDataRight}>
            <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
            <Text>{"  "}</Text>
          </View>
        </View>
      </View>
      <View style={styles.deleteContainer}>
        {props.allowDeletion && (
          <TouchableNativeFeedback
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={30}
              color="red"
            />
          </TouchableNativeFeedback>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#888"
    // marginHorizontal: 20
  },
  cartItemData: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  itemDataTop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  itemDataBottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemDataRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16
  },
  itemDataLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  },
  deleteContainer: {
    marginLeft: 10
  }
});

export default CartItem;
