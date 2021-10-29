import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // set page title
  var subTitle = (to.meta.title && (' - ' + to.meta.title)) || ''
  document.title = '中国专利产品备案系统' + subTitle
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
