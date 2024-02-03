import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Bar = (): JSX.Element => {
  const [shouldOpenBar, setShouldOpenBar] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShouldOpenBar((prev) => !prev);
  };

  return (
    <>
      {shouldOpenBar && (
        <div className='bar-wrapper' style={{ height: window.innerHeight, width: innerWidth }} onClick={handleClick}>
          <div className='bar' style={{ height: window.innerHeight }} onClick={(e) => e.stopPropagation()}>
            <div>
              <h1>Menu</h1>
              <div className='x' onClick={handleClick}>
                x
              </div>
            </div>

            <div className='links-list'>
              <div onClick={() => navigate('/trains')}>Trains</div>
              <div onClick={() => navigate('/pin-codes')}>Pin codes</div>
            </div>
          </div>
        </div>
      )}

      <div className='menu-btn' onClick={handleClick}>
        Menu
      </div>
    </>
  );
};
