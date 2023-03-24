import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export const perHeight = function heigthWidth(value = 1) {
  let result = 0;
  result = (height / 100) * value;
  return result;
};

export const perWidth = function heigthWidth(value) {
  let result = 0;
  result = (width / 100 ) * value;
  return result;
};
