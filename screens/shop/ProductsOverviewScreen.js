import React from "react";
import { FlatList, View, Text, StyleSheet, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  console.log(products.length);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <ProductItem
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            OnViewDetail={() => {
              props.navigation.navigate("ProductDetail", {
                productId: item.id,
                productTitle: item.title
              });
            }}
            OnAddToCart={() => {
              dispatch(cartActions.addToCart(item));
            }}
          />
        );
      }}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Cart"
        iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
        onPress={() => {}}
      />
    </HeaderButtons>
  )
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
