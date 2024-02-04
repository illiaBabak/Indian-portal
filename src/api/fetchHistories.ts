import { HistoryType } from 'src/types/historiesData';
import { isHistoriesArr } from 'src/utils/guards';

const url = 'https://current-affairs-of-india.p.rapidapi.com/history-of-today';
const apiKey = 'a7c94cd0d5msh6c4aec45fd9f63fp132de7jsndf7645f754b9';
const apiHost = 'current-affairs-of-india.p.rapidapi.com';

export const fetchHistories = async (): Promise<HistoryType[]> => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost,
    },
  };

  try {
    const response = await fetch(url, options);
    const result: unknown = await response.json();

    if (isHistoriesArr(result)) return result;
    else throw new Error('Unexpected result at histories');
  } catch {
    throw new Error('Something went wrong with histories api');
  }
};
