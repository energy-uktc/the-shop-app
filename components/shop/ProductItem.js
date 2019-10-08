import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import Color from "../../constants/colors";

const ProductItem = props => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.imageUrl }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={Color.primary}
          title="Details"
          onPress={props.OnViewDetail}
        />
        <Button
          color={Color.primary}
          title="Add to Cart"
          onPress={props.OnAddToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20
  },
  details: {
    alignItems: "center",
    padding: 5,
    height: "15%"
  },
  title: {
    fontSize: 18,
    marginVertical: 3
  },
  price: {
    fontSize: 14,
    color: "#888"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: "25%"
  }
});

export default ProductItem;
