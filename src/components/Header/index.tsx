import { Bar } from '../Bar';

type Props = {
  title: string;
  url?: string;
  className?: string;
  rightPart?: JSX.Element;
  onSave?: () => void;
  isSaveDisabled?: boolean;
};

export const Header = ({ url, title, rightPart, className = '', onSave, isSaveDisabled }: Props): JSX.Element => (
  <div className={`page-header ${className}`}>
    <div className='wrapper-left'>
      <Bar />
      <div className='header-title'>
        {url && <img src={url} />}
        <h1>{title}</h1>
      </div>
    </div>

    <div className='wrapper-right'>
      {onSave && (
        <div className={`save-btn ${!isSaveDisabled ? '' : 'disabled'}`} onClick={onSave}>
          Save data
        </div>
      )}

      {rightPart && rightPart}
    </div>
  </div>
);
