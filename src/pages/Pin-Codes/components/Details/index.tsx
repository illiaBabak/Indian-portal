import { PinCode } from 'src/types/pinCodesData';

type Props = {
  pinCode: PinCode;
  setShouldShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Details = ({ pinCode, setShouldShowDetails }: Props): JSX.Element => {
  const { delivery, district, office, phone, region, related_headoffice, pin } = pinCode;

  return (
    <div className='details-overlay' onClick={() => setShouldShowDetails(false)}>
      <div className='details-wrapper' onClick={(e) => e.stopPropagation()}>
        <div className='details'>
          <div className='details-col'>
            <h3 className='header'>Pin: {pin}</h3>
            <div className='close-btn' onClick={() => setShouldShowDetails(false)}>
              x
            </div>
          </div>
          <p>
            <b>Delivery</b>: {delivery}
          </p>
          <p>
            <b>District</b>: {district}
          </p>
          <p>
            <b>Office</b>: {office}
          </p>
          <p>
            <b>Phone</b>: {phone}
          </p>
          <p>
            <b>Region</b>: {region}
          </p>
          <p>
            <b>Related headoffice</b>: {related_headoffice}
          </p>
        </div>
      </div>
    </div>
  );
};
