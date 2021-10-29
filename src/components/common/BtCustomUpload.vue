<template>
  <bt-upload
    ref="btUpload"
    class="file-upload"
    :is-uploading.sync="isUploading"
    :file-size="4"
    file-path="wx-demo"
    v-bind="$attrs"
    :base-url="baseUrl"
    :show-title="true"
    @click.native="handleNativeClick"
    v-on="$listeners"
  >
    <slot />
    <template #tip>
      <slot name="tip" />
    </template>
  </bt-upload>
</template>

<script>
import BtUpload from '@/components/BtUpload/play'
export default {
  name: 'BtCustomUpload',
  components: {
    BtUpload
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      isUploading: false
    }
  },
  methods: {
    clearFiles() {
      this.$refs.btUpload.clearFiles()
    },
    init() {
      this.$refs.btUpload.init()
    },
    handleNativeClick(e) {
      if (this.isUploading) {
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.file-upload {
  ::v-deep {
    .default > div > div:nth-child(2) {
      text-overflow: ellipsis;
      width: 130px;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
