import { useAuth, useUser } from "@clerk/clerk-expo";
import { UserResource } from "@clerk/types";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
// import ContentLoader, { Facebook } from "react-content-loader";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ImageView from "react-native-image-viewing";
import Animated, { FadeInLeft } from "react-native-reanimated";

import Chip from "@/components/aux/Chip";
import ImageFooter from "@/components/aux/ImageFooter";
import EditProfileBottomSheet from "@/components/bottom/EditProfileBottomSheet";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ImageCarousel from "@/components/carousel/ImageCarousel";
import { UserCard, ProviderCard, UserSettings } from "@/components/profile";
import StatsContainer from "@/components/profile/StatsContainer";
// import { TextSkeleton } from "@/components/skeleton";
import SectionSubtitle from "@/components/text/SectionSubtitle";
import SectionTitle from "@/components/text/SectionTitle";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useProviderQuery } from "@/hooks/supabase";
import { MenuItem } from "@/interfaces";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

const images = [
  {
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
  {
    uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
  },
  {
    uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
  },
];

const UserProfileScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { type } = useOnboardingStore((state) => state);

  const menuItems: MenuItem[] = [
    {
      title: "Editar Perfil",
      icon: <Ionicons name="person-circle-outline" size={24} color="black" />,
      onPress: () => {
        bottomSheetRef.current?.close();
        router.push("/edit-user-profile");
      },
    },
    {
      title: "Configuración",
      icon: <Ionicons name="settings-outline" size={24} color="black" />,
      onPress: () => {
        bottomSheetRef.current?.close();
        router.push("/user-settings");
      },
    },
    {
      title: "Quiero ser proveedor",
      icon: <Entypo name="tools" size={24} color="black" />,
      onPress: () => {
        bottomSheetRef.current?.close();
        console.log("Quiero ser proveedor");
      },
    },
    {
      title: "Dudas y sugerencias",
      icon: <Ionicons name="mail-outline" size={24} color="black" />,
      onPress: () => {
        bottomSheetRef.current?.close();
        Linking.openURL("whatsapp://send?text=putoelquelee&phone=5491128320754");
      },
    },
    {
      title: "Cerrar sesión",
      icon: <Ionicons name="log-out-outline" size={24} color="black" />,
      onPress: () => {
        bottomSheetRef.current?.close();
        signOut();
      },
    },
  ];

  const { data, isLoading, isError } = useProviderQuery(user?.id!);

  return (
    <>
      {type !== "provider" ? (
        <ProviderProfile
          user={user!}
          menuItems={menuItems}
          data={data}
          bottomSheetRef={bottomSheetRef}
        />
      ) : (
        <UserProfile user={user!} menuItems={menuItems} />
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

interface UserProfileProps {
  user: UserResource;
  menuItems: MenuItem[];
}

const UserProfile: React.FC<UserProfileProps> = ({ user, menuItems }) => {
  return (
    <Animated.View
      style={[defaultStyles.container, { alignItems: "center", gap: 10 }]}
      entering={FadeInLeft}
    >
      <UserCard user={user} />
      <UserSettings menuItems={menuItems} />
    </Animated.View>
  );
};

interface ProviderProfileProps {
  user: UserResource;
  menuItems: MenuItem[];
  data: any;
  bottomSheetRef: React.RefObject<BottomSheet>;
}
const ProviderProfile: React.FC<ProviderProfileProps> = ({
  user,
  menuItems,
  data,
  bottomSheetRef,
}) => {
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [currentImageIndex, setImageIndex] = useState(0);
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

      <Animated.ScrollView
        style={[
          defaultStyles.container,
          // {paddingHorizontal: 0}
        ]}
        contentContainerStyle={{
          alignItems: "center",
          gap: 20,
          paddingBottom: 40,
        }}
        entering={FadeInLeft}
      >
        <ProviderCard user={user} />

        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderColor: Colors.grey,
            borderWidth: 1,
            width: "100%",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <FontAwesome name="star-o" size={24} color="black" />
          <Text
            style={{
              fontFamily: "mon",
              fontSize: 16,
            }}
          >
            Solicitar valoracion
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              bottomSheetRef.current?.expand();
            }}
            style={{
              borderColor: Colors.grey,
              borderWidth: 1,
              width: "49%",
              alignItems: "center",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Ionicons name="pencil" size={24} color="black" />
            <Text
              style={{
                fontFamily: "mon",
                fontSize: 16,
              }}
            >
              Editar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              bottomSheetRef.current?.expand();
            }}
            style={{
              borderColor: Colors.grey,
              borderWidth: 1,
              width: "49%",
              alignItems: "center",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="share" size={24} color="black" />
            <Text
              style={{
                fontFamily: "mon",
                fontSize: 16,
              }}
            >
              Compartir
            </Text>
          </TouchableOpacity>
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
              {/* <TextSkeleton width={300} height={30} radius={15} /> */}
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

        <ImageCarousel
          carouselTitle="Trabajos Realizados"
          imageStyles={styles.workImage}
          setIsImageViewerVisible={setIsImageViewerVisible}
          images={images}
          setImageIndex={setImageIndex}
        />

        <ImageView
          images={images}
          imageIndex={currentImageIndex}
          visible={isImageViewerVisible}
          onRequestClose={() => {
            setIsImageViewerVisible(false);
          }}
          FooterComponent={({ imageIndex }) => (
            <ImageFooter imageIndex={imageIndex} imagesCount={images.length} />
          )}
        />

        {data?.data.type !== "shop" && (
          <View style={styles.locationsContainer}>
            <SectionTitle title="Localidades" />
            <View style={{ gap: 10 }}>
              <View>
                <SectionSubtitle title="Ciudad autonoma de Buenos Aires" />
                <View style={styles.chipsContainer}>
                  {Array.from({ length: 1 }).map((_, index) => (
                    // <TextSkeleton width={100} height={30} radius={15} />
                    <Chip key={index} title="Recoleta" />
                  ))}
                </View>
              </View>
              <View>
                <SectionSubtitle title="Buenos Aires" />
                <View style={styles.chipsContainer}>
                  {Array.from({ length: 1 }).map((_, index) => (
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
      </Animated.ScrollView>
      <EditProfileBottomSheet ref={bottomSheetRef} menuItems={menuItems} />
    </>
  );
};
