import { useRef, useState } from 'react';
import { Loader } from 'src/components/Loader';
import { TrainData } from 'src/types/trainData';
import { ListEl } from './components/ListEl';
import { fetchTrains } from 'src/api/fetchTrains';
import { Header } from 'src/components/Header';

export const Trains = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [trains, setTrains] = useState<TrainData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    try {
      setIsLoading(true);

      const data = await fetchTrains(value);
      setTrains(data);
    } catch {
      setTrains([]);
      throw new Error('The request could not be made');
    } finally {
      setIsLoading(false);

      if (inputRef.current) inputRef.current.blur();
    }
  };

  return (
    <div className='container'>
      <Header
        url='src/images/train.png'
        title='Indian railway trains'
        headerClassName='trains-header'
        rightPart={
          <input
            ref={inputRef}
            type='text'
            placeholder='Enter some info (city, train number or category) '
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleInput(e);
            }}
            onBlur={handleInput}
          />
        }
        data={trains}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='list'>
          {trains.map((trainInfo) => (
            <ListEl trainInfo={trainInfo} key={trainInfo.train_num} />
          ))}
        </div>
      )}

      {!isLoading && !trains.length && (
        <div className='empty-list'>
          <img src='src/images/main-train.jpg' />
          <h2>No data provided or invalid data</h2>
        </div>
      )}
    </div>
  );
};
