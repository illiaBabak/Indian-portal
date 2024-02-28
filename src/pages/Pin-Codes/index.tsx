import { useContext, useState } from 'react';
import { PinCode } from 'src/types/pinCodesData';
import { PinCodeEl } from './components/PinCodeEl';
import { Loader } from 'src/components/Loader';
import { fetchPinCodes } from 'src/api/fetchPinCodes';
import { Header } from 'src/components/Header';
import { downloadData } from 'src/utils/downloadData';
import { GlobalContext } from 'src/root';

export const PinCodes = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [pinCodes, setPinCodes] = useState<PinCode[]>([]);
  const [prevVal, setPrevVal] = useState('');
  const [history, setHistory] = useState<Map<string, number>>(new Map());
  const { setTypeError } = useContext(GlobalContext);

  const handleInput = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    setPrevVal(currentTarget.value);

    setHistory((prevHistory) => {
      const updatedHistory = new Map(prevHistory);
      const count = updatedHistory.get(currentTarget.value) || 0;
      updatedHistory.set(currentTarget.value, count + 1);
      return updatedHistory;
    });

    if (currentTarget.value === prevVal || !currentTarget.value.trim()) return;

    if (isNaN(Number(currentTarget.value))) {
      setTypeError('error');
      return;
    }

    try {
      setIsLoading(true);

      const data = await fetchPinCodes(Number(currentTarget.value));
      setPinCodes(data);

      setTypeError('success');
    } catch {
      setPinCodes([]);
      setTypeError('error');
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
        onSaveHistory={() => downloadData(history, 'Pin codes')}
        onSave={() => downloadData(pinCodes)}
        isSaveDisabled={!pinCodes.length}
        isSaveHistoryDisabled={!history.size}
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
