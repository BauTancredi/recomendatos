import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";

interface Country {
  dial_code: string;
  code: string;
  flag: string;
}

interface CountryCodePickerProps {
  show: boolean;
  setShow: (show: boolean) => void;
  setCountry: (country: Country) => void;
}

const CountryCodePicker: React.FC<CountryCodePickerProps> = ({ show, setShow, setCountry }) => {
  return (
    <CountryPicker
      show={show}
      pickerButtonOnPress={(item) => {
        setCountry({
          dial_code: item.dial_code,
          code: item.code,
          flag: item.flag,
        });
        setShow(false);
      }}
      lang="es"
      style={{
        modal: {
          height: 300,
        },
      }}
      showOnly={["AR"]}
      initialState="+54"
      inputPlaceholder="Busca tu pais"
    />
  );
};

export default CountryCodePicker;
