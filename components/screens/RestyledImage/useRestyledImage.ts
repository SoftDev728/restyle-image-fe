import { Animated } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useGetRestyleImageStatusQuery } from "@/services/restyleImage.service";
import { useAppSelector } from "@/store";

const useResultImage = () => {
  const router = useRouter();

  const fadeAnim = useState(new Animated.Value(0))[0];

  //region: states
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<
    string | null
  >(null);
  const [restyledImageUrl, setRestyledImageUrl] = useState<string | null>(null);

  const taskId = useAppSelector((state) => state.resultImage.taskId);

  const { data: restyledImageStatusData } = useGetRestyleImageStatusQuery(
    { taskId },
    {
      pollingInterval: 3000,
      skipPollingIfUnfocused: true,
      skip: !taskId || !!restyledImageUrl,
    }
  );

  const animateErrorMessage = (
    callback: Dispatch<SetStateAction<string | null>>
  ) => {
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
      }).start(() => callback(""));
    }, 3000);
  };

  const saveFile = async (fileUri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync("Download");
        if (album == null) {
          await MediaLibrary.createAlbumAsync("Download", asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        setDownloadSuccessMessage("Image Successfaully Downloaded!");
        animateErrorMessage(setDownloadSuccessMessage);
      } catch (err) {
        setError("Failed to save image. Please try again");
        animateErrorMessage(setError);
      }
    } else if (status === "denied") {
      alert("please allow permissions to download");
    }
  };

  const handleDownloadImage = async () => {
    if (!restyledImageUrl) return;
    try {
      setIsDownloading(true);

      let fileUri = FileSystem.documentDirectory + `${new Date()}.jpg`;

      try {
        const res = await FileSystem.downloadAsync(restyledImageUrl, fileUri);
        saveFile(res.uri);
      } catch (err) {
        setError("Failed to download image. Please try again");
        animateErrorMessage(setError);
      }
    } catch (error: any) {
      setError("Failed to download image. Please try again");
      animateErrorMessage(setError);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (
      restyledImageStatusData?.data?.generatedImageUrl &&
      restyledImageStatusData?.data?.status === "completed"
    ) {
      setRestyledImageUrl(restyledImageStatusData?.data?.generatedImageUrl);
    }
  }, [restyledImageStatusData]);

  return {
    error,
    isDownloading,
    router,
    fadeAnim,
    restyledImageUrl,
    downloadSuccessMessage,
    imageStatus: restyledImageStatusData?.data?.status,
    handleDownloadImage,
  };
};

export default useResultImage;
