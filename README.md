# 待编写模板仓库使用文档


## 发布

```shell
git add .
git commit -m "chore: publish"
rush change
rush publish --apply
# 正式发布npm
rush publish -p --include-all -n <替换成你的 npm TOKEN>
```
