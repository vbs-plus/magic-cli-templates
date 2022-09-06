import Taro from '@tarojs/taro';

const go = (link: any, openType: string = 'navigate') => {
  if (link.url) {
    link = link.url;
  }
  if (/^https:\/\//.test(link) || /^http:\/\//.test(link)) {
    link = '/pages/webView/index?url=' + encodeURIComponent(link);
  }

  return alipayGoResult(link, openType);
};

const alipayGoResult = (link: any, openType: string = 'navigate') => {
  if (openType === 'navigate') {
    Taro.navigateTo({
      url: link,
      success: (res) => {
        console.log('成功跳转', res); // eslint-disable-line
      },
      fail: (err) => {
        console.error('跳转失败', err); // eslint-disable-line
      },
    });
  }
  if (openType === 'redirectTo') {
    Taro.redirectTo({
      url: link,
      success: (res) => {
        console.log('成功跳转', res); // eslint-disable-line
      },
      fail: (err) => {
        console.error('跳转失败', err); // eslint-disable-line
      },
    });
  }
  if (openType === 'switchTab') {
    Taro.switchTab({
      url: link,
      success: (res) => {
        console.log('成功跳转', res); // eslint-disable-line
      },
      fail: (err) => {
        console.error('跳转失败', err); // eslint-disable-line
      },
    });
  }
  return null;
};

export const goBack = (option?) => {
  Taro.navigateBack(option);
};

export default go;
