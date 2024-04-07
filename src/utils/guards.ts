import { HistoryType } from 'src/types/historiesData';
import { PinCode } from 'src/types/pinCodesData';
import { TrainData, TrainSubObj } from 'src/types/trainData';

const isString = (val: unknown): val is string => typeof val === 'string';

const isNumber = (val: unknown): val is number => typeof val === 'number';

const isObj = (val: unknown): val is object => !!val && typeof val === 'object';

const isTrainSubObj = (subObj: unknown): subObj is TrainSubObj => {
  return (
    isObj(subObj) &&
    'id' in subObj &&
    'days' in subObj &&
    'to_id' in subObj &&
    'classes' in subObj &&
    'from_id' in subObj &&
    'arriveTime' in subObj &&
    'departTime' in subObj &&
    isString(subObj.id) &&
    isString(subObj.from_id) &&
    isString(subObj.departTime) &&
    isString(subObj.arriveTime) &&
    isString(subObj.to_id) &&
    isObj(subObj.days) &&
    Object.values(subObj.days).every((value) => isNumber(value) || isString(value)) &&
    Array.isArray(subObj.classes) &&
    subObj.classes.every((el) => isString(el))
  );
};

const isTrainData = (data: unknown): data is TrainData => {
  return (
    isObj(data) &&
    'train_num' in data &&
    'name' in data &&
    'train_from' in data &&
    'train_to' in data &&
    'data' in data &&
    isNumber(data.train_num) &&
    isString(data.name) &&
    isString(data.train_from) &&
    isString(data.train_to) &&
    isTrainSubObj(data.data)
  );
};

export const isTrainArr = (data: unknown): data is TrainData[] => {
  return Array.isArray(data) && data.every((el) => isTrainData(el));
};

const isPinCode = (data: unknown): data is PinCode => {
  return (
    isObj(data) &&
    'pin' in data &&
    'delivery' in data &&
    'district' in data &&
    'office' in data &&
    'phone' in data &&
    'region' in data &&
    'related_headoffice' in data &&
    isNumber(data.pin) &&
    isString(data.delivery) &&
    isString(data.district) &&
    isString(data.office) &&
    isString(data.phone) &&
    isString(data.region) &&
    isString(data.related_headoffice)
  );
};

export const isPinCodeArr = (data: unknown): data is PinCode[] => {
  return Array.isArray(data) && data.every((el) => isPinCode(el));
};

const isHistory = (data: unknown): data is HistoryType => {
  return isObj(data) && 'date' in data && 'description' in data && isString(data.date) && isString(data.description);
};

export const isHistoriesArr = (data: unknown): data is HistoryType[] => {
  return Array.isArray(data) && data.every((el) => isHistory(el));
};
