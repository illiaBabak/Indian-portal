import { createContext, useState } from 'react';
import { DataList } from 'src/components/DataList';
import { Header } from 'src/components/Header';
import { TrainData } from 'src/types/trainData';

type GlobalContextType = {
  data: TrainData[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<TrainData[]>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  data: [],
  isLoading: false,

  setIsLoading: () => {
    throw new Error('Global context is not initialized');
  },
  setData: () => {
    throw new Error('Global context is not initialized');
  },
});

export const App = (): JSX.Element => {
  const [data, setData] = useState<TrainData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{ data, setData, isLoading, setIsLoading }}>
      <div className='container'>
        <Header />
        <DataList />
      </div>
    </GlobalContext.Provider>
  );
};
