import { useContext, useEffect } from 'react';
import { Loader } from 'src/pages/components/Loader';
import { GlobalContext } from 'src/root';
import { fetchHistories } from '../../api/fetchHistories';
import { History } from '../History';

export const HistoriesList = (): JSX.Element => {
  const { isLoading, setIsLoading, setHistories, histories } = useContext(GlobalContext);

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

  if (isLoading) return <Loader />;

  return (
    <div className='histories'>
      {histories.map((history, index) => (
        <History history={history} key={`history-${index}`} />
      ))}
    </div>
  );
};
