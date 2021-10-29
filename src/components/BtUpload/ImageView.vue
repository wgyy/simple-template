<template>
  <img :src="fileUrl">
</template>

<script>
import { getImage } from './methods'
export default {
  props: {
    file: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      fileUrl: ''
    }
  },
  mounted() {
    getImage(this.file.fileUrl).then(res => {
      this.fileUrl = res
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
