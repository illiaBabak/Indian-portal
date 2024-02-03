import { useContext, useRef } from 'react';
import { loadData } from 'src/pages/Trains/api/fetchData';
import { Bar } from 'src/pages/components/Bar';
import { GlobalContext } from 'src/root';

export const Header = (): JSX.Element => {
  const { setData, setIsLoading } = useContext(GlobalContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    try {
      setIsLoading(true);

      const data = await loadData(value);
      setData(data);
    } catch {
      setData([]);
      throw new Error('The request could not be made');
    } finally {
      setIsLoading(false);

      if (inputRef.current) inputRef.current.blur();
    }
  };

  return (
    <div className='header'>
      <div className='wrapper'>
        <Bar />
        <div className='header-title'>
          <img src='src/pages/Trains/images/train.png' />
          <h1>Indian railway trains</h1>
        </div>
      </div>

      <input
        ref={inputRef}
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
