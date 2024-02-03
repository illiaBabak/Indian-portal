import { useContext, useRef } from 'react';
import { Bar } from 'src/pages/components/Bar';
import { GlobalContext } from 'src/root';
import { fetchPinCodes } from '../../api/fetchData';

export const Header = (): JSX.Element => {
  const { setPinCodes, setIsLoading } = useContext(GlobalContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    try {
      setIsLoading(true);

      const data = await fetchPinCodes(Number(value));
      setPinCodes(data);
    } catch {
      setPinCodes([]);
      throw new Error('The request could not be made (pin codes)');
    } finally {
      setIsLoading(false);

      if (inputRef.current) inputRef.current.blur();
    }
  };

  return (
    <div className='header pincode-header'>
      <div className='wrapper'>
        <Bar />
        <img src='https://cdn-icons-png.freepik.com/512/169/169845.png' />
        <h1>Pin codes</h1>
      </div>

      <input
        ref={inputRef}
        type='text'
        placeholder='Enter the pin number'
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleInput(e);
        }}
        onBlur={handleInput}
      />
    </div>
  );
};
