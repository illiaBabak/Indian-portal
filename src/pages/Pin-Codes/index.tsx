import { useState } from 'react';
import { Header } from './components/Header';
import { PinCode } from 'src/types/pinCodesData';
import { PinCodeEl } from './components/PinCodeEl';
import { Loader } from 'src/components/Loader';

export const PinCodes = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [pinCodes, setPinCodes] = useState<PinCode[]>([]);

  return (
    <div>
      <Header setIsLoading={setIsLoading} setPinCodes={setPinCodes} />
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
