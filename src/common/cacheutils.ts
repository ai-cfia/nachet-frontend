import React from "react";
import { DecodedTiff } from "../hooks/useDecoderTiff";
import { ApiModelData, Images, LabelOccurrences } from "./types";

export const loadToCanvas = async (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  imageSrc: string,
  decodedTiff: DecodedTiff,
  imageCache: Images[],
  imageIndex: number,
  scoreThreshold: number,
  selectedLabel: string,
  labelOccurrences: any,
  switchTable: boolean,
): Promise<void> => {
  // loads the current image to the canvas and draws the bounding boxes and labels,
  // should update whenever a change is made to the image cache or the score threshold and the selected label is changed
  let imgWidth = 0;
  let imgHeight = 0;
  const canvas: HTMLCanvasElement | null = canvasRef.current;
  if (canvas === null) {
    return;
  }
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  if (ctx === null) {
    return;
  }

  if (imageSrc.includes("image/tiff")) {
    const { rgba, width, height } = decodedTiff;
    if (width === 0 || height === 0) {
      return;
    }
    imgWidth = width;
    imgHeight = height;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const imgd = ctx.createImageData(imgWidth, imgHeight);
    for (let i = 0; i < rgba.length; i += 1) {
      imgd.data[i] = rgba[i];
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imgd, 0, 0);
  } else {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      imgWidth = image.width;
      imgHeight = image.height;
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
    };
  }
  imageCache.forEach((storedImage) => {
    // find the current image in the image cache based on current index
    if (storedImage.index === imageIndex && storedImage.annotated) {
      storedImage.classifications.forEach((prediction, index) => {
        // !storedImage.overlapping[index]     REMOVE THIS TO SHOW ONLY 1 BB
        if (
          storedImage.scores[index] >= scoreThreshold / 100 &&
          (prediction === selectedLabel || selectedLabel === "all")
        ) {
          const bottomY = storedImage.boxes[index].bottomY;
          const topY = storedImage.boxes[index].topY;
          const bottomX = storedImage.boxes[index].bottomX;
          const topX = storedImage.boxes[index].topX;
          ctx.beginPath();
          // draw label index
          ctx.font = "bold 0.9vw Arial";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          Object.keys(labelOccurrences).forEach((key, labelIndex) => {
            const scorePercentage = (storedImage.scores[index] * 100).toFixed(
              0,
            );
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
      });
    }
    // capture label in bottom left
    if (storedImage.index === imageIndex) {
      storedImage.imageDims = [imgWidth, imgHeight];
      ctx.beginPath();
      ctx.font = "bold 0.9vw Arial";
      ctx.textAlign = "left";
      ctx.fillStyle = "#4ee44e";
      ctx.fillText(`Capture ${storedImage.index}`, 10, canvas.height - 15);
      ctx.stroke();
      ctx.closePath();
    }
  });
};

export const nextCacheIndex = (
  imageIndex: number,
  imageCache: Images[],
): number => {
  return imageCache.length > 0
    ? imageCache[imageCache.length - 1].index + 1
    : imageIndex + 1;
};

export const loadCaptureToCache = (
  src: string,
  imageCache: Images[],
  index: number,
): Images[] => {
  const newCache = [
    ...imageCache,
    {
      index: index,
      src,
      scores: [],
      classifications: [],
      boxes: [],
      annotated: false,
      imageDims: [],
      overlapping: [],
      overlappingIndices: [],
      topN: [],
    },
  ];

  return newCache;
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
  imageCache: Images[],
  imageIndex: number,
  scoreThreshold: number,
): LabelOccurrences => {
  // gets the number of occurences of each label in the current
  // image based on score threshold and seed label selection in classification results
  const result: LabelOccurrences = {};
  imageCache.forEach((object) => {
    if (object.index === imageIndex && object.annotated === true) {
      object.scores.forEach((score: number, index: number) => {
        if (score * 100 >= scoreThreshold) {
          const label: string = object.classifications[index];
          if (result[label] !== undefined) {
            result[label] = result[label] + 1;
          } else {
            result[label] = 1;
          }
        }
      });
    }
  });
  return result;
};
