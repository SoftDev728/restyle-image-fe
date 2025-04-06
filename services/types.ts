export type RestyleImageRequest = {
  imageUri: any;
  imageStyle: string;
};

export type StatusType = "pending" | "processing" | "failed";

export type RestyleImageResponse = {
  data: { status: StatusType; taskId: string };
  message: string;
  success: boolean;
  error?: any;
};

export type RestyleImageStatusResponse = {
  data: {
    generatedImageUrl: string | null;
    status: StatusType;
    taskId: string;
  };
  message: string;
  success: boolean;
};
