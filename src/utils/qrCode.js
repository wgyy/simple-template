import QRCode from 'qrcode'
import { saveAs } from 'file-saver'
const websiteUrl = process.env.VUE_APP_WEBSITE
export function downloadQrCode(text, fileName = '二维码') {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  QRCode.toCanvas(canvas, `${websiteUrl}/detail/${text}`, {
    width: 200
  }, (error) => {
    if (error) {
      this.$message.error(error)
    } else {
      canvas.toBlob(blob => {
        saveAs(blob, `${fileName}.jpg`)
        document.body.removeChild(canvas)
      })
    }
  })
}

export function render(target, text, options) {
  return new Promise(resolve => {
    QRCode.toCanvas(target, `${websiteUrl}/detail/${text}`, options, (error) => {
      if (error) {
        this.$message.error(error)
      }
      resolve()
    })
  })
}
