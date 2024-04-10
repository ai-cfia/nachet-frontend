import axios from "axios";
import { AzureAPIError } from "./error";
import { ApiModelData, Images } from "./types";
import { SetStateAction } from "react";

const handleAxios = async <T>(request: {
  method: string;
  url: string;
  headers: { [label: string]: string };
  data: any;
}): Promise<T> => {
  const data = await axios(request)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new AzureAPIError(response.data);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw new AzureAPIError(error.response.data);
      } else if (error.request) {
        console.log(error.request);
        throw new AzureAPIError(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw new AzureAPIError(error.config);
    });
  return data;
};

export const readAzureStorageDir = async (
  backendUrl: string,
  uuid: string,
): Promise<void> => {
  const request = {
    method: "post",
    url: `${backendUrl}/dir`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      container_name: uuid,
    },
  };
  return handleAxios(request);
};

export const createAzureStorageDir = async (
  backendUrl: string,
  uuid: string,
  folderName: string,
): Promise<void> => {
  const request = {
    method: "post",
    url: `${backendUrl}/create-dir`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      container_name: uuid,
      folder_name: folderName,
    },
  };
  return handleAxios(request);
};

export const deleteAzureStorageDir = async (
  backendUrl: string,
  uuid: string,
  folderName: string,
): Promise<void> => {
  const request = {
    method: "post",
    url: `${backendUrl}/del`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      container_name: uuid,
      folder_name: folderName,
    },
  };
  return handleAxios(request);
};

export const inferenceRequest = async (
  backendUrl: string,
  selectedModel: string,
  imageObject: Images,
  curDir: string,
  uuid: string,
): Promise<ApiModelData[]> => {
  const request = {
    method: "post",
    url: `${backendUrl}/inf`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      model_name: selectedModel,
      image: imageObject.src,
      imageDims: imageObject.imageDims,
      folder_name: curDir,
      container_name: uuid,
    },
  };
  return handleAxios<ApiModelData[]>(request);
};

export const fetchModelMetadata = async (
  backendUrl: string,
): Promise<SetStateAction<never[]>> => {
  const request = {
    method: "get",
    url: `${backendUrl}/model-endpoints-metadata`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: {},
  };
  return handleAxios<SetStateAction<never[]>>(request);
};
