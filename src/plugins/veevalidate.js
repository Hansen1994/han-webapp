import { extend, localize } from 'vee-validate'
// eslint-disable-next-line
import {
  required,
  email,
  min,
  length,
  confirmed,
  max,
  is_not
} from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('min', min)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)
extend('max', max)
extend('is_not', is_not)

// Custom validate
extend('name', {
  validate: (value) => {
    return !/^\d+/.test(value)
  },
  message: '不能以纯数字为昵称'
})
// 密码不能以数组组成
extend('noNumber', {
  validate: (value) => {
    return !/^\d+/.test(value)
  },
  message: '不能以纯数字为密码'
})

localize('zh_CN', {
  // 使用扩展运算符，扩展中文包
  messages: {
    ...zh.messages,
    // 全局定义message
    required: '请输入{_field_}'
  },
  // 与validation-provider中的name对应
  // key为name, value为对应的中文field名称
  names: {
    email: '邮箱',
    password: '密码',
    repassword: '确认密码',
    oldpassword: '旧密码',
    name: '昵称',
    username: '账号',
    code: '验证码',
    title: '标题',
    catalog: '分类'
  },
  // 针对不同的name(key)，定义不同的message消息
  fields: {
    catalog: {
      // is_not 必需是extend注册过的，下面同理, 然后通过 “|is_not” 调用
      is_not: '请选择{_field_}'
    },
    email: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}'
    },
    name: {
      min: (field, { length }) => {
        return `请在${field}输入至少${length}个字符`
      }
    },
    code: {
      length: (field, { length }) => {
        return `${field}为${length}长度哦`
      }
    },
    // 输入密码
    password: {
      min: (field, { length }) => {
        return `${field}长度至少为${length}个`
      },
      max: (field, { length }) => {
        return `${field}长度至多为${length}个`
      }
    },
    // 两次密码不一致
    repassword: {
      confirmed: (field, { target }) => {
        return `两次输入的${field}不一致！`
      }
    }
  }
})
