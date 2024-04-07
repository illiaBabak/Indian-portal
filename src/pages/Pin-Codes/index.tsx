import { useContext, useEffect, useState } from 'react';
import { PinCode } from 'src/types/pinCodesData';
import { PinCodeEl } from './components/PinCodeEl';
import { Loader } from 'src/components/Loader';
import { fetchPinCodes } from 'src/api/fetchPinCodes';
import { Header } from 'src/components/Header';
import { downloadData } from 'src/utils/downloadData';
import { GlobalContext } from 'src/root';
import { useSearchParams } from 'react-router-dom';

export const PinCodes = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [pinCodes, setPinCodes] = useState<PinCode[]>([]);
  const [history, setHistory] = useState<Map<string, number>>(new Map());
  const { setAlertType } = useContext(GlobalContext);

  const searchText = searchParams.get('q');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        if (searchText) {
          const data = await fetchPinCodes(Number(searchText));
          setPinCodes(data);

          setAlertType('success');
        }
      } catch {
        setPinCodes([]);
        setAlertType('error');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [searchText, setAlertType]);

  const handleInput = (e: React.FocusEvent<HTMLInputElement, Element> | React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    if (value === searchText) return;

    if (isNaN(Number(value))) {
      setAlertType('error');
      return;
    }

    setHistory((prevHistory) => {
      const updatedHistory = new Map(prevHistory);
      const count = updatedHistory.get(value) || 0;
      updatedHistory.set(value, count + 1);
      return updatedHistory;
    });

    setSearchParams({ q: value });
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
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
            onBlur={handleInput}
            defaultValue={searchParams.get('q') ?? ''}
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
