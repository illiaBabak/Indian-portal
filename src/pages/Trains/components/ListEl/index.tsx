import { TrainData } from 'src/types/trainData';

type Props = {
  trainInfo: TrainData;
};

export const ListEl = ({ trainInfo }: Props): JSX.Element => {
  const { train_num, name, train_from, train_to, data } = trainInfo;

  return (
    <div className='list-el-wrapper'>
      <img src='src/images/list-train.png' />
      <div className='list-el'>
        <div>
          <h2>{train_num}</h2>
          <h2>{name}</h2>
        </div>
        <div>
          <p>From: {train_from}</p>
          <p>To: {train_to}</p>
        </div>
        <div>
          <p>Arrive time: {data.arriveTime}</p>
          <p>Depart time: {data.departTime} </p>
        </div>
      </div>
    </div>
  );
};
