import { useContext } from 'react';
import { Loader } from 'src/pages/components/Loader';
import { GlobalContext } from 'src/root';
import { PinCodeEl } from '../PinCodeEl';

export const PinCodesList = (): JSX.Element => {
  const { isLoading, pinCodes } = useContext(GlobalContext);

  if (isLoading) return <Loader />;

  return (
    <>
      {pinCodes.length ? (
        <div className='pincodes-list'>
          {pinCodes.map((pinCode, index) => (
            <PinCodeEl pinCode={pinCode} key={index} />
          ))}
        </div>
      ) : (
        <div className='empty-pincodes'>No valid pin</div>
      )}
    </>
  );
};
