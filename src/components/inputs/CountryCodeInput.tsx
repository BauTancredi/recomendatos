import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CountryCodeInputProps {
  country: {
    dial_code: string;
    code: string;
    flag: string;
  };
  setShow: (show: boolean) => void;
}

const CountryCodeInput: React.FC<CountryCodeInputProps> = ({ country, setShow }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setShow(true);
      }}
      style={styles.countryCodeInput}
    >
      <Text>{country.flag}</Text>
      <Text
        style={{
          fontFamily: "mon",
        }}
      >
        {country.dial_code}
      </Text>
    </TouchableOpacity>
  );
};

export default CountryCodeInput;

const styles = StyleSheet.create({
  countryCodeInput: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 5,
  },
});
