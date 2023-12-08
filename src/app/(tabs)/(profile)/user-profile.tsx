import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons, Entypo } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import React, { useRef } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Chip from "@/components/aux/Chip";
import EditProfileBottomSheet from "@/components/bottom/EditProfileBottomSheet";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ImageCarousel from "@/components/carousel/ImageCarousel";
import { UserCard, ProviderCard, UserSettings } from "@/components/profile";
import StatsContainer from "@/components/profile/StatsContainer";
import SectionSubtitle from "@/components/text/SectionSubtitle";
import SectionTitle from "@/components/text/SectionTitle";
import { defaultStyles } from "@/constants/Styles";
import useProviderQuery from "@/hooks/useProviderQuery";

const UserProfileScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const isProvider = user?.unsafeMetadata.isProvider;

  const menuItems = [
    {
      title: "Editar Perfil",
      icon: <Ionicons name="person-circle-outline" size={24} color="black" />,
      onPress: () => {
        router.push("/edit-user-profile");
      },
    },
    {
      title: "Configuración",
      icon: <Ionicons name="settings-outline" size={24} color="black" />,
      onPress: () => {
        router.push("/user-settings");
      },
    },
    {
      title: "Quiero ser proveedor",
      icon: <Entypo name="tools" size={24} color="black" />,
      onPress: () => {
        console.log("Quiero ser proveedor");
      },
    },
    {
      title: "Dudas y sugerencias",
      icon: <Ionicons name="mail-outline" size={24} color="black" />,
      onPress: () => {
        Linking.openURL("whatsapp://send?text=putoelquelee&phone=5491128320754");
      },
    },
    {
      title: "Cerrar sesión",
      icon: <Ionicons name="log-out-outline" size={24} color="black" />,
      onPress: () => {
        signOut();
      },
    },
  ];

  const {
    data,
    // , isLoading, isError
  } = useProviderQuery(user?.id!);

  return (
    <>
      {!isProvider ? (
        <ProviderProfile
          user={user}
          menuItems={menuItems}
          data={data}
          bottomSheetRef={bottomSheetRef}
        />
      ) : (
        <UserProfile user={user} menuItems={menuItems} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  workImage: {
    width: 150,
    height: 200,
    borderRadius: 15,
  },
  directionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // padding: 10,
  },
  locationsContainer: {
    width: "100%",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    backgroundColor: "white",
  },
  bioInput: {
    flexGrow: 1,
    minHeight: 60,
    maxHeight: 200,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    fontFamily: "mon",
    fontSize: 14,
  },
});

export default UserProfileScreen;

const UserProfile = ({ user, menuItems }: { user: any; menuItems: any }) => {
  return (
    <View style={[defaultStyles.container, { alignItems: "center", gap: 10 }]}>
      <UserCard user={user} />
      <UserSettings menuItems={menuItems} />
    </View>
  );
};

const ProviderProfile = ({
  user,
  menuItems,
  data,
  bottomSheetRef,
}: {
  user: any;
  menuItems: any;
  data: any;
  bottomSheetRef: any;
}) => {
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current?.expand();
                }}
              >
                <Ionicons name="ellipsis-horizontal" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />

      <ScrollView
        style={[
          defaultStyles.container,
          // {paddingHorizontal: 0}
        ]}
        contentContainerStyle={{
          alignItems: "center",
          gap: 20,
          paddingBottom: 40,
        }}
      >
        <ProviderCard user={user} />

        <View style={styles.buttonContainer}>
          <PrimaryButton
            text="Editar Perfil"
            onPress={() => {
              // router.push("/edit-user-profile");
            }}
            styles={{
              width: "49%",
              marginTop: 0,
            }}
          />
          <PrimaryButton
            text="Compartir Perfil"
            onPress={() => {
              // router.push("/edit-user-profile");
            }}
            styles={{
              width: "49%",
              marginTop: 0,
            }}
          />
        </View>

        <StatsContainer />

        {data?.data.type !== "shop" && (
          <View
            style={{
              width: "100%",
            }}
          >
            <SectionTitle title="Dirección" />
            <View style={styles.directionContainer}>
              <Ionicons name="location-outline" size={16} color="black" />
              <Text
                style={{
                  fontFamily: "mon",
                  fontSize: 14,
                }}
              >
                Bolivar 624, Tigre
              </Text>
            </View>
          </View>
        )}

        <ImageCarousel carouselTitle="Trabajos Realizados" imageStyles={styles.workImage} />

        {data?.data.type !== "shop" && (
          <View style={styles.locationsContainer}>
            <SectionTitle title="Localidades" />
            <View style={{ gap: 10 }}>
              <View>
                <SectionSubtitle title="Zona Norte" />
                <View style={styles.chipsContainer}>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <Chip key={index} title="Tigre" />
                  ))}
                </View>
              </View>
              <View>
                <SectionSubtitle title="Zona Oeste" />
                <View style={styles.chipsContainer}>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <Chip key={index} title="Tigre" />
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        <View
          style={{
            width: "100%",
          }}
        >
          <SectionTitle title="Biografia" />
          <TextInput multiline style={styles.bioInput} value={data?.data.bio} editable={false} />
        </View>
      </ScrollView>
      <EditProfileBottomSheet ref={bottomSheetRef} menuItems={menuItems} user={user} />
    </>
  );
};
