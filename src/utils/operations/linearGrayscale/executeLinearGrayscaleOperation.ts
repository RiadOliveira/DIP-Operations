import { GrayLevels } from 'types/operations/GrayLevels';
import { OperationData } from 'types/operations/OperationData';
import { getGrayLevelsOfImage } from 'utils/auxiliar/getGrayLevelsOfImage';
import { handleNewIntervalPixelsUpdate } from './handleNewIntervalPixelsUpdate';
import { handleByPartsPixelsUpdate } from './handleByPartsPixelsUpdate';
import { LinearGrayscaleOperationKey } from 'types/operationsNames/linearGrayScale';

const HANDLE_PIXELS_UPDATE = {
  NEW_INTERVAL: handleNewIntervalPixelsUpdate,
  BY_PARTS: handleByPartsPixelsUpdate,
};

export const executeLinearGrayscaleOperation = (
  [image]: HTMLCanvasElement[],
  operationsData: OperationData[],
) => {
  const [{ key }] = operationsData;
  const { width, height } = image;

  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = width;
  resultCanvas.height = height;

  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(0, 0, width, height);
  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  const imageGrayLevels = getGrayLevelsOfImage(imageData);
  const factorsA = operationsData.map(({ values }) =>
    getFactorA(imageGrayLevels, values),
  );
  const intervals = extractIntervalsFromOperationsData(operationsData);
  const handlePixelsUpdate =
    HANDLE_PIXELS_UPDATE[key as LinearGrayscaleOperationKey];

  handlePixelsUpdate(
    [resultImageData.data, imageData],
    intervals,
    imageGrayLevels,
    factorsA,
  );
  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};

const getFactorA = (
  { min: imageMin, max: imageMax }: GrayLevels,
  [min, max]: number[],
) => (max - min) / (imageMax - imageMin);

const extractIntervalsFromOperationsData = (operationsData: OperationData[]) =>
  operationsData.map(({ values: [start, end] }) => [start, end]);
