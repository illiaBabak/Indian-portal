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
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [pinCodes, setPinCodes] = useState<PinCode[]>([]);
  const [prevVal, setPrevVal] = useState('');
  const [history, setHistory] = useState<Map<string, number>>(new Map());
  const { setTypeError } = useContext(GlobalContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const query = searchParams.get('q');

        if (query) {
          const data = await fetchPinCodes(Number(query));
          setPinCodes(data);

          setTypeError('success');
        } else {
          setTypeError('error');
          throw new Error('Invalid query parameter');
        }
      } catch {
        setPinCodes([]);
        setTypeError('error');

        throw new Error('The request could not be made (pin codes)');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [searchParams, setTypeError]);

  const handleInput = () => {
    setPrevVal(searchQuery);

    setHistory((prevHistory) => {
      const updatedHistory = new Map(prevHistory);
      const count = updatedHistory.get(searchQuery) || 0;
      updatedHistory.set(searchQuery, count + 1);
      return updatedHistory;
    });

    if (searchQuery === prevVal || !searchQuery.trim()) return;

    if (isNaN(Number(searchQuery))) {
      setTypeError('error');
      return;
    }

    setSearchParams({ q: searchQuery });
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
              if (e.key === 'Enter') handleInput();
            }}
            onBlur={handleInput}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
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
