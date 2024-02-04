import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HistoryType } from 'src/types/historiesData';
import { fetchHistories } from 'src/api/fetchHistories';
import { Loader } from 'src/components/Loader';
import { History } from './components/History';

export const Histories = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [histories, setHistories] = useState<HistoryType[]>([]);

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

  return (
    <div>
      <Header />
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
