// export const mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
export const mobile = /^1[3456789]\d{9}$/;

export const verificationCode = /^\d{6}$/;

export const price = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/;

export const checkMobile = (value: string): boolean => {
  return mobile.test(value);
};
export const checkVerificationCode = (value: string | number): Boolean => {
  return verificationCode.test(value + '');
};
export const checkPrice = (value: string | number): Boolean => {
  return price.test(value + '');
};
