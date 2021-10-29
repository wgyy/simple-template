<template>
  <bt-show-file-list class="file-list" :base-url="baseUrl" read-only v-bind="$attrs" :show-title="true" v-on="$listeners" />
</template>

<script>
import BtShowFileList from '@/components/BtUpload/fileListShow.vue'
export default {
  name: 'BtCustomShowFileList',
  components: {
    BtShowFileList
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API
    }
  }
}
</script>

<style lang="scss" scoped>
.file-list{
  ::v-deep{
    .default>div>div:nth-child(2){
      text-overflow: ellipsis;
      width: 130px;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
