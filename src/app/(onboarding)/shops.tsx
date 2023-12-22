import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Switch, Text, View, Image } from "react-native";

import shops from "@/assets/data/shops.json";
import ProgressSteps from "@/components/aux/ProgressSteps";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";

interface Element {
  id: string;
  title: string;
  children?: Element[];
}

const ShopsScreen = () => {
  const [elements, setElements] = useState<Element[]>(shops);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((el) => el !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  useEffect(() => {
    setElements([...elements]);
  }, [selected]);

  const renderItem = useCallback(
    ({ item }: { item: Element }) => {
      return (
        <>
          <View
            style={[
              styles.item,
              {
                borderBottomWidth: item.id === elements[elements.length - 1].id ? 0 : 2,
              },
            ]}
          >
            <Image
              source={{ uri: "https://placehold.co/600x400/png" }}
              style={{ width: 80, height: 80 }}
            />
            <Text>{item.title}</Text>

            <Switch
              style={{ marginLeft: "auto" }}
              value={selected.includes(item.id)}
              onValueChange={() => toggleSelect(item.id)}
            />
          </View>
        </>
      );
    },
    [elements]
  );

  return (
    <View style={[defaultStyles.container, { paddingBottom: 40 }]}>
      <ProgressSteps progress={1} />
      <Text style={[defaultStyles.textCenter, { marginVertical: 20 }]}>
        Selecciona las localidades en las que trabajas
      </Text>
      <FlatList
        style={styles.list}
        data={elements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <PrimaryButton
        text={TEXT_CONSTANTS.CONTINUE}
        onPress={() => {
          router.push("/(onboarding)/address");
        }}
        disabled={selected.length === 0}
      />
    </View>
  );
};

export default ShopsScreen;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  item: {
    paddingBottom: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    gap: 10,
  },
});
