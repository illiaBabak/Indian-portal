import { HistoryType } from 'src/types/historiesData';
import { PinCode } from 'src/types/pinCodesData';
import { TrainData, TrainSubObj } from 'src/types/trainData';

const isTrainSubObj = (subObj: unknown): subObj is TrainSubObj => {
  return (
    !!subObj &&
    typeof subObj === 'object' &&
    'id' in subObj &&
    'days' in subObj &&
    'to_id' in subObj &&
    'classes' in subObj &&
    'from_id' in subObj &&
    'arriveTime' in subObj &&
    'departTime' in subObj &&
    typeof subObj.id === 'string' &&
    !!subObj.days &&
    typeof subObj.days === 'object' &&
    Object.values(subObj.days).every((value) => typeof value === 'number' || typeof value === 'string') &&
    typeof subObj.to_id === 'string' &&
    Array.isArray(subObj.classes) &&
    subObj.classes.every((el) => typeof el === 'string') &&
    typeof subObj.from_id === 'string' &&
    typeof subObj.departTime === 'string' &&
    typeof subObj.arriveTime === 'string'
  );
};

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
    isTrainSubObj(data.data)
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
