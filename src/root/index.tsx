import React, { createContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Histories } from 'src/pages/Histories/root';
import { PinCodes } from 'src/pages/Pin-Codes/root';
import { Trains } from 'src/pages/Trains/root';
import { HistoryType } from 'src/types/historiesData';
import { PinCode } from 'src/types/pinCodesData';
import { TrainData } from 'src/types/trainData';

type GlobalContextType = {
  data: TrainData[];
  isLoading: boolean;
  pinCodes: PinCode[];
  histories: HistoryType[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<TrainData[]>>;
  setPinCodes: React.Dispatch<React.SetStateAction<PinCode[]>>;
  setHistories: React.Dispatch<React.SetStateAction<HistoryType[]>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  data: [],
  isLoading: false,
  pinCodes: [],
  histories: [],
  setPinCodes: () => {
    throw new Error('Global context is not initialzed');
  },
  setIsLoading: () => {
    throw new Error('Global context is not initialized');
  },
  setData: () => {
    throw new Error('Global context is not initialized');
  },
  setHistories: () => {
    throw new Error('Global context is not initialized');
  },
});

export const App = (): JSX.Element => {
  const [data, setData] = useState<TrainData[]>([]);
  const [pinCodes, setPinCodes] = useState<PinCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [histories, setHistories] = useState<HistoryType[]>([]);

  return (
    <GlobalContext.Provider
      value={{ data, setData, isLoading, setIsLoading, setPinCodes, pinCodes, histories, setHistories }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Navigate to='/trains' />} />
          <Route path='/trains' element={<Trains />} />
          <Route path='/pin-codes' element={<PinCodes />} />
          <Route path='/histories' element={<Histories />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};
