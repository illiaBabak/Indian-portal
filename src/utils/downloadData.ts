import { HistoryType } from 'src/types/historiesData';
import { PinCode } from 'src/types/pinCodesData';
import { TrainData } from 'src/types/trainData';
import { capitalize } from './capitalize';

const formatData = (data: TrainData[] | PinCode[] | HistoryType[]): string => {
  let formattedData = '';

  for (let i = 0; i < data.length; i++) {
    for (const [key, val] of Object.entries(data[i])) {
      if (typeof val !== 'object') {
        formattedData += `${capitalize(key).replace('-', ' ')} - ${val}\n`;
      } else if (typeof val === 'object') {
        for (const [keyData, valData] of Object.entries(val)) {
          if (typeof valData !== 'object') {
            formattedData += `${capitalize(keyData).replace('-', ' ')} - ${valData}\n`;
          }
        }
      }
    }
    formattedData += '\n';
  }

  return formattedData;
};

export const downloadData = (content: TrainData[] | PinCode[] | HistoryType[]): void => {
  const link = document.createElement('a');

  const file = new Blob([formatData(content)], { type: 'text/plain' });

  link.href = URL.createObjectURL(file);

  link.download = 'india_data.txt';

  link.click();
  URL.revokeObjectURL(link.href);
};
