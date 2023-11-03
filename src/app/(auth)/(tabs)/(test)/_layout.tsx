import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Test"
        onPress={() => router.replace("/(auth)/(tabs)/(home)/home")}
      />
    </DrawerContentScrollView>
  );
}

const _layout = () => {
  return <Drawer drawerContent={CustomDrawerContent} />;
};

export default _layout;

const styles = StyleSheet.create({});
