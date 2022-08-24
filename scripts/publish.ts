/**
 * TODO
 * 1. 选择模式(发布 更新 删除)
 * 2. 发布，逐行输入信息
 * 3. 更新，选择类型，选择已有模板，选择更新字段，输入信息，进行更新
 * 4. 删除，选择模板，二次确认删除
 */
import inquirer from 'inquirer'
import semver from 'semver'
import axios from 'axios'
import { getTemplateByNpmName, addSingleTemplate,updateSingleTemplateByNpmName,getTemplateListByType,TemplateListItem,deleteTemplateByNpmName } from '@vbs/magic-cli-templates'
import ora from 'ora'

export enum SelectType {
  PUBLISH = 'publish',
  UPDATE = 'update',
  DELETE = 'delete'
}
export type TemplateType = 'project' | 'component'

export const SelectChoices = [
  {
    name: '发布模板',
    value: 'publish',
  },
  {
    name: '变更模板',
    value: 'update',
  },
  {
    name: '删除模板',
    value: 'delete',
  },
]

export const updateChoices = [
  { name: '模板名称',value: 'name',},
  { name: 'NPM 包名称', value: 'npmName' },
  { name: '模板版本号', value: 'version' },
  { name: '模板安装命令', value: 'installCommand' },
  { name: '模板启动命令', value: 'startCommand' },
  { name: '模板忽略渲染目录', value: 'ignore' },
]

export async function getPromptQuestionsByType(type: TemplateType) {
 let questions: inquirer.Question<any>[] = [
   {
     name: 'name',
     type: 'input',
     message: '请输入模板名称',
     default: 'magic-project',
   },
   {
     name: 'npmName',
     type: 'input',
     message: '请输入模板发布的 NPM 包名称',
     validate: (value: string) => {
       return new Promise((resolve, reject) => {
         setTimeout(async () => {
           if (!value.startsWith('@vbs/')) {
             reject('NPM 包名称开头必须以 @vbs 开头')
             return
           }
           try {
             const data = await axios.get(`https://registry.npmjs.org/${value}`)
           } catch (e: any) {
             reject('模板 NPM 包必须先发布才被允许被同步到系统，请先阅读 README 文档发布模板')
             return
           }
           try {
             const data = await getTemplateByNpmName(value)
             if (!data) {
               resolve(true)
             }
             if (data && data.npmName) {
               reject('该模板已在系统中存在，如需进行更新操作请退出后操作')
               return
             }
           } catch (error) {
             reject('非法拦截')
             return
           }
           resolve(true)
         }, 0)
       })
     },
   },
   {
     name: 'version',
     type: 'input',
     message: '请输入模板版本号(请认真填写最新发布 NPM 的版本号，否则会出现模板版本错乱问题)',
     default: '1.0.0',
     validate: (value: string) => {
       return new Promise((resolve, reject) => {
         setTimeout(() => {
           if (!semver.valid(value)) {
             // eslint-disable-next-line prefer-promise-reject-errors
             reject('🚫 Invalid project Version')
             return
           }
           resolve(true)
         }, 0)
       })
     },
     filter: (value: string) => {
       if (semver.valid(value)) return semver.valid(value)
       return value
     },
   },
 ]
 if (type === 'project') {
   questions = questions.concat([
     {
       name: 'installCommand',
       type: 'input',
       message: '请输入模板项目依赖安装命令',
       default: 'npm run dev',
     },
     {
       name: 'startCommand',
       type: 'input',
       message: '请输入模板启动命令',
       default: 'npm install',
     },
     {
       name: 'ignore',
       type: 'input',
       message: '请输入需要忽略模板渲染的目录参数(输入值代表模板忽略该文件夹进行渲染，如有多个，请以英文逗号隔开)',
       default: ['**/public/**'],
       validate: (value: string) => {
         return new Promise((resolve, reject) => {
           setTimeout(() => {
             if (
               /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/.test(
                 value
               )
             ) {
               reject('不能包含中文字符！')
               return
             }
             resolve(true)
           }, 0)
         })
       },
     },
   ])
 }
  return questions
}

export async function handlePublish(type: TemplateType) {
  const questions = await getPromptQuestionsByType(type)
  const values = await inquirer.prompt(questions)
  const spinner = ora().start('正在发布模板，请稍等...')
  try {
    const { insertedId } = await addSingleTemplate({
      ...values,
      ignore: Array.isArray(values.ignore) ? values.ignore: values.ignore.split(','),
      type,
    })
    if (insertedId) {
      spinner.succeed('发布成功！')
    }
  } catch (error) {
    console.log(error)
    spinner.fail('发布失败')
  }
}

export async function handleUpdate(template: TemplateListItem) {
  const { updateFieldsKeys = [] } = await inquirer.prompt({
    name: 'updateFieldsKeys',
    type: 'checkbox',
    message: '请选择需要更新的属性',
    choices: template.type === 'component' ? updateChoices.slice(0,3) : updateChoices
  })

  let questions = await getPromptQuestionsByType(template.type)
  questions = questions.filter((item) => updateFieldsKeys.includes(item.name))

  const values = await inquirer.prompt(questions) 
  const sqinner = ora().start('正在更新模板，请稍后...')
  console.log({...values,})

  try {
    const { modifiedCount } = await updateSingleTemplateByNpmName(template.npmName, { "$set": values } as any)
    if (modifiedCount) {
      sqinner.succeed('更新成功')
    }
  } catch (error) {
    sqinner.fail('更新失败')
  }
}

export async function handleDelete() {
    const spinner = ora().start('正在搜索模板...')
    const { documents: templates = [] } = await getTemplateListByType('all')
    if (templates.length) {
         spinner.succeed('返回成功')
    }
    if (!templates || !templates.length) {
      spinner.fail('找不到系统模板！')
      throw new Error('找不到系统模板！')
    }
  
   const { delTemplateNpmNames, confirm } = await inquirer.prompt([
     {
       name: 'delTemplateNpmNames',
       type: 'checkbox',
       message: '请选择需要更新的模板',
       choices: templates.map((item) => {
         return {
           name: item.name,
           value: item.npmName,
         }
       }),
     },
     {
       name: 'confirm',
       type: 'confirm',
       message: '确定要删除选中的模板吗！',
     },
   ])
  const spinner1 = ora().start('正在删除模板...')
  try {
    if (!confirm || !delTemplateNpmNames.length) {
      spinner1.stop()
      process.exit(-1)
    }
    if (confirm) {
      const { deletedCount } = await deleteTemplateByNpmName(delTemplateNpmNames)
      if (deletedCount) {
        spinner1.succeed('删除成功')
      }
    }
  } catch (error) {
    spinner1.fail('删除失败')
  }
  
  
  
}

export async function core() {
  const { selectType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectType',
      message: '请选择操作',
      choices: SelectChoices,
    },
  ])

  switch (selectType) {
    case SelectType.PUBLISH:
      const { type } = await inquirer.prompt({
        name: 'type',
        type: 'list',
        message: '请选择模板类型',
        default: 'project',
        choices: [
          {
            name: '项目 🗂️',
            value: 'project',
          },
          {
            name: '组件 🧰',
            value: 'component',
          },
        ],
      })
      await handlePublish(type)
      break
    case SelectType.UPDATE:
      const spinner = ora().start('正在搜索模板...')
      const { documents: templates = [] } = await getTemplateListByType('all')
      if (templates.length) {
        spinner.succeed('返回成功')
      }
      if (!templates || !templates.length) {
        spinner.fail('找不到系统模板！')
        break
      }
      const { template } = await inquirer.prompt({
        name: 'template',
        type: 'list',
        message: '请选择需要更新的模板',
        choices: templates.map((item) => {
          return {
            name: item.name,
            value: item,
          }
        }),
      })
      await handleUpdate(template)
      break
    case SelectType.DELETE:
      await handleDelete()
      break
    default:
      break
  }
}

core()
