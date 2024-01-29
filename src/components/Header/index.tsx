import { useContext } from 'react';
import { loadData } from 'src/api/fetchData';
import { GlobalContext } from 'src/root';

export const Header = (): JSX.Element => {
  const { setData } = useContext(GlobalContext);

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    const data = await loadData(value);
    setData(data);
  };

  return (
    <div className='header'>
      <div>
        <img src='src/images/train.png' />
        <h1>Indian railway trains</h1>
      </div>
      <input type='text' placeholder='Enter some info (city, train number or category) ' onBlur={handleBlur} />
    </div>
  );
};
