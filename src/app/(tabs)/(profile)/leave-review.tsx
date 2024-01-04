import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View, Image, TextInput, ScrollView } from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import { defaultStyles } from "@/constants/Styles";

const LeaveReviewScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <Button onPress={() => alert("This is a button!")} title="Enviar" />,
        }}
      />
      <ScrollView
        style={[defaultStyles.container, { gap: 20 }]}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Image
            source={{ uri: "https://placehold.co/100x100/png" }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <View>
            <Text style={{ fontFamily: "mon-sb", fontSize: 24 }}>Pepe García</Text>
            <Text style={{ fontFamily: "mon", fontSize: 18 }}>Plomero</Text>
          </View>
        </View>
        <View style={{ gap: 20 }}>
          <Text style={{ fontFamily: "mon", fontSize: 18, textAlign: "center" }}>
            ¿Cómo lo calificarías?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="star-o" size={42} color="black" />
            <FontAwesome name="star-o" size={42} color="black" />
            <FontAwesome name="star-o" size={42} color="black" />
            <FontAwesome name="star-o" size={42} color="black" />
            <FontAwesome name="star-o" size={42} color="black" />
          </View>
          <View
            style={{
              backgroundColor: "#ccc",
              borderRadius: 50,
              padding: 10,
              width: 80,
              height: 80,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "mon",
                fontSize: 24,
                textAlign: "center",
              }}
            >
              4
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "mon-sb",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Normal
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <Text
            style={{
              fontFamily: "mon-sb",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            ¿Qué salió mal?
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center", // replace with 'space-between
              gap: 15,
            }}
          >
            <View
              style={[
                defaultStyles.card,
                {
                  width: "45%",
                  margin: 0,
                  height: 75,
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={{ textAlign: "center", alignSelf: "center" }}>Llegó tarde</Text>
            </View>
            <View
              style={[
                defaultStyles.card,
                {
                  width: "45%",
                  margin: 0,
                  height: 75,
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={{ textAlign: "center" }}>Falta de cooperación</Text>
            </View>
            <View
              style={[
                defaultStyles.card,
                {
                  width: "45%",
                  margin: 0,
                  height: 75,
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={{ textAlign: "center" }}>Mala calidad de servicio</Text>
            </View>
            <View
              style={[
                defaultStyles.card,
                {
                  width: "45%",
                  margin: 0,
                  height: 75,
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={{ textAlign: "center" }}>Otro</Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "mon-sb",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            ¿Cómo fue tu experiencia?
          </Text>
          <TextInput
            multiline
            numberOfLines={10}
            // style={styles.input}
            placeholder="¿Estás conforme con el trabajo realizado? ¿El trabajo cumplió con tus expectativas?"
            // onChangeText={(text) => setBio(text)}
            // value={bio}
            style={{
              height: 100,
              margin: 12,
              borderWidth: 1,
              textAlignVertical: "top",
              width: "100%",
              marginHorizontal: 0,
              padding: 10,
            }}
          />
          <PrimaryButton text="Enviar valoración" onPress={() => {}} />
        </View>
      </ScrollView>
    </>
  );
};

export default LeaveReviewScreen;

const styles = StyleSheet.create({});
