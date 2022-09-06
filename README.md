# Magic-cli-templates

## 起步

> 此仓库需要有 [rushjs](https://rushjs.io/zh-cn/) 基础

**安装依赖**
```shell
npm install -g @microsoft/rush

pnpm install

npm run bootstrap
```
## 创建模板

在 `packages/template` 下处理你的模板仓库，基本目录结构为：

```shell
-- packages
    -- [template1Name]
      -- template
        -- realRepo
      -- package.json
    -- [template2Name]
      -- template
        -- realRepo
      -- package.json
```
接着做出以下操作：

1. 模板仓库的命名必须以 `@vbs/` 开头，否则会造成后续脚手架不正常工作，注意是模板仓库最外层目录
2. 参考约定规范修改模板的 `package.json` 辅助 `ejs` 模板正常渲染
3. 为增强维护性，请为每个模板仓库编写 `README`
4. 当同步多个仓库时，请手动执行 `npm run bump` 进行同步


> 更多细节请参考 `packages/react-vitest-starter`

## 约定规范(必看)

- 项目模板存放目录： `packages/`
- 命名规则：参考目录下的 `react-vitest-starter`
  1. 目录命名：`[packageName]-starter`
  2. npmName 命名: `@vbs/[packageName]-starter`

- 模板仓库需要按照以下目录结构为标准，主目录需要放入 `templates` 文件夹中，根目录下的 `package.json` 指定当前发布的 `npm` 包信息，接着每个 `templates` 下的模板都需要统一配置部分 `package.json`,例如 `packages/react-vitest-starter/templates/package.json`，因为脚手架需要将这部分经过 `ejs` 模板渲染动态生成
- 代码模板仓库发布之后应检查系统模板是否和 npm 上模板是否相同，不相同请手动进行同步，同步操作: `npm run bump `

> ！注意： 如果你的项目中存在 ejs 模板渲染语句（例如 Vue2,Vue3 的 public文件夹，可以配置 `ignore: [**/public/**]`），请务必在发布模板前，配置模板 `ignore` 目录。否则模板在安装过程中会报错

```json
{
  "name": "<%= projectName %>",
  "version":"<%= projectVersion %>",
  "description": "<% projectDescription %>",
  ... 
}
```

## 发布

> 每个 `package` 下都需要配置 `build` 命令，否则 `rush` 无法正常工作，当然这并不会影响模板任何内容以及 `script`

```shell
rush build
git add .
git commit -m "chore: publish"
rush change
rush publish --apply
# 正式发布npm
rush publish -p --include-all -n <替换成你的 npm TOKEN> && npm run bump
```


## TODO

|                      名称                      | 进度（🚧 ✅ 🆕❌ ） |
| :--------------------------------------------: | :-------------: |
|      Vue3 + Vitest + UnoCSS + Vite3 模板       |        ✅        |
|      React + Vitest + UnoCSS + Vite3 模板      |        ✅        |
|         Vue3 + Vitest + Electron 模板          |        ✅        |
|         Vue3 + Vitest + Vite3 h5 模板          |        ✅        |
| React + TS + Umi + AndP + ProComponents 中后台 |        🚧        |
|                React + TS + Umi                |        🚧        |
|              React + TS 纯净(PC)               |        🚧        |
|       Vue3 + TS + ElementPlus  + 中后台        |        🚧        |
|                 Vue3 + TS 纯净                 |        🚧        |
|              Vue3组件库工程化模板              |        🚧        |
|             React组件库工程化模板              |        🚧        |
|         H5 ：React + AntM + Typescript         |        🚧        |
|                H5:   Vue3 + TS                 |        🚧        |
|              支付宝小程序 + antm               |        🚧        |
|          支付宝小程序组件库工程化模板          |        🚧        |
|   Node + TS + unbuild + Vitest 基础 Node模板   |        🚧        |
| Node + unbuild + Vitest + TS 基础 Cli 开发模板 |        🚧        |
|       Node + Koa + TS + faker  mock 插件       |        🚧        |
|               Vscode Plugin + TS               |        🚧        |
|                 Monorepo + CLI                 |        🚧        |
|                 Monorepo React                 |        🚧        |
|               VitePress 文档模板               |        🚧        |
|                ... 更多业务模板                |                 |
|                                                |                 |
|                                                |                 |
|                                                |                 |
|                                                |                 |
|                                                |                 |
|                                                |                 |
|                                                |                 |
|                                                |                 |
