import { useRef } from 'react';
import { fetchTrains } from 'src/api/fetchTrains';
import { Bar } from 'src/components/Bar';
import { TrainData } from 'src/types/trainData';

type Props = {
  setTrains: React.Dispatch<React.SetStateAction<TrainData[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ setTrains, setIsLoading }: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    try {
      setIsLoading(true);

      const data = await fetchTrains(value);
      setTrains(data);
    } catch {
      setTrains([]);
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
          <img src='src/images/train.png' />
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
