import { useUser } from "@clerk/clerk-expo";
import BottomSheet from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { Link, Stack, useRouter } from "expo-router";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  Keyboard,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import * as z from "zod";

import ImagePickerBottomSheet from "@/components/bottom/ImagePickerBottomSheet";
import ControlledInput from "@/components/inputs/ControlledInput";
import ProfileImage from "@/components/profile/ProfileImage";
import { defaultStyles } from "@/constants/Styles";
import { processImage } from "@/utils/image";

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

  // Function to handle saving changes
  const saveChanges = async (data: FormData) => {
    Keyboard.dismiss();
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
        <ProfileImage user={user} bottomSheetRef={bottomSheetRef} />
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
        <ImagePickerBottomSheet
          ref={bottomSheetRef}
          user={user}
          launchCamera={launchCamera}
          launchGallery={launchGallery}
          deletePhoto={deletePhoto}
        />
      </View>
    </>
  );
};

export default EditUserProfileScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
