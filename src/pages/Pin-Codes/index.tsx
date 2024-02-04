import { useState } from 'react';
import { PinCode } from 'src/types/pinCodesData';
import { PinCodeEl } from './components/PinCodeEl';
import { Loader } from 'src/components/Loader';
import { fetchPinCodes } from 'src/api/fetchPinCodes';
import { Header } from 'src/components/Header';
import { downloadData } from 'src/utils/downloadData';

export const PinCodes = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [pinCodes, setPinCodes] = useState<PinCode[]>([]);

  const handleInput = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget } = e;

    try {
      setIsLoading(true);

      // ! If value is not number - show alert with invalid val error
      const data = await fetchPinCodes(Number(currentTarget.value));
      setPinCodes(data);
    } catch {
      setPinCodes([]);
      throw new Error('The request could not be made (pin codes)');
    } finally {
      setIsLoading(false);

      currentTarget.blur();
    }
  };

  return (
    <div className='pincodes-wrapper'>
      <Header
        title='Pin Codes'
        className='pincode-header'
        url='https://cdn-icons-png.freepik.com/512/169/169845.png'
        rightPart={
          <input
            type='text'
            placeholder='Enter the pin number'
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleInput(e);
            }}
            onBlur={handleInput}
          />
        }
        onSave={() => downloadData(pinCodes)}
        isSaveDisabled={!pinCodes.length}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='pincodes-list'>
          {pinCodes.map((pinCode, index) => (
            <PinCodeEl pinCode={pinCode} key={`pincode-${index}`} />
          ))}
        </div>
      )}

      {!isLoading && !pinCodes.length && <div className='empty-pincodes'>No data found</div>}
    </div>
  );
};
