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
  const [isLoading, setIsLoading] = useState(false);
  const [trains, setTrains] = useState<TrainData[]>([]);
  const [history, setHistory] = useState<Map<string, number>>(new Map());
  const { setTypeError } = useContext(GlobalContext);

  const searchText = searchParams.get('q');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        if (searchText) {
          const data = await fetchTrains(searchText);
          setTrains(data);

          setTypeError('success');
        }
      } catch {
        setTrains([]);
        setTypeError('error');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [searchText, setTypeError]);

  const handleInput = (e: React.FocusEvent<HTMLInputElement, Element> | React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    if (value === searchText) return;

    setHistory((prevHistory) => {
      const updatedHistory = new Map(prevHistory);
      const count = updatedHistory.get(value) || 0;
      updatedHistory.set(value, count + 1);
      return updatedHistory;
    });

    setSearchParams({ q: value });
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
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
            onBlur={handleInput}
            defaultValue={searchParams.get('q') ?? ''}
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
