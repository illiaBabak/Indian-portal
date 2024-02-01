import { TrainData } from 'src/types/trainData';

const isTrainData = (data: unknown): data is TrainData => {
  return (
    !!data &&
    typeof data === 'object' &&
    'train_num' in data &&
    'name' in data &&
    'train_from' in data &&
    'train_to' in data &&
    'data' in data &&
    typeof data.train_num === 'number' &&
    typeof data.name === 'string' &&
    typeof data.train_from === 'string' &&
    typeof data.train_to === 'string' &&
    !!data.data &&
    typeof data.data === 'object' &&
    'id' in data.data &&
    'days' in data.data &&
    'to_id' in data.data &&
    'classes' in data.data &&
    'from_id' in data.data &&
    'arriveTime' in data.data &&
    'departTime' in data.data &&
    typeof data.data.id === 'string' &&
    !!data.data.days &&
    typeof data.data.days === 'object' &&
    Object.values(data.data.days).every((value) => typeof value === 'number' || typeof value === 'string') &&
    typeof data.data.to_id === 'string' &&
    Array.isArray(data.data.classes) &&
    data.data.classes.every((el) => typeof el === 'string') &&
    typeof data.data.from_id === 'string' &&
    typeof data.data.departTime === 'string' &&
    typeof data.data.arriveTime === 'string'
  );
};

export const isTrainArr = (data: unknown): data is TrainData[] => {
  return Array.isArray(data) && data.every((el) => isTrainData(el));
};