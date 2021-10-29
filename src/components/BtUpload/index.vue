<template>
  <div>
    <el-upload
      ref="upload"
      :file-list="fileList"
      :action="baseUrl+'/opc/file/uploadFile'"
      :limit="limit"
      :on-exceed="handlerExceed"
      :on-success="handlerSuccess"
      :headers="_headers"
      :data="fileData"
      v-bind="$attrs"
      :show-file-list="false"
      :on-error="handlerError"
      :before-upload="handlerBeforeUpload"
    >
      <slot>
        <el-button size="small" type="primary">点击上传</el-button>
      </slot>
      <div v-if="showTip" slot="tip" class="el-upload__tip">
        <slot name="tip">
          <template v-if="$attrs.accept">
            只能上传{{ $attrs.accept }}文件，且不超过{{ fileSize }}MB
          </template>
          <template v-else>
            可以上传所有类型文件，大小不超过{{ fileSize }}MB
          </template>
        </slot>
      </div>
    </el-upload>
    <div v-if="showFileList">
      <file-list-show :show-title="showTitle" :base-url="baseUrl" :file-list="fileList" @delete="handlerDelete" />
    </div>
  </div>
</template>

<script>
import FileListShow from './fileListShow'
export default {
  name: 'BtUpload',
  components: {
    FileListShow
  },
  props: {
    showTip: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 0
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    filePath: {
      type: String,
      default: ''
    },
    headers: {
      type: Object,
      default: () => {}
    },
    beforeUpload: {
      type: Function,
      default: () => {
        return true
      }
    },
    fileSize: {
      type: Number,
      default: 10
    },
    baseUrl: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      dialogVisible: false,
      imgSrc: '',
      originFileList: this.fileList.slice(0), // 由于element组件的限制，不加这个参数的话，limit判断会有问题，这个注释写的有点晚，大概是这么个情况。。。更新，去除这个参数试试，验证是否可行
      originHeaders: {
        Authorization: `Bearer ${this.$store.state.user.token}`
      }
    }
  },
  computed: {
    _headers() {
      return Object.assign({}, this.originHeaders, this.headers)
    },
    fileData() {
      return {
        filePath: this.filePath
      }
    }
  },
  methods: {
    handlerError(err, file, fileList) {
      try {
        var result = JSON.parse(err.message)
        this.$message.error(result.message || '上传失败，请联系管理员')
      } catch (e) {
        this.$message.error(e)
      }
    },
    handlerSuccess(response, file, fileList) {
      var result = response.data[0]
      var id = ''
      if (result.fileType === 'img') {
        id = result.attachmentPath + result.attachmentName
      } else if (result.fileType === 'file') {
        id = result.bucketName + '/' + result.attachmentPath + result.attachmentName
      }
      this.$emit('success', {
        id: id,
        fileName: file.name,
        fileType: result.fileType
      })
    },
    isPicture(fileName) {
      return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileName)
    },
    handlerDelete(file) {
      // // 获取删除的对象的index，判断中的ID是success函数中的id
      // var index = this.fileList.findIndex(item => {
      //   return item.id === file.id
      // })
      // // 这里的删除在有原始数据的情况下，获取的index其实是有问题的，但是这里主要是为了limit服务，
      // // 因此只要删除一个元素就可以达到目的，暂且就这样吧。
      // this.$refs.upload.uploadFiles.splice(index, 1)

      this.$emit('delete', file)
    },
    handlerExceed() {
      this.$message.error(`文件上限个数${this.limit}个，已超出上限`)
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    init() {
      this.$nextTick(() => {
        this.originFileList = this.fileList.slice(0)
      })
    },
    handlerBeforeUpload(file) {
      console.log(file)
      if (this.beforeUpload(file)) {
        const fileSize = file.size
        const fileMB = fileSize / 1024 / 1024
        if (fileMB > this.fileSize) {
          this.$message.error(`文件大小${fileMB.toFixed(2)}MB，已超出限制，最大为${this.fileSize}MB`)
          return false
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
