import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Switch } from "react-native";

import locations from "@/assets/data/locations.json";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProgressSteps from "@/components/aux/ProgressSteps";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";

interface Element {
  id: string;
  title: string;
  children?: Element[];
  expanded?: boolean;
}

const ProviderLocationScreen = () => {
  const [elements, setElements] = useState<Element[]>(locations);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, expanded: !el.expanded } : el)));
  };

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
            <Text>{item.title}</Text>

            <Ionicons
              name={item.expanded ? "chevron-up-outline" : "chevron-down-outline"}
              size={32}
              color="black"
              style={{ marginLeft: "auto" }}
              onPress={() => toggleExpand(item.id)}
            />
          </View>

          {item.expanded &&
            item.children?.map((child) => (
              <View
                key={child.id}
                style={[
                  styles.item,
                  {
                    borderBottomWidth:
                      child.id === item.children![item.children!.length - 1].id ? 2 : 0,
                  },
                ]}
              >
                <Text>{child.title}</Text>
                <Switch
                  style={{ marginLeft: "auto" }}
                  value={selected.includes(child.id)}
                  onValueChange={() => toggleSelect(child.id)}
                />
              </View>
            ))}
        </>
      );
    },
    [elements]
  );

  return (
    <View style={[defaultStyles.container, { paddingBottom: 40 }]}>
      <ProgressSteps progress={2} />
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
          router.push("/(onboarding)/bio");
        }}
        disabled={selected.length === 0}
      />
    </View>
  );
};

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

export default ProviderLocationScreen;
