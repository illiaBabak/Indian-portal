import { PinCode } from 'src/types/pinCodesData';
import { isPinCodeArr } from 'src/utils/guards';

const url = 'https://indian-pincode-2024.p.rapidapi.com/';
const apiKey = 'a7c94cd0d5msh6c4aec45fd9f63fp132de7jsndf7645f754b9';
const apiHost = 'indian-pincode-2024.p.rapidapi.com';

export const fetchPinCodes = async (pinCodeNumber: number): Promise<PinCode[]> => {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost,
    },
  };

  try {
    const response = await fetch(`${url}?pincode=${pinCodeNumber}`, options);
    const result: unknown = await response.json();

    if (isPinCodeArr(result)) return result;
    else throw new Error('Unexpected result ');
  } catch {
    throw new Error('Failed to fetch pin codes');
  }
};
