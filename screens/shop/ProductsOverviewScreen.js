import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
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
              alert("Added to cart");
            }}
          />
        );
      }}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
