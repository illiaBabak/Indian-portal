import { useRef, useState } from 'react';
import { PinCode } from 'src/types/pinCodesData';
import { PinCodeEl } from './components/PinCodeEl';
import { Loader } from 'src/components/Loader';
import { fetchPinCodes } from 'src/api/fetchPinCodes';
import { Header } from 'src/components/Header';

export const PinCodes = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [pinCodes, setPinCodes] = useState<PinCode[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    try {
      setIsLoading(true);

      const data = await fetchPinCodes(Number(value));
      setPinCodes(data);
    } catch {
      setPinCodes([]);
      throw new Error('The request could not be made (pin codes)');
    } finally {
      setIsLoading(false);

      if (inputRef.current) inputRef.current.blur();
    }
  };

  return (
    <div>
      <Header
        title='Pin Codes'
        headerClassName='pincode-header'
        url='https://cdn-icons-png.freepik.com/512/169/169845.png'
        rightPart={
          <input
            ref={inputRef}
            type='text'
            placeholder='Enter the pin number'
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleInput(e);
            }}
            onBlur={handleInput}
          />
        }
        data={pinCodes}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='pincodes-list'>
          {pinCodes.map((pinCode, index) => (
            <PinCodeEl pinCode={pinCode} key={index} />
          ))}
        </div>
      )}

      {!isLoading && !pinCodes.length && <div className='empty-pincodes'>No valid pin</div>}
    </div>
  );
};
