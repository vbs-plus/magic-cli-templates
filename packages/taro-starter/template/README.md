# <%= projectName %>

## 本地开发
- 以支付宝为例
```
  1. yarn // 安装依赖
  2. yarn dev:alipay // 其他平台详见 package.json scripts
  3. 打开对应平台的小程序开发工具，新建-导入项目，小程序的项目路径为 taro/dist,其余为 taro
  4. 更改 project.config.json 中的 appId 为对应平台真实的 appId
```

- 代码提交

```
  1. git commit // 正常的 git 版本管理操作
```

- 打包上传
```
  1. 在对应要上传的小程序 IDE 中测试后，执行下面顺序
  2. 更改 package.json 版本号,yarn run build:alipay // 其他平台参照 package.json scripts
  3. 保持IDE中版本与master版本的版本号保持一致
```


- 切换环境
  - 目前支持 dev、pre、production,开发模式默认为 dev
  - 切换其他环境将 package.json scripts build 中 NODE_ENV 改为对应的环境

## 在原有支付宝小程序混合开发
目前有两种,详情见下方examples
- [Taro使用原生模块](https://taro-docs.jd.com/taro/docs/next/hybrid)
- [原生项目使用Taro](https://taro-docs.jd.com/taro/docs/next/taro-in-miniapp)

## 开发建议
- 统一采用 TypeScript 来开发, 这样通过 ts 特有的特性提高代码健壮性及可读性 （!!注意 类型、接口、枚举、模块等概念）。
- 样式单位统一采用 taro 推荐的 px 按照 1：1还原来管理，内部会根据不同的平台做单位适配,、
- 组件默认采用 css （bem 命名方式）来管理组件的样式，也可以使用 css modules 来管理，需要考虑复用者修改样式的场景
- 页面统一使用 css module,将样式文件命名为 *.module.scss 即可自动触发 css modules 模式。
- 对于通用的 Api 或者公共模块需要回归测试现有小程序平台(支付宝)。
- 高度复用公用组件放置在 src/components 目录下，其他组件按照页面维度来管理，利于分包配置
- 严格遵循 eslint/tslint/stylelint 等规范，养成直接书写成规范代码的习惯
- assets 采用规则，大图采用 cdn 链接，Icon 类暂时放在项目文件，考虑使用阿里 Iconfont。

## 常见问题（遇到通用性问题补充到下面）

- 安装报错，确认自己的 node 版本符合框架要求
- 开发编译报错，确认自己的 @taro/cli 跟 @tarojs/taro 版本一致 这里着重说明一下，taro/cli版本即使中版本也要保持一致

## 其他

## TODO-list
- 各平台配置信息分开文件 https://taro-docs.jd.com/taro/docs/project-config
- app.config 考虑分包设置
