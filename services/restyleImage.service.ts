import apiSlice from "./api";
import { RestyleImageRequest, RestyleImageResponse } from "./types";

const restyleImageServices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    restyleImage: builder.mutation<RestyleImageResponse, RestyleImageRequest>({
      query: ({ imageUri, imageStyle }) => {
        const formData = new FormData();

        formData.append("userSelfie", imageUri);
        formData.append("style", imageStyle);

        return {
          url: "/restyle-image",
          method: "POST",
          body: formData,
        };
      },
    }),
    getRestyleImageStatus: builder.query<any, { taskId?: string }>({
      query: ({ taskId }) => ({
        url: `/restyle-image/${taskId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useRestyleImageMutation, useGetRestyleImageStatusQuery } =
  restyleImageServices;
