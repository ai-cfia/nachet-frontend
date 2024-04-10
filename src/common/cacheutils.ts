import React from "react";
import UTIF from "utif";
import { BlobError, DecodeError, FetchError, ValueError } from "../common";
import { DecodedTiff } from "../hooks/useDecoderTiff";
import { ApiModelData, Images, LabelOccurrences } from "./types";

const drawBoxes = (
  imageData: Images,
  selectedLabel: string,
  labelOccurrences: LabelOccurrences,
  switchTable: boolean,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): void => {
  if (!imageData.annotated) {
    return;
  }
  imageData.classifications.forEach((prediction, index) => {
    if (prediction === selectedLabel || selectedLabel === "all") {
      const bottomY = imageData.boxes[index].bottomY;
      const topY = imageData.boxes[index].topY;
      const bottomX = imageData.boxes[index].bottomX;
      const topX = imageData.boxes[index].topX;
      ctx.beginPath();
      // draw label index
      ctx.font = "bold 0.9vw Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      Object.keys(labelOccurrences).forEach((key, labelIndex) => {
        const scorePercentage = (imageData.scores[index] * 100).toFixed(0);
        // check to see if label is cut off by the canvas edge, if so, move it to the bottom of the bounding box
        const xValue = (bottomX - topX) / 2 + topX;
        let yValue = topY - 8;
        if (topY <= 40) {
          yValue = bottomY + 23;
        }
        if (prediction === key) {
          if (switchTable) {
            ctx.fillText(
              `[${labelIndex + 1}] - ${scorePercentage}%`,
              xValue,
              yValue,
            );
          } else {
            ctx.fillText(`[${index + 1}]`, xValue, yValue);
          }
        }
      });
      // draw bounding box
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.rect(topX, topY, bottomX - topX, bottomY - topY);
      ctx.stroke();
      ctx.closePath();
    }
    // capture label in bottom left
    ctx.beginPath();
    ctx.font = "bold 0.9vw Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "#4ee44e";
    ctx.fillText(`Capture ${imageData.index}`, 10, canvas.height - 15);
    ctx.stroke();
    ctx.closePath();
  });
};

export const drawImage = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  imageSrc: string,
): Promise<void> => {
  const image = new Image();
  image.src = imageSrc;
  await image.decode();
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);
};

export const drawTiff = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  decodedTiff: DecodedTiff,
): void => {
  const { rgba, width, height } = decodedTiff;
  if (width === 0 || height === 0) {
    return;
  }
  canvas.width = width;
  canvas.height = height;
  const imgd = ctx.createImageData(width, height);
  for (let i = 0; i < rgba.length; i += 1) {
    imgd.data[i] = rgba[i];
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(imgd, 0, 0);
};

export const loadToCanvas = async (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  decodedTiff: DecodedTiff,
  imageData: Images,
  selectedLabel: string,
  labelOccurrences: any,
  switchTable: boolean,
): Promise<void> => {
  // loads the current image to the canvas and draws the bounding boxes and labels,
  // should update whenever a change is made to the image cache or the score threshold and the selected label is changed
  const canvas: HTMLCanvasElement | null = canvasRef.current;
  if (canvas === null) {
    return;
  }
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  if (ctx === null) {
    return;
  }

  if (imageData.src.includes("image/tiff")) {
    drawTiff(canvas, ctx, decodedTiff);
  } else {
    await drawImage(canvas, ctx, imageData.src);
  }
  drawBoxes(
    imageData,
    selectedLabel,
    labelOccurrences,
    switchTable,
    canvas,
    ctx,
  );
};

export const fetchArrayBuffer = async (
  imageSrc: string,
): Promise<ArrayBuffer> => {
  const file = await fetch(imageSrc)
    .then(async (res) => {
      if (!res.ok) {
        throw new FetchError("decodeTiff - Failed to fetch TIFF file");
      }
      return await res.blob();
    })
    .then(async (blob) => {
      if (blob.size === 0) {
        throw new BlobError("decodeTiff - Invalid blob size from api");
      }
      return new File([blob], "file", { type: "image/tiff" });
    });
  return await file.arrayBuffer();
};

export const utifToRGBA = (bytes: ArrayBuffer): DecodedTiff => {
  // Decode image
  const ifds = UTIF.decode(bytes);
  if (ifds.length === 0) {
    throw new DecodeError("decodeTiff - Failed to decode TIFF array");
  }
  UTIF.decodeImage(bytes, ifds[0]);
  if (ifds[0].width < 1 || ifds[0].height < 1 || ifds[0].data.length === 0) {
    throw new DecodeError("decodeTiff - Invalid image size or data");
  }
  const rgba = UTIF.toRGBA8(ifds[0]);
  if (rgba.length === 0) {
    throw new DecodeError("decodeTiff - Failed to convert TIFF to RGBA");
  }
  return {
    rgba,
    width: ifds[0].width,
    height: ifds[0].height,
  };
};

export const decodeTiff = async (imageSrc: string): Promise<DecodedTiff> => {
  let decodedTiff = {
    rgba: new Uint8Array(0),
    width: 0,
    height: 0,
  };
  if (imageSrc === "" || imageSrc == null || !imageSrc.includes("image/tiff")) {
    return decodedTiff;
  }
  try {
    // Convert base64 to bytes
    const bytes = await fetchArrayBuffer(imageSrc);
    const { rgba, width, height } = utifToRGBA(bytes);

    decodedTiff = {
      rgba,
      width,
      height,
    };
  } catch (error) {
    console.error("Error in decodeTiff - ", error);
  }
  return decodedTiff;
};

export const getImageDims = async (src: string): Promise<number[]> => {
  if (src.includes("image/tiff")) {
    return decodeTiff(src).then((decodedTiff) => {
      return [decodedTiff.width, decodedTiff.height];
    });
  } else {
    const image = new Image();
    image.src = src;
    return new Promise((resolve) => {
      image.onload = () => {
        resolve([image.width, image.height]);
      };
    });
  }
};

export const nextCacheIndex = (
  imageIndex: number,
  imageCache: Images[],
): number => {
  if (imageIndex < 0) {
    throw new ValueError("Image index is less than 0");
  }
  return imageCache.length > 0
    ? imageCache[imageCache.length - 1].index + 1
    : imageIndex + 1;
};

export const loadCaptureToCache = async (
  src: string,
  imageCache: Images[],
  index: number,
): Promise<Images[]> => {
  if (src === "") {
    throw new ValueError("Image source is empty");
  }
  return getImageDims(src).then((dims) => {
    const newCache = [
      ...imageCache,
      {
        index: index,
        src,
        scores: [],
        classifications: [],
        boxes: [],
        annotated: false,
        imageDims: dims,
        overlapping: [],
        overlappingIndices: [],
        topN: [],
      },
    ];

    return newCache;
  });
};

export const loadResultsToCache = (
  inferenceData: ApiModelData,
  imageCache: Images[],
  imageIndex: number,
): Images[] => {
  // amends the image cache given an image index, with the inference data
  // which is received from the server
  const newCache = [...imageCache];
  const topN = inferenceData.boxes.map((box) => box.topN);
  const index = newCache.findIndex((item) => item.index === imageIndex);
  if (index !== -1) {
    newCache[index] = {
      ...newCache[index],
      scores: inferenceData.boxes.map((box) => box.score),
      classifications: inferenceData.boxes.map((box) => box.label),
      boxes: inferenceData.boxes.map((box) => box.box),
      overlapping: inferenceData.boxes.map((box) => box.overlapping),
      overlappingIndices: inferenceData.boxes.map(
        (box) => box.overlappingIndices,
      ),
      topN,
      annotated: true,
    };
  }

  return newCache;
};

export const getLabelOccurrence = (
  image: Images,
  scoreThreshold: number,
): LabelOccurrences => {
  if (image == null) {
    throw new ValueError("Image object is null");
  }
  if (
    image.annotated &&
    (image.scores == null || image.classifications == null)
  ) {
    throw new ValueError("Image object is missing scores and classifications");
  }
  // gets the number of occurences of each label in the current
  // image based on score threshold and seed label selection in classification results
  const result: LabelOccurrences = {};

  if (image.annotated) {
    image.scores.forEach((score: number, index: number) => {
      if (score * 100 >= scoreThreshold) {
        const label: string = image.classifications[index];
        if (result[label] !== undefined) {
          result[label] = result[label] + 1;
        } else {
          result[label] = 1;
        }
      }
    });
  }

  return result;
};
