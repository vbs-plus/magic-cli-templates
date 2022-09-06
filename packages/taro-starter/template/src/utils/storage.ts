import Taro from '@tarojs/taro';

const logger = console;
export const getStorage = (key: string) => {
  if (!Taro.getStorageSync) {
    logger.warn('Taro.getStorageSync is not support');
    return null;
  }
  try {
    return Taro.getStorageSync(key) || null;
  } catch (error) {
    logger.error('Taro.getStorageSync error', error);
    return null;
  }
};

export const setStorage = (key: string, value: any) => {
  if (!Taro.setStorageSync) {
    logger.warn('Taro.setStorageSync is not support');
    return null;
  }
  try {
    return Taro.setStorageSync(key, value);
  } catch (error) {
    logger.error('Taro.setStorageSync error', error);
  }
};

export const removeStorage = (key: string) => {
  if (!Taro.removeStorageSync) {
    logger.warn('Taro.removeStorageSync is not support');
    return null;
  }
  try {
    return Taro.removeStorageSync(key);
  } catch (error) {
    logger.error('Taro.removeStorageSync error', error);
  }
};
