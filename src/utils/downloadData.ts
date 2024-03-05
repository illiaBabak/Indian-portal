import { HistoryType } from 'src/types/historiesData';
import { PinCode } from 'src/types/pinCodesData';
import { TrainData } from 'src/types/trainData';
import { capitalize } from './capitalize';

const formatMap = (title: string, content: Map<string, number>): string => {
  let formattedString = `${title}\n\n`;

  content.forEach((count, key) => {
    formattedString += `${key}: ${count}\n`;
  });

  return formattedString;
};

const writeLine = (val: string | Record<string, string | number> | string[] | number, key: string) => {
  if (typeof val !== 'object') return `${capitalize(key).replace('-', ' ')} - ${val}\n`;
};

const formatData = (data: TrainData[] | PinCode[] | HistoryType[]): string => {
  let formattedData = '';

  for (let i = 0; i < data.length; i++) {
    for (const [key, val] of Object.entries(data[i])) {
      if (typeof val !== 'object') {
        formattedData += writeLine(val, key);
        continue;
      }

      for (const [keyData, valData] of Object.entries(val)) writeLine(valData, keyData);
    }

    formattedData += '\n';
  }

  return formattedData;
};

export const downloadData = (
  content: TrainData[] | PinCode[] | HistoryType[] | Map<string, number>,
  title?: string
): void => {
  const link = document.createElement('a');
  const formattedContent = content instanceof Map ? formatMap(title ?? '', content) : formatData(content);

  const file = new Blob([formattedContent], { type: 'text/plain' });

  link.href = URL.createObjectURL(file);

  link.download = 'india_data.txt';

  link.click();
  URL.revokeObjectURL(link.href);
};
