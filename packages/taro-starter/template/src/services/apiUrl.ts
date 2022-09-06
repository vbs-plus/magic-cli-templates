/**
 * 小程序配置文件
 * 测试:test
 * 预发:pre
 * 生产:prod
 */

const HOSTS = {
  demo: { dev: 'test', pre: 'uat', prod: 'prod' },
};

export const getApiHost = (name = 'm') => {
  if (name === 'mock') {
    return 'https://mock.apifox.cn/m1/1452904-0-default';
  }
  const ENV = process.env.ZA_ENV;
  const host = HOSTS[name][ENV];
  if (host.indexOf('.') === -1) {
    return `https://${host}.zhongan.com`;
  }
  return 'https://' + host;
};
export default {
  // demo
  demo: `${getApiHost('demo')}/demo`,
};
