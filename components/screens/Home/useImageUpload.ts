import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { useRestyleImageMutation } from "@/services/restyleImage.service";
import { dispatchSetTaskId } from "@/store/slices/result.slice";
import { useAppDispatch } from "@/store";

const useImageUpload = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  //region: states
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  //region: handlers
  const onChangeStyle = (value: string) => {
    setSelectedStyle(value);
  };

  //region: mutations
  const [processRestyleImage, { isLoading }] = useRestyleImageMutation();

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission denied");
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {}
  };

  const spinValue = new Animated.Value(0);

  const animateErrorMessage = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => setError(null));
    }, 3000);
  };

  const processImage = async () => {
    if (!selectedStyle || !image) return;

    setIsProcessing(true);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    try {
      let fileType = image.substring(image.lastIndexOf(".") + 1);

      const response = await processRestyleImage({
        imageUri: {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        },
        imageStyle: selectedStyle,
      });

      const parsedResponse = JSON.parse(JSON.stringify(response));

      if (parsedResponse.error) {
        setError(
          parsedResponse.error.data.message || parsedResponse.error.error
        );
        animateErrorMessage();
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
        spinValue.stopAnimation();
        dispatch(dispatchSetTaskId(response?.data?.data?.taskId));
        setError(null);
        router.navigate("/(main)/restyled-image");
      }
    } catch (err: any) {
      setError(err.data.message);
      animateErrorMessage();
      setIsProcessing(false);
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return {
    spin,
    image,
    selectedStyle,
    isProcessing,
    fadeAnim,
    error,
    pickImage,
    processImage,
    onChangeStyle,
  };
};

export default useImageUpload;
