import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import useImageUpload from "./useImageUpload";
import { UPLOAD_IMAGE_CONTENT } from "./constants";
import { HomeStyles } from "./Home.styles";
import Button from "@/components/common/Button";
import StyleCardList from "@/components/common/StyleCardList";

const styleOptions = [
  {
    id: "anime",
    label: "Anime",
    icon: <FontAwesome5 name="paint-brush" size={32} color="#fff" />,
    gradient: ["#ff6b6b", "#ff8e8e"],
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    icon: <Ionicons name="hardware-chip" size={32} color="#fff" />,
    gradient: ["#6e45e2", "#88d3ce"],
  },
  {
    id: "cartoon",
    label: "Cartoon",
    icon: <MaterialIcons name="color-lens" size={32} color="#fff" />,
    gradient: ["#00a896", "#007a6e"],
  },
  {
    id: "pixelart",
    label: "Pixel Art",
    icon: <MaterialIcons name="grid-on" size={32} color="#fff" />,
    gradient: ["#ffbe0b", "#fb5607"],
  },
];

const Home = () => {
  const {
    spin,
    image,
    selectedStyle,
    isProcessing,
    fadeAnim,
    error,
    pickImage,
    processImage,
    onChangeStyle,
  } = useImageUpload();

  return (
    <>
      <Stack.Screen
        options={{
          title: UPLOAD_IMAGE_CONTENT.SCREEN_TITLE,
        }}
      />
      {error && (
        <Animated.View
          style={[HomeStyles.errorContainer, { opacity: fadeAnim }]}
        >
          <MaterialIcons name="error-outline" size={24} color="#fff" />
          <Text style={HomeStyles.errorText}>{error}</Text>
        </Animated.View>
      )}
      <ScrollView style={HomeStyles.container}>
        <View style={HomeStyles.header}>
          <Text style={HomeStyles.title}>
            {UPLOAD_IMAGE_CONTENT.WELCOME_TXT}
          </Text>
          <Text style={HomeStyles.subtitle}>
            {UPLOAD_IMAGE_CONTENT.DESCRIPTION_TXT}
          </Text>
        </View>
        <View style={HomeStyles.previewContainer}>
          {image ? (
            <Image source={{ uri: image }} style={HomeStyles.previewImage} />
          ) : (
            <View style={HomeStyles.previewPlaceholder}>
              <MaterialIcons
                name="add-photo-alternate"
                size={60}
                color="#a0a0c0"
              />
              <Text style={HomeStyles.previewPlaceholderText}>
                {UPLOAD_IMAGE_CONTENT.NO_IMAGE_TXT}
              </Text>
            </View>
          )}
        </View>
        <Button
          iconName="cloud-upload"
          onPress={pickImage}
          label={UPLOAD_IMAGE_CONTENT.UPLOAD_BTN_LABEL}
        />

        <View style={HomeStyles.styleContainer}>
          <Text style={HomeStyles.styleTitle}>
            {UPLOAD_IMAGE_CONTENT.RADIO_BTN_LABEL}
          </Text>
          <StyleCardList
            styleOptions={styleOptions}
            onChangeStyle={onChangeStyle}
            selectedStyle={selectedStyle}
          />
        </View>

        <TouchableOpacity
          style={[
            HomeStyles.uploadButton,
            { opacity: selectedStyle && image ? 1 : 0.5 },
          ]}
          onPress={processImage}
          disabled={!selectedStyle || !image || isProcessing}
        >
          {isProcessing ? (
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <MaterialIcons name="autorenew" size={24} color="#fff" />
            </Animated.View>
          ) : (
            <MaterialIcons name="style" size={24} color="#fff" />
          )}
          <Text style={HomeStyles.uploadButtonText}>
            {isProcessing ? "Processing..." : "Transform Image"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Home;
