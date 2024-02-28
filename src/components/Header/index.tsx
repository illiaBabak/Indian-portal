import { useContext } from 'react';
import { Bar } from '../Bar';
import { GlobalContext } from 'src/root';
import { Alert } from '../Alert';

type Props = {
  title: string;
  url?: string;
  className?: string;
  rightPart?: JSX.Element;
  onSave?: () => void;
  onSaveHistory?: () => void;
  isSaveDisabled?: boolean;
  isSaveHistoryDisabled?: boolean;
};

export const Header = ({
  url,
  title,
  rightPart,
  className = '',
  onSave,
  isSaveDisabled,
  onSaveHistory,
  isSaveHistoryDisabled,
}: Props): JSX.Element => {
  const { typeError } = useContext(GlobalContext);
  const alertKey = `alert-${Date.now()}`;

  return (
    <div className={`page-header ${className}`}>
      {!isSaveHistoryDisabled && typeError && <Alert typeError={typeError} key={alertKey} />}
      <div className='wrapper-left'>
        <Bar />
        <div className='header-title'>
          {url && <img src={url} />}
          <h1>{title}</h1>
        </div>
      </div>

      <div className='wrapper-right'>
        {onSaveHistory && (
          <div className={`save-btn ${!isSaveHistoryDisabled ? '' : 'disabled'}`} onClick={onSaveHistory}>
            Save history
          </div>
        )}
        {onSave && (
          <div className={`save-btn ${!isSaveDisabled ? '' : 'disabled'}`} onClick={onSave}>
            Save data
          </div>
        )}

        {rightPart && rightPart}
      </div>
    </div>
  );
};
