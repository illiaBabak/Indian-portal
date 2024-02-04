import { downloadData } from 'src/utils/downloadData';
import { Bar } from '../Bar';
import { HistoryType } from 'src/types/historiesData';
import { PinCode } from 'src/types/pinCodesData';
import { TrainData } from 'src/types/trainData';

type Props = {
  title: string;
  url?: string;
  headerClassName: string;
  rightPart?: JSX.Element;
  data: TrainData[] | PinCode[] | HistoryType[];
};

export const Header = ({ url, title, rightPart, headerClassName, data }: Props): JSX.Element => {
  return (
    <div className={`header ${headerClassName}`}>
      <div className='wrapper'>
        <Bar />
        <div className='header-title'>
          {url && <img src={url} />}
          <h1>{title}</h1>
        </div>
      </div>

      <div className='wrapper'>
        <div
          className={`save-btn ${data.length ? '' : 'disabled'}`}
          onClick={data.length ? () => downloadData(data) : undefined}
        >
          Save data
        </div>
        {rightPart && rightPart}
      </div>
    </div>
  );
};
