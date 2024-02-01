import { useContext } from 'react';
import { loadData } from 'src/api/fetchData';
import { GlobalContext } from 'src/root';

export const Header = (): JSX.Element => {
  const { setData, setIsLoading } = useContext(GlobalContext);

  const handleInput = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    try {
      setIsLoading(true);

      const data = await loadData(value);
      setData(data);
    } catch {
      throw new Error('The request could not be made');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='header'>
      <div>
        <img src='src/images/train.png' />
        <h1>Indian railway trains</h1>
      </div>
      <input
        type='text'
        placeholder='Enter some info (city, train number or category) '
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleInput(e);
        }}
        onBlur={handleInput}
      />
    </div>
  );
};
