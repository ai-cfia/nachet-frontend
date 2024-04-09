import axios from "axios";
import { AzureAPIError } from "./error";
import { ApiModelData } from "./types";

export const readAzureStorageDir = async (
  backendUrl: string,
  uuid: string,
): Promise<void> => {
  const data = await axios({
    method: "post",
    url: `${backendUrl}/dir`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      container_name: uuid,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new AzureAPIError(response.data);
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw new AzureAPIError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        throw new AzureAPIError(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw new AzureAPIError(error.config);
    });
  return data;
};

export const createAzureStorageDir = async (
  backendUrl: string,
  uuid: string,
  folderName: string,
): Promise<void> => {
  const data = await axios({
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
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new AzureAPIError(response.data);
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw new AzureAPIError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        throw new AzureAPIError(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw new AzureAPIError(error.config);
    });
  return data;
};

export const deleteAzureStorageDir = async (
  backendUrl: string,
  uuid: string,
  folderName: string,
): Promise<void> => {
  const data = await axios({
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
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new AzureAPIError(response.data);
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw new AzureAPIError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        throw new AzureAPIError(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw new AzureAPIError(error.config);
    });
  return data;
};

export const inferenceRequest = async (
  backendUrl: string,
  selectedModel: string,
  imageSrc: string,
  imageObject: Array<{ imageDims: number[] }>,
  curDir: string,
  uuid: string,
): Promise<ApiModelData[]> => {
  const data = await axios({
    method: "post",
    url: `${backendUrl}/inf`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      model_name: selectedModel,
      image: imageSrc,
      imageDims: [imageObject[0].imageDims[0], imageObject[0].imageDims[1]],
      folder_name: curDir,
      container_name: uuid,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new AzureAPIError(response.data);
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw new AzureAPIError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        throw new AzureAPIError(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw new AzureAPIError(error.config);
    });
  return data;
};
