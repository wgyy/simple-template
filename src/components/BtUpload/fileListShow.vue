<template>
  <div>
    <div class="file-list-container">
      <file-show
        v-for="item in fileList"
        :key="item.fileId"
        :file="item"
        :read-only="readOnly"
        :base-url="baseUrl"
        :show-title="showTitle"
        @preView="handlerPreview"
        @delete="handlerDelete"
      />
    </div>
    <div />
    <el-dialog title="预览" :visible.sync="dialogVisible" width="50%" append-to-body>
      <div style="text-align:center">
        <img :src="imgSrc" alt style="max-width:100%;max-height:100%;margin:0 auto;">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { preViewUrl } from './setting'
import FileShow from './show'
import { getImage } from './methods'
export default {
  name: 'BtShowFileList',
  components: {
    FileShow
  },
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    baseUrl: {
      type: String,
      default: 'https://webapi.baiten.cn'
    },
    showTitle: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      imgSrc: '',
      preViewUrl: this.baseUrl + preViewUrl,
      dialogVisible: false
    }
  },
  methods: {
    handlerPreview(file) {
      getImage(file.fileUrl).then(res => {
        this.imgSrc = res
        this.dialogVisible = true
      })
    },
    handlerDelete(file) {
      this.$emit('delete', file)
    }
  }
}
</script>

<style lang="scss" scoped>
.file-list-container {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>
