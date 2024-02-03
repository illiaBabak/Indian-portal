import { TrainData } from 'src/types/trainData';

type Props = {
  trainInfo: TrainData;
};

export const ListEl = ({ trainInfo }: Props): JSX.Element => {
  return (
    <div className='list-el-wrapper'>
      <img src='src/pages/Trains/images/list-train.png' />
      <div className='list-el'>
        <div>
          <h2>{trainInfo.train_num}</h2>
          <h2>{trainInfo.name}</h2>
        </div>
        <div>
          <p>From: {trainInfo.train_from}</p>
          <p>To: {trainInfo.train_to}</p>
        </div>
        <div>
          <p>Arrive time: {trainInfo.data.arriveTime}</p>
          <p>Depart time: {trainInfo.data.departTime} </p>
        </div>
      </div>
    </div>
  );
};
