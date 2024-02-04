import { useState } from 'react';
import { PinCode } from 'src/types/pinCodesData';
import { Details } from '../Details';

type Props = {
  pinCode: PinCode;
};

export const PinCodeEl = ({ pinCode }: Props): JSX.Element => {
  const [shouldShowDetails, setShouldShowDetails] = useState(false);

  return (
    <>
      <div className='pincode-wrapper'>
        <div className='pincode'>
          <img src='https://cdn2.iconfinder.com/data/icons/location-map-simplicity/512/post_office-512.png' />
          <h4 className='header'>
            {pinCode.pin}, {pinCode.district}
          </h4>

          <div className='button-wrapper'>
            <div className='details-btn' onClick={() => setShouldShowDetails(true)}>
              View more info
            </div>
          </div>
        </div>
      </div>

      {shouldShowDetails && <Details pinCode={pinCode} setShouldShowDetails={setShouldShowDetails} />}
    </>
  );
};
