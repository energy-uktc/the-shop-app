import React from "react";
import { useDispatch } from "react-redux";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import * as authActions from "../store/actions/auth";

const SideDrawerView = props => {
  const dispatch = useDispatch();
  const TouchableComponent =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <SafeAreaView style={styles.container}>
      <DrawerNavigatorItems {...props} />
      <TouchableComponent
        onPress={() => {
          const logout = async () => {
            await dispatch(authActions.logout());
            props.navigation.navigate("Auth");
          };
          logout();
        }}
      >
        <View style={styles.drawerItem}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={27}
              color={colors.primary}
              style={styles.drawerIconItem}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Log Out</Text>
          </View>
        </View>
      </TouchableComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  drawerItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    paddingTop: 10
    //backgroundColor: "#ddd"
  },
  drawerIconItem: {
    marginRight: 20,
    marginLeft: 15
  },
  text: {
    fontFamily: "open-sans-bold"
    //color: colors.primary
  },
  iconContainer: {
    width: "30%"
  },
  textContainer: {
    width: "70%"
  }
});

export default SideDrawerView;
