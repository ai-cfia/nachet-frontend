export const getScaledBounds = (
  containerWidth: number,
  containerHeight: number,
  itemWidth: number,
  itemHeight: number,
  box: {
    topX: number;
    topY: number;
    bottomX: number;
    bottomY: number;
  },
): {
  scaledWidth: number;
  scaledHeight: number;
  scaledTopX: number;
  scaledTopY: number;
} => {
  const scaleFactorWidth = containerWidth / itemWidth;
  const scaleFactorHeight = containerHeight / itemHeight;
  const scaledWidth = (box.bottomX - box.topX) * scaleFactorWidth;
  const scaledHeight = (box.bottomY - box.topY) * scaleFactorHeight;
  const scaledTopX = box.topX * scaleFactorWidth;
  const scaledTopY = box.topY * scaleFactorHeight;
  return {
    scaledWidth,
    scaledHeight,
    scaledTopX,
    scaledTopY,
  };
};
