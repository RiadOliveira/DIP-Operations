import { OperationData } from 'types/operations/OperationData';
import { executeEqualization } from './executeEqualization';
import { executeGammaCorrection } from './executeGammaCorrection';
import { executeBitSlicing } from './executeBitSlicing';

export const executeHighlightOperation = (
  [image]: HTMLCanvasElement[],
  [{ key, values }]: OperationData[],
) => {
  const { width, height } = image;
  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  if (key === 'BIT_SLICING') {
    return executeBitSlicing(image, imageData, values[0]);
  }

  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = width;
  resultCanvas.height = height;

  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(0, 0, width, height);

  const resultCanvases = (() => {
    const imagesData = [resultImageData.data, imageData];
    if (key === 'HISTOGRAM_EQUALIZATION') {
      return executeEqualization(resultCanvas, imagesData);
    }

    executeGammaCorrection(imagesData, values[0]);
    return [resultCanvas];
  })();

  resultContext.putImageData(resultImageData, 0, 0);
  return resultCanvases;
};