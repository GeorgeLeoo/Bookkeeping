/**
 * 对原生的 loading 封装，因为不需要这个多选项，减少代码量
 */
export const showLoading = (title = '') => {
  wx.showLoading({
    title,
    mask: true
  })
}

export const hideLoading = () => wx.hideLoading()

export default showLoading