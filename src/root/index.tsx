import { createContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Histories } from 'src/pages/Histories';
import { PinCodes } from 'src/pages/Pin-Codes';
import { Trains } from 'src/pages/Trains';

type GlobalContextType = {
  setTypeError: React.Dispatch<React.SetStateAction<'error' | 'success' | null>>;
  typeError: 'error' | 'success' | null;
};

export const GlobalContext = createContext<GlobalContextType>({
  setTypeError: () => {
    throw new Error('Global context is not initialized');
  },
  typeError: null,
});

export const App = (): JSX.Element => {
  const [typeError, setTypeError] = useState<'error' | 'success' | null>(null);

  return (
    <GlobalContext.Provider value={{ typeError, setTypeError }}>
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
