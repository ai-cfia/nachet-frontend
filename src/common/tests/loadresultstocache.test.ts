import { describe, it } from "vitest";
import { loadResultsToCache } from "../cacheutils";
import { ApiInferenceData, Images } from "../types";

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

  let inferenceData: ApiInferenceData = {
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

    expect(() => loadResultsToCache(inferenceData, imageCache, 0)).toThrow(
      "Image index not found in cache",
    );
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

    expect(() => loadResultsToCache(inferenceData, imageCache, 1)).toThrow(
      "Image index not found in cache",
    );
  });
});
