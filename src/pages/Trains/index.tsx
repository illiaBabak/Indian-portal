import { useState } from 'react';
import { Loader } from 'src/components/Loader';
import { Header } from 'src/pages/Trains/components/Header';
import { TrainData } from 'src/types/trainData';
import { ListEl } from './components/ListEl';

export const Trains = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [trains, setTrains] = useState<TrainData[]>([]);

  return (
    <div className='container'>
      <Header setTrains={setTrains} setIsLoading={setIsLoading} />
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
