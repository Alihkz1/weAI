export const FileDimension = (height, width) => `Dimension: ${height}*${width}`;

export const FileRatio = (ratio) => `Ratio: ${ratio}`;

export const ImageName = (fileName) =>
  fileName.length > 30 ? fileName.substring(0, 30) + " ..." : fileName;

export const FileSize = (size) => `Size: ${size}KB`;
