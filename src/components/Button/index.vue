<template>
  <el-button
    v-bind="$attrs"
    :loading="loading"
    @click="handleClick"
  >
    <slot>按钮</slot>
  </el-button>
</template>

<script>
export default {
  name: 'BtButton',
  props: {
    beforeClick: {
      type: Function,
      default() {
        return true
      }
    },
    click: {
      type: Function,
      default() {
        return true
      }
    },
    afterClick: {
      type: Function,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async handleClick() {
      try {
        this.loading = true
        const res = await this.beforeClick()
        const res1 = await this.click(res)
        await this.afterClick(res1)
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    }
  }
}
</script>
