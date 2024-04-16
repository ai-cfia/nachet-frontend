import axios from "axios";
import { AzureAPIError, ValueError } from "./error";
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
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        throw new AzureAPIError(error.response.data);
      } else if (error.request) {
        console.error(error.request);
        throw new AzureAPIError(error.request);
      } else {
        console.error("Error", error.message);
      }
      console.error(error.config);
      throw new AzureAPIError(error.config);
    });
  return data;
};

export const readAzureStorageDir = async (
  backendUrl: string,
  uuid: string,
): Promise<void> => {
  if (backendUrl === "" || backendUrl == null) {
    throw new ValueError("Backend URL is null or empty");
  }
  if (uuid === "" || uuid == null) {
    throw new ValueError("UUID is null or empty");
  }
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
  if (backendUrl === "" || backendUrl == null) {
    throw new ValueError("Backend URL is null or empty");
  }
  if (uuid === "" || uuid == null) {
    throw new ValueError("UUID is null or empty");
  }
  if (folderName === "" || folderName == null) {
    throw new ValueError("Folder name is null or empty");
  }
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
  if (backendUrl === "" || backendUrl == null) {
    throw new ValueError("Backend URL is null or empty");
  }
  if (uuid === "" || uuid == null) {
    throw new ValueError("UUID is null or empty");
  }
  if (folderName === "" || folderName == null) {
    throw new ValueError("Folder name is null or empty");
  }
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
  if (backendUrl === "" || backendUrl == null) {
    throw new ValueError("Backend URL is null or empty");
  }
  if (selectedModel === "" || selectedModel == null) {
    throw new ValueError("Model is null or empty");
  }
  if (imageObject.src === "" || imageObject.src == null) {
    throw new ValueError("Image is null or empty");
  }
  if (curDir === "" || curDir == null) {
    throw new ValueError("Directory is null or empty");
  }
  if (uuid === "" || uuid == null) {
    throw new ValueError("UUID is null or empty");
  }
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

export const fetchModelMetadata = async (backendUrl: string): Promise<any> => {
  if (backendUrl === "" || backendUrl == null) {
    throw new ValueError("Backend URL is null or empty");
  }
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
