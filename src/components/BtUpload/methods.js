import { preViewUrl } from './setting'
import axios from '@/utils/request'
export function getImage(url) {
  return axios.get(preViewUrl + url, {
    responseType: 'blob'
  }).then(res => {
    var url = URL.createObjectURL(res.data)
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 5000)
    return url
  })
}
