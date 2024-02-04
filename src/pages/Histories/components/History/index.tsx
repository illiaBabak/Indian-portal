import { HistoryType } from 'src/types/historiesData';

type Props = {
  history: HistoryType;
};

export const History = ({ history }: Props): JSX.Element => (
  <div className='history'>
    <h3>Date: {history.date}</h3>
    <p>Description: {history.description}</p>
  </div>
);
