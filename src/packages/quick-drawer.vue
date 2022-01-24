<script>
export default {
  name: 'QuiuckDrawer',
  data: () => ({
    buttons: [],
    title: null,
    width: 800,
    closable: true,
    keyboard: true,
    maskClosable: true,
    mask: true,
    visible: false,
    wrapClassName: '',
    component: null,
    afterClose: null,
    destroy: null,
    buttonLoadingKeys: [],
    buttonDisabledKeys: [],
    getContainer: () => document.body,
    callback: null
  }),
  methods: {
    onClose() {
      this.visible = false
      this.afterClose && this.afterClose()
      const timer = setTimeout(() => {
        this.buttons = []
        this.buttonDisabledKeys = []
        this.buttonDisabledKeys = []
        this.loading = false
        this.wrapClassName = ''
        this.title = null
        this.component = null
        this.destroy && this.destroy()
        clearTimeout(timer)
      }, 400)
    },
    async onButtonClicked(button) {
      if (!button.callback) return
      if (typeof button.callback === 'string') {
        if (!this.$refs.vNodeComponent) return
        this.$refs.vNodeComponent[button.callback](button.params)
        return
      }
      if (button.confirm) {
        window.antd.Modal.confirm({
          content: `是否确认${button.text}?`,
          cancelText: '再想一想',
          okText: button.text,
          onCancel: () => button.cancel && button.cancel(),
          onOk: () => button.callback && button.callback()
        })
        return
      }
      button.callback && button.callback()
    }
  },
  render: function (h) {
    const {
      visible,
      maskClosable,
      wrapClassName,
      buttonLoadingKeys,
      buttonDisabledKeys,
      buttons,
      loading,
      title,
      width,
      closable,
      keyboard,
      placement,
      callback,
      component,
      getContainer,
      onButtonClicked,
      onClose,
      mask,
      full
    } = this

    const closeButton = closable ? [{ text: '关闭', type: 'text', callback: onClose }] : []
    return h(
      'a-drawer',
      {
        props: {
          width: full ? '100%' : width,
          destroyOnClose: true,
          closable: false,
          keyboard,
          visible,
          maskClosable,
          mask,
          getContainer,
          placement,
          wrapClassName
        },
        on: {
          afterVisibleChange: v => !v && onClose(),
          close: onClose
        },
        scopedSlots: {
          title: () =>
            h('div', { class: 'quick-drawer__head' }, [
              h('strong', typeof title === 'function' ? title(h) : title),
              h(
                'div',
                [...buttons, ...closeButton].map(button =>
                  h(
                    'a-button',
                    {
                      key: button.name,
                      props: {
                        type: button.type || 'primary',
                        icon: button.icon,
                        loading: loading || button.loading || buttonLoadingKeys.includes(button.name),
                        disabled: button.disabled || buttonDisabledKeys.includes(button.name)
                      },
                      on: { click: () => onButtonClicked(button) }
                    },
                    button.text
                  )
                )
              )
            ])
        }
      },

      component && [
        typeof component === 'function'
          ? component(h, this)
          : component instanceof Object
          ? h(component, {
              ref: 'vNodeComponent',
              on: {
                callback: () => callback && callback(this),
                'update:loading': v => (this.loading = v),
                'update:buttons': v => (this.buttons = v),
                'update:visible': v => {
                  this.visible = v
                  onClose()
                },
                'update:title': v => (this.title = v),
                'update:disabled-keys': v => (this.buttonDisabledKeys = v),
                'update:loading-keys': v => (this.buttonLoadingKeys = v)
              }
            })
          : component
      ]
    )
  }
}
</script>

<style lang="less">
div.quick-drawer {
  .ant-drawer-wrapper-body {
    height: 100vh;
    overflow: hidden;
  }
  &.show-footer .ant-drawer-body {
    height: calc(100vh - 55px);
    overflow-y: auto;
  }
  .ant-drawer-header {
    padding: 0;
  }
  .quick-drawer__head {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
  }
  .quick-drawer__head .ant-btn:not(:last-of-type) {
    margin-right: 4px;
  }
}
</style>
