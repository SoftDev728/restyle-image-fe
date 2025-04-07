import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonProps } from "./types";
import { ButtonStyles } from "./Button.styles";

const Button = ({
  onPress,
  iconName,
  label,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[ButtonStyles.uploadButton, { opacity: !disabled ? 1 : 0.5 }]}
      onPress={onPress}
    >
      <MaterialIcons name={iconName} size={24} color="#fff" />
      <Text style={ButtonStyles.uploadButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
