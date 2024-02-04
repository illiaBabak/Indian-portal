import { PinCode } from 'src/types/pinCodesData';
import { isPinCodeArr } from 'src/utils/guards';

const url = 'https://pincode.p.rapidapi.com/';
const apiKey = 'a7c94cd0d5msh6c4aec45fd9f63fp132de7jsndf7645f754b9';
const apiHost = 'pincode.p.rapidapi.com';

export const fetchPinCodes = async (pinCodeNumber: number): Promise<PinCode[]> => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost,
    },
    body: JSON.stringify({ searchBy: 'pincode', value: pinCodeNumber }),
  };

  try {
    const response = await fetch(url, options);
    const result: unknown = await response.json();

    if (isPinCodeArr(result)) return result;
    else throw new Error('Unexpected result ');
  } catch {
    throw new Error('Failed to fetch pin codes');
  }
};
