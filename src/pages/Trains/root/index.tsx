import { DataList } from 'src/pages/Trains/components/DataList';
import { Header } from 'src/pages/Trains/components/Header';

export const Trains = (): JSX.Element => {
  return (
    <div className='container'>
      <Header />
      <DataList />
    </div>
  );
};
