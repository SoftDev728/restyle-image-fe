import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleCardListStyles } from "./StyleCardList.styles";
import { StyleCardListProps, StyleOptionType } from "./types";

const StyleCardList = ({
  styleOptions,
  selectedStyle,
  onChangeStyle,
}: StyleCardListProps) => {
  return (
    <View style={StyleCardListStyles.styleOptions}>
      {styleOptions.map((option: StyleOptionType) => (
        <TouchableOpacity
          key={option.id}
          style={[
            StyleCardListStyles.styleOption,
            selectedStyle === option.id &&
              StyleCardListStyles.styleOptionSelected,
          ]}
          onPress={() => onChangeStyle(option.id)}
        >
          <LinearGradient
            colors={
              option.gradient as unknown as readonly [
                string,
                string,
                ...string[]
              ]
            }
            style={StyleCardListStyles.styleOptionContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={StyleCardListStyles.styleOptionIcon}>
              {option.icon}
            </View>
            <Text style={StyleCardListStyles.styleOptionLabel}>
              {option.label}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StyleCardList;
