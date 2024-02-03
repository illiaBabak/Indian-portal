import { PinCode } from 'src/types/pinCodesData';

type Props = {
  pinCode: PinCode;
  setShouldShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Details = ({ pinCode, setShouldShowDetails }: Props): JSX.Element => {
  return (
    <div className='details-overlay' onClick={() => setShouldShowDetails(false)}>
      <div className='details-wrapper' onClick={(e) => e.stopPropagation()}>
        <div className='details'>
          <div>
            <h3>Pin: {pinCode.pin}</h3>
            <div className='close-btn' onClick={() => setShouldShowDetails(false)}>
              x
            </div>
          </div>
          <p>
            <b>Delivery</b>: {pinCode.delivery}
          </p>
          <p>
            <b>District</b>: {pinCode.district}
          </p>
          <p>
            <b>Office</b>: {pinCode.office}
          </p>
          <p>
            <b>Phone</b>: {pinCode.phone}
          </p>
          <p>
            <b>Region</b>: {pinCode.region}
          </p>
          <p>
            <b>Related headoffice</b>: {pinCode.related_headoffice}
          </p>
        </div>
      </div>
    </div>
  );
};
