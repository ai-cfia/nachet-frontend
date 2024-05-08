export interface Images {
  index: number;
  imageId?: number; // TODO convert to required once backend is implemented
  src: string;
  scores: number[];
  classifications: string[];
  boxes: Array<{
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

export interface InferenceData {
  imageId: number;
  model_name: string;
  boxes: Array<{
    topX: number;
    topY: number;
    bottomX: number;
    bottomY: number;
  }>;
  scores: number[];
  classifications: string[];
  topN: Array<Array<{ score: number; label: string }>>;
}

export interface FeedbackData {
  imageId: number;
  class: string;
  topX: number;
  topY: number;
  bottomX: number;
  bottomY: number;
}

export interface LabelOccurrences {
  [label: string]: number;
}

export interface ApiInferenceData {
  filename: string;
  boxes: Array<{
    topN: Array<{ score: number; label: string }>;
    score: number;
    label: string;
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
  identifiable: string[]; // TODO verify against backend spec
  job_name: string;
  metrics: string[]; // TODO verify against backend spec
  model_name: string;
  models: string[];
  pipeline_name: string;
  default?: boolean;
}
