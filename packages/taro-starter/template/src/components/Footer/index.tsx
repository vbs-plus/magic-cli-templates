import { View } from '@tarojs/components';
import React from 'react';
import style from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

function Footer(props: Props) {
  const { children } = props;
  return <View className={style.footer}>{children}</View>;
}

export default Footer;
