/**
 * 对原生的 toast 封装，因为不需要这个多选项，减少代码量
 */
const toast = (title, icon = 'none') => {
  wx.showToast({
    title,
    icon
  })
}

export default toast