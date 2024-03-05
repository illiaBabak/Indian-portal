import { useContext } from 'react';
import { GlobalContext } from 'src/root';
import { capitalize } from 'src/utils/capitalize';

export const Alert = ({ typeError }: { typeError: 'error' | 'success' }): JSX.Element => {
  const { setTypeError } = useContext(GlobalContext);

  return (
    <div className={`custom-alert ${typeError}-alert`} onAnimationEnd={() => setTypeError(null)}>
      <img
        src={
          typeError === 'error'
            ? 'https://www.freeiconspng.com/thumbs/error-icon/error-icon-4.png'
            : 'https://static-00.iconduck.com/assets.00/success-icon-512x512-qdg1isa0.png'
        }
      />
      <h2 className='alert-text'>{capitalize(typeError)}</h2>
    </div>
  );
};
