import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ScrollView,
  View,
  Button,
  Image,
  Text,
  StyleSheet
} from "react-native";
import Colors from "../../constants/colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailsScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(item => item.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    marginVertical: 20
  },
  image: {
    width: "100%",
    height: 300
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20
  }
});

export default ProductDetailsScreen;
