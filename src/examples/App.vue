<template>
  <div class="app">
    <button @click="test">测试</button>
  </div>
</template>

<script>
import Test from './Test'
export default {
  name: 'App',
  methods: {
    handleSubmit() {
      this.quickDrawerShow({
        title: '提交',
        width: 1000,
        component: { render: h => h('h1', '哈哈哈') }
      })
    },
    test() {
      this.quickDrawerShow({
        title: '测试标题',
        component: Test,
        buttons: [{ text: '手动关闭', confirm: true, callback: 'handleSubmit' }]
      })
    }
  }
}
</script>

<style>
.app {
  width: 1200px;
  height: 1200px;
  border: 1px solid #000;
  margin: 0 auto;
}
</style>
