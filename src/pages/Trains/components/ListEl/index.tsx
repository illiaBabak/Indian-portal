import { TrainData } from 'src/types/trainData';

type Props = {
  trainInfo: TrainData;
};

export const ListEl = ({ trainInfo }: Props): JSX.Element => {
  const { train_num, name, train_from, train_to, data } = trainInfo;

  return (
    <div className='list-el-wrapper'>
      <img src='https://png.pngtree.com/png-vector/20230109/ourmid/pngtree-train-on-a-white-background-png-image_6556767.png' />
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
