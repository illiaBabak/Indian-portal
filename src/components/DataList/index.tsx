import { useContext } from 'react';
import { GlobalContext } from 'src/root';
import { ListEl } from '../ListEl';
import { Loader } from '../Loader';

export const DataList = (): JSX.Element => {
  const { data, isLoading } = useContext(GlobalContext);

  if (isLoading) return <Loader />;

  return (
    <>
      {data.length ? (
        <div className='list'>
          {data.map((trainInfo) => (
            <ListEl trainInfo={trainInfo} key={trainInfo.train_num} />
          ))}
        </div>
      ) : (
        <div className='empty-list'>
          <img src='src/images/main-train.jpg' />
          <h2>No data provided or invalid data</h2>
        </div>
      )}
    </>
  );
};
