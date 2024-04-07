import { useCallback, useContext, useEffect, useState } from 'react';
import { HistoryType } from 'src/types/historiesData';
import { fetchHistories } from 'src/api/fetchHistories';
import { Loader } from 'src/components/Loader';
import { History } from './components/History';
import { Header } from 'src/components/Header';
import { downloadData } from 'src/utils/downloadData';
import { GlobalContext } from 'src/root';

type SortOption = 'older' | 'newer';

const SORT_OPTIONS: Record<string, SortOption> = { older: 'older', newer: 'newer' };

export const Histories = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>('older');
  const { setAlertType } = useContext(GlobalContext);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await fetchHistories();
      setHistories(data);

      setAlertType('success');
    } catch {
      setHistories([]);
      setAlertType('error');
      throw new Error('The request could not be made (histories)');
    } finally {
      setIsLoading(false);
    }
  }, [setHistories, setIsLoading, setAlertType]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const sortHistories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setSelectedSortOption(SORT_OPTIONS[value]);

    const sortedHistories = [...histories].sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();

      if (value === 'older') return aTime - bTime;
      return bTime - aTime;
    });

    setHistories(sortedHistories);
  };

  return (
    <div className='histories-wrapper'>
      <Header
        title='Indian history page for the current day'
        className='history-header'
        rightPart={
          <>
            <p className='select-text'>Sort histories</p>
            <select className='sort-select' value={selectedSortOption} onChange={sortHistories}>
              <option value='older'>Older</option>
              <option value='newer'>Newer</option>
            </select>
          </>
        }
        onSave={() => downloadData(histories)}
        isSaveDisabled={!histories.length}
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

      {!isLoading && !histories.length && (
        <div className='empty-histories'>
          No data found
          <div className='retry-btn' onClick={loadData}>
            Retry
          </div>
        </div>
      )}
    </div>
  );
};
