import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  Button
} from "react-native";
import Color from "../../constants/colors";

const ProductItem = props => {
  const TouchableComp =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.imageUrl }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>{props.children}</View>
          </View>
        </TouchableComp>
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
    margin: 20,
    overflow: "hidden"
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10
  },
  details: {
    alignItems: "center",
    padding: 5,
    height: "15%"
  },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    marginVertical: 3
  },
  price: {
    fontFamily: "open-sans",
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
