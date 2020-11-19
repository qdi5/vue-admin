import defaultSettings from '@/settings'

const title = defaultSettings.title || '商城管理后台'

// 获取页面title
export function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

// 循环调用Vue.use
export default function batVueUse (Vue, componentArray) {
  componentArray.forEach(component => {
    Vue.use(component)
  })
}
