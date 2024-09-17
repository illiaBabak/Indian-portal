import { TrainData } from 'src/types/trainData';
import { isTrainArr } from 'src/utils/guards';

const url = 'https://trains.p.rapidapi.com/v1/railways/trains/india/';
const apiKey = 'a7c94cd0d5msh6c4aec45fd9f63fp132de7jsndf7645f754b9';
const apiHost = 'trains.p.rapidapi.com';

export const fetchTrains = async (text: string): Promise<TrainData[]> => {
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost,
      'Content-Type': 'application/json',
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
