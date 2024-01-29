import { createContext, useState } from 'react';
import { DataList } from 'src/components/DataList';
import { Header } from 'src/components/Header';
import { TrainData } from 'src/types/trainData';

type GlobalContextType = {
  data: TrainData[];
  setData: React.Dispatch<React.SetStateAction<TrainData[]>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  data: [],
  setData: () => {
    throw new Error('Global context is not initialized');
  },
});

export const App = (): JSX.Element => {
  const [data, setData] = useState<TrainData[]>([]);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      <div className='container'>
        <Header />
        <DataList />
      </div>
    </GlobalContext.Provider>
  );
};
