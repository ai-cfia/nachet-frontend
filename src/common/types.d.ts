export interface ApiInferenceData {
  filename: string;
  inferenceId: string;
  boxes: Array<{
    topN: Array<{ score: number; label: string }>;
    score: number;
    label: string;
    boxId: string;
    box: {
      topX: number;
      topY: number;
      bottomX: number;
      bottomY: number;
    };
    overlapping: boolean;
    overlappingIndices: number;
  }>;
  labelOccurrence: {
    seed_name: number;
  };
  totalBoxes: number;
}
export interface Images {
  index: number;
  imageId?: number; // TODO convert to required once backend is implemented
  src: string;
  scores: number[];
  classifications: string[];
  boxes: Array<{
    inferenceId: string;
    boxId: string;
    label: string;
    topX: number;
    topY: number;
    bottomX: number;
    bottomY: number;
  }>;
  annotated: boolean;
  imageDims: number[];
  overlapping: boolean[];
  overlappingIndices: number[];
  topN: Array<Array<{ score: number; label: string }>>;
}

// export interface InferenceData {
//   imageId: number;
//   inferenceId: number;
//   model_name: string;
//   boxes: Array<{
//     boxId: number;
//     topX: number;
//     topY: number;
//     bottomX: number;
//     bottomY: number;
//   }>;
//   scores: number[];
//   classifications: string[];
//   topN: Array<Array<{ score: number; label: string }>>;
// }

interface FeedbackData {
  userId: string;
  inferenceId: string;
}

export interface FeedbackDataPositive extends FeedbackData {
  boxes: Array<{
    boxId: string;
  }>;
}

export interface FeedbackDataNegative extends FeedbackData {
  boxes: Array<{
    label: string;
    boxId: string;
    box: {
      topX: number;
      topY: number;
      bottomX: number;
      bottomY: number;
    };
  }>;
}

export interface LabelOccurrences {
  [label: string]: number;
}

// TODO: Redefine when the backend is updated
interface SpeciesData {
  id: number;
  label: string;
}

export interface ModelMetadata {
  created_by: string;
  creation_date: string;
  dataset: string;
  description: string;
  identifiable: string[];
  job_name: string;
  metrics: string[];
  model_name: string;
  models: string[];
  pipeline_name: string;
  default?: boolean;
}
