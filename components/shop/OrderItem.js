import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableNativeFeedback
} from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/colors";

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <TouchableNativeFeedback
      onPress={() => {
        setShowDetails(prevState => !prevState);
      }}
    >
      <View style={styles.orderItem}>
        <View style={styles.summary}>
          {/* <Text>{props.order.id}</Text> */}
          <Text style={styles.totalAmount}>
            ${props.order.amount.toFixed(2)}
          </Text>
          <Text style={styles.date}>{props.order.readableDate}</Text>
        </View>
        {showDetails && (
          <View style={styles.details}>
            {props.order.items.map(item => (
              <CartItem
                key={item.productId}
                quantity={item.quantity}
                title={item.productTitle}
                price={item.productPrice}
                amount={item.sum}
              />
            ))}
          </View>
        )}

        <View style={styles.expand}>
          <Ionicons
            name={showDetails ? "ios-arrow-up" : "ios-arrow-down"}
            color={Colors.primary}
            size={23}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888"
  },
  expand: {
    alignItems: "center",
    padding: 5
  },
  details: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

export default OrderItem;
