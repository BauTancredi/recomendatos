import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Link, Stack, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import * as z from "zod";

import ControlledInput from "@/components/inputs/ControlledInput";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

// [x] Cambiar foto
// [x] Guardar cambios
// [x] Cambiar contraseña
// [x] Labels
// [x] Guardar
// [x] Contraseña
// [x] Confirmar eliminar foto
// [X] Toast perfil actualizado
// [x] Spinner
// [] Limpiar

type FormData = {
  firstName: string;
  lastName: string;
};

const schema = z.object({
  firstName: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "El nombre es requerido"),
  lastName: z.string({
    required_error: "El apellido es requerido",
    invalid_type_error: "Name must be a string",
  }),
});

const EditUserProfileScreen = () => {
  const { user } = useUser();
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["32%"], []);
  const areaCode = user?.phoneNumbers![0].phoneNumber.slice(0, 3);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName!,
      lastName: user?.lastName!,
    },
    mode: "onChange",
  });

  const processImage = async (uri: string) => {
    try {
      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const base64Prefix = "data:image/png;base64,";
      return base64Image.startsWith(base64Prefix) ? base64Image : base64Prefix + base64Image;
    } catch (error) {
      console.error("Error processing image: ", error);
      alert("Error processing the image.");
    }
  };

  const launchGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const finalBase64Image = await processImage(result.assets[0].uri);
        user?.setProfileImage({ file: finalBase64Image! });
      }
    } catch (error) {
      console.error("Error launching gallery: ", error);
      alert("Failed to open gallery.");
    } finally {
      bottomSheetRef.current?.close();
    }
  };

  const launchCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const finalBase64Image = await processImage(result.assets[0].uri);
        user?.setProfileImage({ file: finalBase64Image! });
      }
    } catch (error) {
      console.error("Error launching camera: ", error);
      alert("Failed to open camera.");
    } finally {
      bottomSheetRef.current?.close();
    }
  };

  const deletePhoto = () => {
    Alert.alert(
      "Confirm Delete", // Alert Title
      "Are you sure you want to delete this photo?", // Alert Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            try {
              user?.setProfileImage({ file: null });
            } catch (error) {
              console.error("Error deleting photo: ", error);
            } finally {
              bottomSheetRef.current?.close();
            }
          },
        },
      ]
    );
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
    ),
    []
  );

  // Function to handle saving changes
  const saveChanges = async (data: FormData) => {
    try {
      await user?.update({
        firstName: data.firstName,
        lastName: data.lastName,
      });

      Toast.show("Tu perfil ha sido actualizado", {
        duration: Toast.durations.SHORT,
        position: -100,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      router.back();
    } catch (error: any) {
      console.error("Error saving changes: ", error.errors[0].message);
    }
  };

  return (
    <>
      <Spinner visible={isSubmitting} />
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title="Guardar"
              onPress={handleSubmit(saveChanges)}
              disabled={!isDirty || !isValid}
            />
          ),
        }}
      />
      <View style={[defaultStyles.container, { alignItems: "center", gap: 20 }]}>
        <View style={{ position: "relative" }}>
          <Image style={styles.profileImage} source={{ uri: user?.imageUrl }} />
          <View style={styles.editIconContainer}>
            <Ionicons
              name="pencil"
              size={18}
              color="grey"
              onPress={() => {
                bottomSheetRef.current?.expand();
              }}
            />
          </View>
        </View>
        <View
          style={{
            gap: 5,
            width: "100%",
          }}
        >
          <Text>Nombre</Text>
          <ControlledInput
            control={control}
            name="firstName"
            placeholder="Nombre"
            errors={errors}
            style={styles.input}
          />
        </View>
        <View
          style={{
            gap: 5,
            width: "100%",
          }}
        >
          <Text>Apellido</Text>
          <ControlledInput
            control={control}
            name="lastName"
            placeholder="Apellido"
            errors={errors}
            style={styles.input}
          />
        </View>
        <View
          style={{
            gap: 5,
            width: "100%",
            // alignItems: "flex-start",
            // marginHorizontal: "auto",
          }}
        >
          <Text>E-mail</Text>
          <TextInput
            style={[styles.input, { color: "grey" }]}
            defaultValue={user?.emailAddresses![0].emailAddress}
            editable={false}
          />
        </View>

        {user?.passwordEnabled && (
          <View
            style={{
              gap: 5,
              width: "100%",
              // alignItems: "flex-start",
              // marginHorizontal: "auto",
            }}
          >
            <Text>Contraseña</Text>
            <TextInput
              style={[styles.input, { color: "grey" }]}
              defaultValue="********"
              editable={false}
            />
            <TouchableOpacity
              onPress={() => {
                alert("Cambiar contraseña");
              }}
              style={{ alignSelf: "flex-end" }}
            >
              <Link href="/change-password" asChild>
                <Text>Cambiar contraseña</Text>
              </Link>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            gap: 5,
            // width: "100%",
            // alignItems: "flex-start",
            // marginHorizontal: "auto",
          }}
        >
          <Text>Teléfono</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              width: "100%",
            }}
          >
            <TextInput
              style={[styles.input, { width: "25%", color: "grey" }]}
              defaultValue={`🇦🇷 ${areaCode}`}
              editable={false}
            />
            <TextInput
              style={[styles.input, { flex: 1, color: "grey" }]}
              defaultValue={user?.phoneNumbers![0].phoneNumber.slice(3)}
              editable={false}
            />
          </View>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
        >
          <View
            style={{
              alignItems: "flex-start",
              gap: 20,
              marginVertical: 20,
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>Editar foto de perfil </Text>
            <TouchableOpacity
              onPress={launchCamera}
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons name="camera" size={24} color="black" />
              <Text>Tomar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={launchGallery}
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons name="image" size={24} color="black" />
              <Text>Seleccionar de la galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={deletePhoto}
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              disabled={!user?.hasImage}
            >
              <Ionicons name="trash" size={24} color={!user?.hasImage ? "grey" : Colors.error} />
              <Text style={{ color: !user?.hasImage ? "grey" : Colors.error }}>Eliminar foto</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </>
  );
};

export default EditUserProfileScreen;

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fdffff",
    padding: 5,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
