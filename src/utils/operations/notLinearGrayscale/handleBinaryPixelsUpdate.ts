import { NotLinearGrayscaleOperationKey } from 'types/operationsNames/notLinearGrayScale';
import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

export const handleBinaryPixelsUpdate = (
  _operationKey: NotLinearGrayscaleOperationKey,
  [resultCanvasData, imageData]: Uint8ClampedArray[],
) => {
  for (let ind = 0; ind < imageData.length; ind += 4) {
    const grayValue = getGrayValueFromImagePixel(imageData, ind);

    fillImagePixelWithSameValues(
      grayValue <= 127 ? 0 : 255,
      resultCanvasData,
      ind,
    );
  }
};
