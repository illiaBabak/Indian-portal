import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Histories } from 'src/pages/Histories';
import { PinCodes } from 'src/pages/Pin-Codes';
import { Trains } from 'src/pages/Trains';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Navigate to='/trains' />} />
        <Route path='/trains' element={<Trains />} />
        <Route path='/pin-codes' element={<PinCodes />} />
        <Route path='/histories' element={<Histories />} />
      </Routes>
    </BrowserRouter>
  );
};
