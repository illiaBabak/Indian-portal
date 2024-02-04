import { TrainData } from 'src/types/trainData';
import { isTrainArr } from 'src/utils/guards';

const url = 'https://trains.p.rapidapi.com/';
const apiKey = 'a7c94cd0d5msh6c4aec45fd9f63fp132de7jsndf7645f754b9';
const apiHost = 'trains.p.rapidapi.com';

export const fetchTrains = async (text: string): Promise<TrainData[]> => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost,
    },
    body: JSON.stringify({ search: text }),
  };

  try {
    const response = await fetch(url, options);

    const result: unknown = await response.json();

    if (isTrainArr(result)) return result;
    else throw new Error('Unexpected result');
  } catch {
    throw new Error('Failed to fetch');
  }
};
