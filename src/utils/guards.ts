import { HistoryType } from 'src/types/historiesData';
import { PinCode } from 'src/types/pinCodesData';
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

const isPinCode = (data: unknown): data is PinCode => {
  return (
    !!data &&
    typeof data === 'object' &&
    'pin' in data &&
    'delivery' in data &&
    'district' in data &&
    'office' in data &&
    'phone' in data &&
    'region' in data &&
    'related_headoffice' in data &&
    typeof data.pin === 'number' &&
    typeof data.delivery === 'string' &&
    typeof data.district === 'string' &&
    typeof data.office === 'string' &&
    typeof data.phone === 'string' &&
    typeof data.region === 'string' &&
    typeof data.related_headoffice === 'string'
  );
};

export const isPinCodeArr = (data: unknown): data is PinCode[] => {
  return Array.isArray(data) && data.every((el) => isPinCode(el));
};

const isHistory = (data: unknown): data is HistoryType => {
  return (
    !!data &&
    typeof data === 'object' &&
    'date' in data &&
    'description' in data &&
    typeof data.date === 'string' &&
    typeof data.description === 'string'
  );
};

export const isHistoriesArr = (data: unknown): data is HistoryType[] => {
  return Array.isArray(data) && data.every((el) => isHistory(el));
};
