import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RadioButtonStyles } from "./RadioButton.styles";
import { RadioButtonProps } from "./types";

const RadioButton = ({
  options,
  selectedValue,
  onValueChange,
}: RadioButtonProps) => {
  return (
    <>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={RadioButtonStyles.radioButton}
          onPress={() => onValueChange(option)}
        >
          <View style={RadioButtonStyles.radioCircle}>
            {selectedValue === option && (
              <View style={RadioButtonStyles.selectedRb} />
            )}
          </View>
          <Text style={RadioButtonStyles.radioText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default RadioButton;
