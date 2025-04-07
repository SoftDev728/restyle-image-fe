import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { RESTYLED_IMAGE_CONTENT } from "./constans";
import useRestyledImage from "./useRestyledImage";
import { RestyledImageScreenStyles } from "./RestyledImage.styles";
import { HomeStyles } from "../Home/Home.styles";
import Button from "@/components/common/Button";

const RestyledImage = () => {
  const {
    isDownloading,
    error,
    fadeAnim,
    router,
    imageStatus,
    restyledImageUrl,
    downloadSuccessMessage,
    handleDownloadImage,
  } = useRestyledImage();

  return (
    <>
      <Stack.Screen
        options={{
          title: RESTYLED_IMAGE_CONTENT.SCREEN_TITLE,
        }}
      />
      {(error || downloadSuccessMessage) && (
        <Animated.View
          style={[
            HomeStyles.errorContainer,
            downloadSuccessMessage && HomeStyles.successContainer,
            { opacity: fadeAnim },
          ]}
        >
          <MaterialIcons
            name={downloadSuccessMessage ? "check-circle" : "error-outline"}
            size={24}
            color="#fff"
          />
          <Text style={HomeStyles.errorText}>
            {error || downloadSuccessMessage}
          </Text>
        </Animated.View>
      )}
      <LinearGradient
        colors={["#1a1a2e", "#16213e"]}
        style={RestyledImageScreenStyles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={RestyledImageScreenStyles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={RestyledImageScreenStyles.headerTitle}>
            Your AI Masterpiece
          </Text>
          <View style={RestyledImageScreenStyles.headerRightSpace} />
        </View>

        {/* restyled image renders here */}
        {!restyledImageUrl && imageStatus === "failed" ? (
          <View style={RestyledImageScreenStyles.contentCenter}>
            <MaterialIcons name="error-outline" size={24} color="#FF2C2C" />
            <Text style={RestyledImageScreenStyles.errorText}>
              {RESTYLED_IMAGE_CONTENT.IMAGE_PROCCESS_FAILED}
            </Text>
          </View>
        ) : !restyledImageUrl && imageStatus === "processing" ? (
          <View style={RestyledImageScreenStyles.contentCenter}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={RestyledImageScreenStyles.imageContainer}>
            <Image
              source={{ uri: restyledImageUrl as string }}
              style={RestyledImageScreenStyles.transformedImage}
              resizeMode="stretch"
            />
          </View>
        )}

        <Button
          label={isDownloading ? "Downloading..." : "Download"}
          onPress={handleDownloadImage}
          iconName={isDownloading ? "hourglass-top" : "save-alt"}
          disabled={!restyledImageUrl}
        />
      </LinearGradient>
    </>
  );
};

export default RestyledImage;
