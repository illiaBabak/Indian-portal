import { createContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Histories } from 'src/pages/Histories';
import { PinCodes } from 'src/pages/Pin-Codes';
import { Trains } from 'src/pages/Trains';

type GlobalContextType = {
  setAlertType: React.Dispatch<React.SetStateAction<'error' | 'success' | null>>;
  alertType: 'error' | 'success' | null;
};

export const GlobalContext = createContext<GlobalContextType>({
  setAlertType: () => {
    throw new Error('Global context is not initialized');
  },
  alertType: null,
});

export const App = (): JSX.Element => {
  const [alertType, setAlertType] = useState<'error' | 'success' | null>(null);

  return (
    <GlobalContext.Provider value={{ alertType, setAlertType }}>
      <BrowserRouter>
        <Routes>
          <Route path='/Indian-portal'>
            <Route index element={<Navigate to='trains' />} />
            <Route path='*' element={<Navigate to='trains' />} />
            <Route path='trains' element={<Trains />} />
            <Route path='pin-codes' element={<PinCodes />} />
            <Route path='histories' element={<Histories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};
