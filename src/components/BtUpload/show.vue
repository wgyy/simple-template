<template>
  <div v-download class="container" :title="showTitle ? file.fileName : ''">
    <div class="default">
      <template v-if="file.fileType == 'IMAGE'">
        <image-view :file="file" />
      </template>
      <template v-else>
        <div
          style="
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          "
        >
          <div><i class="el-icon-document" style="font-size: 80px" /></div>
          <div>{{ file.fileName }}</div>
        </div>
      </template>
    </div>
    <div class="delete">
      <i
        v-if="file.fileType == 'IMAGE'"
        class="el-icon-zoom-in"
        @click="handlerPrewView"
      />
      <i
        v-if="file.fileType == 'FILE'"
        class="el-icon-download"
        @click="handlerDownload"
      />
      <i v-if="!readOnly" class="el-icon-delete" @click="handlerDelete" />
    </div>
  </div>
</template>

<script>
import { preViewUrl, downloadUrl } from './setting'
import axios from '@/utils/request'
import ImageView from './ImageView'
export default {
  name: 'BtShowFile',
  components: {
    ImageView
  },
  directives: {
    download: {
      inserted: function(el, binding) {
        el.onmouseenter = function() {
          el.querySelector('.delete').style.opacity = 1
        }
        el.onmouseleave = function() {
          el.querySelector('.delete').style.opacity = 0
        }
      }
    }
  },
  props: {
    fileName: {
      type: String,
      default: () => {
        return ''
      }
    },
    type: {
      type: String,
      default: () => {
        return ''
      }
    },
    id: {
      type: String,
      default: () => {
        return ''
      }
    },
    file: {
      type: Object,
      default: () => {
        return {}
      }
    },
    readOnly: {
      type: Boolean,
      default: () => {
        return false
      }
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
      preViewUrl: this.baseUrl + preViewUrl,
      downloadUrl: this.baseUrl + downloadUrl
    }
  },
  methods: {
    handlerPrewView() {
      this.$emit('preView', this.file)
    },
    handlerDelete() {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('delete', this.file)
        })
        .catch(() => {})
    },
    handlerDownload() {
      axios({
        method: 'get',
        url: this.downloadUrl + this.file.fileUrl,
        responseType: 'blob'
      }).then((res) => {
        var fileName = this.file.fileName
        const blob = new Blob([res.data])
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      })
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.container {
  display: inline-block;
  width: 146px;
  height: 146px;
  text-align: center;
  border: 1px solid #c0ccda;
  margin: 0 8px 8px 0;
  position: relative;
}

.delete {
  position: absolute;
  opacity: 0;
  left: 0;
  top: 0;
  border: 1px dotted #ccc;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: space-around;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}

.default {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  word-break: break-all;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

p {
  padding: 0px;
  margin: 0px;
}

.default i {
  font-size: 50px;
}

.delete div {
  display: flex;
  flex: 1;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}

.delete div:hover i {
  color: #fff;
}

.delete div:first-child:hover {
  background-color: #f56c6c;
}

.delete div:last-child:hover {
  background-color: #67c23a;
}

.delete i {
  font-size: 22px;
  color: #fff;
  cursor: pointer;
}
</style>
