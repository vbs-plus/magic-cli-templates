import Taro from '@tarojs/taro';
import { Chain } from '@tarojs/taro/types';
import { filterObj } from './helper';
import { getStorage } from './storage';

const SuccessCode = 200;

const showError = (response: any, isShow = true) => {
  const { data = {} } = response;
  const { success, errorMsg } = data;
  if (success === false && isShow) {
    Taro.showToast({
      title: errorMsg || '接口异常',
      icon: 'none',
    });
  }
};

function ajax(params): Promise<any> {
  params.data = filterObj(params.data);
  return new Promise((resolve, reject) => {
    return Taro.request(params)
      .then((res) => {
        if (res.statusCode === SuccessCode) {
          showError(res, params.showError);
          return resolve(res.data);
        }
        return reject(res.data);
      })
      .catch((res) => {
        return reject(res);
      });
  });
}

const commonInterceptor = (chain: Chain) => {
  const { requestParams } = chain;
  const { data, token = true, contentType } = requestParams;

  // 需要携带 token 则放置 Header 及 data 中
  if (token && getStorage('token')) {
    const tokenValue = getStorage('token');
    data.accessToken = tokenValue;
    requestParams.header = {
      ...requestParams.header,
      authtoken: tokenValue,
    };
  }

  // 支持 form 表单数据格式
  if (contentType === 'form') {
    requestParams.header = {
      ...requestParams.header,
      'Content-type': 'application/x-www-form-urlencoded',
    };
  }

  return chain.proceed(requestParams);
};

const addInterceptor = () => {
  Taro.addInterceptor(commonInterceptor);
  // 打印请求相关信息
  Taro.addInterceptor(Taro.interceptors.logInterceptor);
};
addInterceptor();

export default ajax;
