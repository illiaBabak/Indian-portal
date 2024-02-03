import { createContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PinCodes } from 'src/pages/Pin-Codes/root';
import { Trains } from 'src/pages/Trains/root';
import { PinCode } from 'src/types/pinCodesData';
import { TrainData } from 'src/types/trainData';

type GlobalContextType = {
  data: TrainData[];
  isLoading: boolean;
  pinCodes: PinCode[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<TrainData[]>>;
  setPinCodes: React.Dispatch<React.SetStateAction<PinCode[]>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  data: [],
  isLoading: false,
  pinCodes: [],
  setPinCodes: () => {
    throw new Error('Global context is not initialzed');
  },
  setIsLoading: () => {
    throw new Error('Global context is not initialized');
  },
  setData: () => {
    throw new Error('Global context is not initialized');
  },
});

export const App = (): JSX.Element => {
  const [data, setData] = useState<TrainData[]>([]);
  const [pinCodes, setPinCodes] = useState<PinCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{ data, setData, isLoading, setIsLoading, setPinCodes, pinCodes }}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Navigate to='/trains' />} />
          <Route path='/trains' element={<Trains />} />
          <Route path='/pin-codes' element={<PinCodes />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};
