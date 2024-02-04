import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalize } from 'src/utils/capitalize';

const ROUTES = ['trains', 'pin-codes', 'histories'];

export const Bar = (): JSX.Element => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setIsSidePanelOpen((prev) => !prev);

  return (
    <>
      {isSidePanelOpen && (
        <div className='bar-wrapper' onClick={handleClick}>
          <div className='bar' onClick={(e) => e.stopPropagation()}>
            <div className='header-wrapper'>
              <h1>Menu</h1>
              <div className='x' onClick={handleClick}>
                x
              </div>
            </div>

            <div className='links-list'>
              {ROUTES.map((route, index) => {
                const optionText = capitalize(route.replace('-', ' '));

                return (
                  <div className='link' onClick={() => navigate(`/${route}`)} key={`route-${optionText}-${index}`}>
                    {optionText}
                  </div>
                );
              })}
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
