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
    imageId: "test",
    inferenceId: "test",
    boxes: [
      {
        score: 0.1,
        classId: "0",
        label: "a",
        boxId: "0",
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
        classId: "1",
        label: "b",
        boxId: "1",
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
        classId: "2",
        label: "c",
        boxId: "2",
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
      imageId: "test",
      inferenceId: "test",
      boxes: [
        {
          score: 0.1,
          classId: "0",
          label: "a",
          boxId: "0",
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
          classId: "1",
          label: "b",
          boxId: "1",
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
          classId: "2",
          label: "c",
          boxId: "2",
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
          {
            boxId: "0",
            inferenceId: "test",
            label: "a",
            topX: 1,
            topY: 1,
            bottomX: 1,
            bottomY: 1,
          },
          {
            boxId: "1",
            inferenceId: "test",
            label: "b",
            topX: 2,
            topY: 2,
            bottomX: 2,
            bottomY: 2,
          },
          {
            boxId: "2",
            inferenceId: "test",
            label: "c",
            topX: 3,
            topY: 3,
            bottomX: 3,
            bottomY: 3,
          },
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
          {
            boxId: "0",
            inferenceId: "test",
            label: "a",
            topX: 1,
            topY: 1,
            bottomX: 1,
            bottomY: 1,
          },
          {
            boxId: "1",
            inferenceId: "test",
            label: "b",
            topX: 2,
            topY: 2,
            bottomX: 2,
            bottomY: 2,
          },
          {
            boxId: "2",
            inferenceId: "test",
            label: "c",
            topX: 3,
            topY: 3,
            bottomX: 3,
            bottomY: 3,
          },
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
          {
            boxId: "0",
            inferenceId: "test",
            label: "a",
            topX: 1,
            topY: 1,
            bottomX: 1,
            bottomY: 1,
          },
          {
            boxId: "1",
            inferenceId: "test",
            label: "b",
            topX: 2,
            topY: 2,
            bottomX: 2,
            bottomY: 2,
          },
          {
            boxId: "2",
            inferenceId: "test",
            label: "c",
            topX: 3,
            topY: 3,
            bottomX: 3,
            bottomY: 3,
          },
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
