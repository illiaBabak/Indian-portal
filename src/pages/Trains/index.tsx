import { useContext, useState } from 'react';
import { Loader } from 'src/components/Loader';
import { TrainData } from 'src/types/trainData';
import { ListEl } from './components/ListEl';
import { fetchTrains } from 'src/api/fetchTrains';
import { Header } from 'src/components/Header';
import { downloadData } from 'src/utils/downloadData';
import { GlobalContext } from 'src/root';

export const Trains = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [trains, setTrains] = useState<TrainData[]>([]);
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

    try {
      setIsLoading(true);

      const data = await fetchTrains(currentTarget.value);
      setTrains(data);

      setTypeError('success');
    } catch {
      setTrains([]);
      setTypeError('error');
      throw new Error('The request could not be made');
    } finally {
      setIsLoading(false);

      currentTarget.blur();
    }
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
              if (e.key === 'Enter') handleInput(e);
            }}
            onBlur={handleInput}
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
