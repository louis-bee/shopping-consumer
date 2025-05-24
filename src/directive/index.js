
import Vue from 'vue'
import lazy from './lazy'

const directive = {
  lazy // 图片懒加载
}

// 注册指令
Object.keys(directive).forEach((k) => Vue.directive(k, directive[k]))
