import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";

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
