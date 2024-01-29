import { TrainData } from 'src/types/trainData';
import { isTrainArr } from 'src/utils/guards';

export const loadData = async (text: string): Promise<TrainData[]> => {
  const url = 'https://trains.p.rapidapi.com/';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'a7c94cd0d5msh6c4aec45fd9f63fp132de7jsndf7645f754b9',
      'X-RapidAPI-Host': 'trains.p.rapidapi.com',
    },
    body: JSON.stringify({ search: text }),
  };

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const result: unknown = await response.json();

      if (isTrainArr(result)) return result;
      else throw new Error('Unexpected result');
    } else throw new Error('Unexpected response status');
  } catch {
    return [];
  }
};
