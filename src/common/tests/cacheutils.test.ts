import { describe, it } from "vitest";
import { getLabelOccurrence, loadResultsToCache } from "../cacheutils";
import { ApiModelData, Images } from "../types";

describe("getLabelOccurrence", () => {
  let image = {
    index: 0,
    src: "test",
    scores: [0.1, 0.2, 0.3, 0.4, 0.5],
    classifications: ["a", "b", "c", "d", "e"],
    boxes: [],
    annotated: true,
    imageDims: { width: 0, height: 0 },
    overlapping: [],
    overlappingIndices: [],
    topN: [],
  };

  beforeEach(() => {
    image = {
      index: 0,
      src: "test",
      scores: [0.1, 0.2, 0.3, 0.4, 0.5],
      classifications: ["a", "b", "c", "d", "e"],
      boxes: [],
      annotated: true,
      imageDims: { width: 0, height: 0 },
      overlapping: [],
      overlappingIndices: [],
      topN: [],
    };
  });

  it.each([
    [
      "should return the correct label occurrence single",
      { sco: [0.1, 0.2, 0.3, 0.4, 0.5], cla: ["a", "b", "c", "d", "e"] },
      { a: 1, b: 1, c: 1, d: 1, e: 1 },
    ],
    [
      "should return the correct label occurrence multiple",
      {
        sco: [0.1, 0.2, 0.3, 0.4, 0.5, 0.1, 0.2, 0.3, 0.4, 0.5],
        cla: ["a", "b", "c", "d", "e", "a", "b", "c", "d", "e"],
      },
      { a: 2, b: 2, c: 2, d: 2, e: 2 },
    ],
    [
      "should return the correct label occurrence none",
      { sco: [], cla: [] },
      {},
    ],
    [
      "should return the correct label occurrence one",
      { sco: [0.1], cla: ["a"] },
      { a: 1 },
    ],
    [
      "should return the correct label occurrence two",
      { sco: [0.1, 0.1], cla: ["a", "a"] },
      { a: 2 },
    ],
    [
      "should return the correct label occurrence three",
      { sco: [0.1, 0.1, 0.1], cla: ["a", "a", "a"] },
      { a: 3 },
    ],
  ])(`%s`, (_, input, expected) => {
    const scoreThreshold = 0;
    image.classifications = input.cla;
    image.scores = input.sco;
    const labelOccurrence = getLabelOccurrence(image, scoreThreshold);
    expect(labelOccurrence).toEqual(expected);
  });
});

// export const loadResultsToCache = (
//     inferenceData: ApiModelData,
//     imageCache: Images[],
//     imageIndex: number,
//   ): Images[] => {
//     // amends the image cache given an image index, with the inference data
//     // which is received from the server
//     const newCache = [...imageCache];
//     const topN = inferenceData.boxes.map((box) => box.topN);
//     const index = newCache.findIndex((item) => item.index === imageIndex);
//     if (index !== -1) {
//       newCache[index] = {
//         ...newCache[index],
//         scores: inferenceData.boxes.map((box) => box.score),
//         classifications: inferenceData.boxes.map((box) => box.label),
//         boxes: inferenceData.boxes.map((box) => box.box),
//         overlapping: inferenceData.boxes.map((box) => box.overlapping),
//         overlappingIndices: inferenceData.boxes.map(
//           (box) => box.overlappingIndices,
//         ),
//         topN,
//         annotated: true,
//       };
//     }

//     return newCache;
//   };

describe("loadResultsToCache", () => {
  let imageCache: Images[] = [
    {
      index: 0,
      src: "test",
      scores: [],
      classifications: [],
      boxes: [],
      annotated: false,
      imageDims: [0, 0],
      overlapping: [],
      overlappingIndices: [],
      topN: [],
    },
  ];

  let inferenceData: ApiModelData = {
    filename: "test",
    boxes: [
      {
        score: 0.1,
        label: "a",
        box: {
          topX: 1,
          topY: 1,
          bottomX: 1,
          bottomY: 1,
        },
        topN: [],
        overlapping: false,
        overlappingIndices: 0,
      },
      {
        score: 0.2,
        label: "b",
        box: {
          topX: 2,
          topY: 2,
          bottomX: 2,
          bottomY: 2,
        },
        topN: [],
        overlapping: false,
        overlappingIndices: 0,
      },
      {
        score: 0.3,
        label: "c",
        box: {
          topX: 3,
          topY: 3,
          bottomX: 3,
          bottomY: 3,
        },
        topN: [],
        overlapping: false,
        overlappingIndices: 0,
      },
    ],
    labelOccurrence: { seed_name: 0 },
    totalBoxes: 0,
  };

  beforeEach(() => {
    imageCache = [
      {
        index: 0,
        src: "test",
        scores: [],
        classifications: [],
        boxes: [],
        annotated: false,
        imageDims: [0, 0],
        overlapping: [],
        overlappingIndices: [],
        topN: [],
      },
    ];

    inferenceData = {
      filename: "test",
      boxes: [
        {
          score: 0.1,
          label: "a",
          box: {
            topX: 1,
            topY: 1,
            bottomX: 1,
            bottomY: 1,
          },
          topN: [],
          overlapping: false,
          overlappingIndices: 0,
        },
        {
          score: 0.2,
          label: "b",
          box: {
            topX: 2,
            topY: 2,
            bottomX: 2,
            bottomY: 2,
          },
          topN: [],
          overlapping: false,
          overlappingIndices: 0,
        },
        {
          score: 0.3,
          label: "c",
          box: {
            topX: 3,
            topY: 3,
            bottomX: 3,
            bottomY: 3,
          },
          topN: [],
          overlapping: false,
          overlappingIndices: 0,
        },
      ],
      labelOccurrence: { seed_name: 0 },
      totalBoxes: 0,
    };
  });

  it("should load results to cache with 1 image", () => {
    imageCache = [
      {
        index: 0,
        src: "test",
        scores: [],
        classifications: [],
        boxes: [],
        annotated: false,
        imageDims: [0, 0],
        overlapping: [],
        overlappingIndices: [],
        topN: [],
      },
    ];

    const imageIndex = 0;
    const newCache = [
      {
        index: 0,
        src: "test",
        scores: [0.1, 0.2, 0.3],
        classifications: ["a", "b", "c"],
        boxes: [
          { topX: 1, topY: 1, bottomX: 1, bottomY: 1 },
          { topX: 2, topY: 2, bottomX: 2, bottomY: 2 },
          { topX: 3, topY: 3, bottomX: 3, bottomY: 3 },
        ],
        annotated: true,
        imageDims: [0, 0],
        overlapping: [false, false, false],
        overlappingIndices: [0, 0, 0],
        topN: [[], [], []],
      },
    ];
    const result = loadResultsToCache(inferenceData, imageCache, imageIndex);
    expect(result).toEqual(newCache);
  });

  it("should load results to cache with 2 images", () => {
    imageCache = [
      {
        index: 0,
        src: "test",
        scores: [],
        classifications: [],
        boxes: [],
        annotated: false,
        imageDims: [0, 0],
        overlapping: [],
        overlappingIndices: [],
        topN: [],
      },
      {
        index: 1,
        src: "test",
        scores: [],
        classifications: [],
        boxes: [],
        annotated: false,
        imageDims: [0, 0],
        overlapping: [],
        overlappingIndices: [],
        topN: [],
      },
    ];

    const newCache = [
      {
        index: 0,
        src: "test",
        scores: [0.1, 0.2, 0.3],
        classifications: ["a", "b", "c"],
        boxes: [
          { topX: 1, topY: 1, bottomX: 1, bottomY: 1 },
          { topX: 2, topY: 2, bottomX: 2, bottomY: 2 },
          { topX: 3, topY: 3, bottomX: 3, bottomY: 3 },
        ],
        annotated: true,
        imageDims: [0, 0],
        overlapping: [false, false, false],
        overlappingIndices: [0, 0, 0],
        topN: [[], [], []],
      },
      {
        index: 1,
        src: "test",
        scores: [0.1, 0.2, 0.3],
        classifications: ["a", "b", "c"],
        boxes: [
          { topX: 1, topY: 1, bottomX: 1, bottomY: 1 },
          { topX: 2, topY: 2, bottomX: 2, bottomY: 2 },
          { topX: 3, topY: 3, bottomX: 3, bottomY: 3 },
        ],
        annotated: true,
        imageDims: [0, 0],
        overlapping: [false, false, false],
        overlappingIndices: [0, 0, 0],
        topN: [[], [], []],
      },
    ];
    const resultCache1 = loadResultsToCache(inferenceData, imageCache, 0);
    const resultCache2 = loadResultsToCache(inferenceData, resultCache1, 1);
    expect(resultCache2).toEqual(newCache);
  });

  it("should not load results to cache with 0 images", () => {
    imageCache = [];

    const newCache = [];
    const result = loadResultsToCache(inferenceData, imageCache, 0);
    expect(result).toEqual(newCache);
  });

  it("should not load results to cache if index is not found", () => {
    imageCache = [
      {
        index: 0,
        src: "test",
        scores: [],
        classifications: [],
        boxes: [],
        annotated: false,
        imageDims: [0, 0],
        overlapping: [],
        overlappingIndices: [],
        topN: [],
      },
    ];

    const newCache = [
      {
        index: 0,
        src: "test",
        scores: [],
        classifications: [],
        boxes: [],
        annotated: false,
        imageDims: [0, 0],
        overlapping: [],
        overlappingIndices: [],
        topN: [],
      },
    ];
    const result = loadResultsToCache(inferenceData, imageCache, 1);
    expect(result).toEqual(newCache);
  });
});
