import { useState } from 'react';
import { Loader } from 'src/components/Loader';
import { TrainData } from 'src/types/trainData';
import { ListEl } from './components/ListEl';
import { fetchTrains } from 'src/api/fetchTrains';
import { Header } from 'src/components/Header';
import { downloadData } from 'src/utils/downloadData';

export const Trains = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [trains, setTrains] = useState<TrainData[]>([]);

  const handleInput = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget } = e;

    try {
      setIsLoading(true);

      const data = await fetchTrains(currentTarget.value);
      setTrains(data);
    } catch {
      setTrains([]);
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
        isSaveDisabled={!trains.length}
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
