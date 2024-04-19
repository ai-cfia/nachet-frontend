export interface Images {
  index: number;
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

export interface LabelOccurrences {
  [label: string]: number;
}

export interface ApiModelData {
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
