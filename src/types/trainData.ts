export type TrainData = {
  train_num: number;
  name: string;
  train_from: string;
  train_to: string;
  data: {
    id: string;
    days: Record<string, number | string>;
    to_id: string;
    classes: string[];
    from_id: string;
    arriveTime: string;
    departTime: string;
  };
};
