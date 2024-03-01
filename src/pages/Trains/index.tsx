import { useContext, useEffect, useState } from 'react';
import { Loader } from 'src/components/Loader';
import { TrainData } from 'src/types/trainData';
import { ListEl } from './components/ListEl';
import { fetchTrains } from 'src/api/fetchTrains';
import { Header } from 'src/components/Header';
import { downloadData } from 'src/utils/downloadData';
import { GlobalContext } from 'src/root';
import { useSearchParams } from 'react-router-dom';

export const Trains = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [trains, setTrains] = useState<TrainData[]>([]);
  const [prevVal, setPrevVal] = useState('');
  const [history, setHistory] = useState<Map<string, number>>(new Map());
  const { setTypeError } = useContext(GlobalContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const query = searchParams.get('q');

        if (query) {
          const data = await fetchTrains(query);
          setTrains(data);

          setTypeError('success');
        } else {
          setTypeError('error');
          throw new Error('Invalid query parameter');
        }
      } catch {
        setTrains([]);
        setTypeError('error');

        throw new Error('The request could not be made');
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

    setSearchParams({ q: searchQuery });
  };

  return (
    <div className='trains-wrapper'>
      <Header
        url='src/images/train.png'
        title='Indian railway trains'
        className='trains-header'
        rightPart={
          <input
            type='text'
            placeholder='Enter some info (city, train number or category) '
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleInput();
            }}
            onBlur={handleInput}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        }
        onSave={() => downloadData(trains)}
        onSaveHistory={() => downloadData(history, 'Trains')}
        isSaveDisabled={!trains.length}
        isSaveHistoryDisabled={!history.size}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='list'>
          {trains.map((trainInfo, index) => (
            <ListEl trainInfo={trainInfo} key={`train-${trainInfo.train_num}-${index}`} />
          ))}
        </div>
      )}

      {!isLoading && !trains.length && (
        <div className='empty-list'>
          <img src='src/images/main-train.jpg' />
          <h2>No data found</h2>
        </div>
      )}
    </div>
  );
};
