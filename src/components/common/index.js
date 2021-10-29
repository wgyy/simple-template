import BtButton from '../Button/index'
import BtCustomUpload from '@/components/common/BtCustomUpload'
import BtCustomShowFileList from '@/components/common/BtCustomShowFileList'
const components = [
  BtButton,
  BtCustomUpload,
  BtCustomShowFileList
]
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default install
