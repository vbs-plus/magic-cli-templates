import { Component, PropsWithChildren } from 'react';
import { Text, View } from '@tarojs/components';
import './index.less';

export default class Index extends Component<PropsWithChildren> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
