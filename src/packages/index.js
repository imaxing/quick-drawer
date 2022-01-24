import Vue from 'vue'
import QuickModal from './quick-drawer'

const QuickModalConstructor = Vue.extend(QuickModal)
let drawerCount = 0
export default (options = {}) => {
  const instance = new QuickModalConstructor({
    data: {
      ...options,
      wrapClassName: [
        'quick-drawer',
        options.buttons && options.buttons.length > 0 ? 'show-footer' : '',
        `quick-drawer__${++drawerCount}`
      ].join(' '),
      destroy() {
        document.querySelector(`.quick-drawer__${drawerCount}`).parentElement.remove()
        --drawerCount
        document.body.style = ''
      }
    }
  })
  instance.$mount()

  Vue.nextTick(() => {
    if (instance.visible) return
    instance.visible = true
    document.body.style = 'overflow: hidden'
  })

  return instance
}
