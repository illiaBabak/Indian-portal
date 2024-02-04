import { Bar } from 'src/components/Bar';

export const Header = (): JSX.Element => {
  return (
    <div className='history-header header'>
      <Bar />
      <h3>Indian history page for the current day</h3>
    </div>
  );
};
