import { useEffect, useState } from 'react';
import { HistoryType } from 'src/types/historiesData';
import { fetchHistories } from 'src/api/fetchHistories';
import { Loader } from 'src/components/Loader';
import { History } from './components/History';
import { Header } from 'src/components/Header';

export const Histories = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState('older');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const data = await fetchHistories();
        setHistories(data);
      } catch {
        setHistories([]);
        throw new Error('The request could not be made (histories)');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [setHistories, setIsLoading]);

  const sortHistories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setSelectedSortOption(value);

    const sortedHistories = [...histories];

    if (value === 'older') {
      sortedHistories.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (value === 'newer') {
      sortedHistories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    setHistories(sortedHistories);
  };

  return (
    <div>
      <Header
        title='Indian history page for the current day'
        headerClassName='history-header'
        data={histories}
        rightPart={
          <>
            <p className='select-text'>Sort histories</p>
            <select className='sort-select' value={selectedSortOption} onChange={sortHistories}>
              <option value='older'>Older</option>
              <option value='newer'>Newer</option>
            </select>
          </>
        }
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='histories'>
          {histories.map((history, index) => (
            <History history={history} key={`history-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};
