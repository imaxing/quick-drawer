<template>
  <div style="height: 500px">
    <button @click="handleSubmit">测试</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  methods: {
    handleSubmit(params) {
      this.$emit('update:title', '触发成功')
    }
  }
}
</script>
