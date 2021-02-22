// miniprogram/pages/login/login.js
import toast from '../../utils/toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * @description 是否同意协议
     */
    isAgree: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 点击 协议同意
   * @param {*} e 
   */
  bindAgreementChange(e) {
    this.setData({
      isAgree: e.detail.value.length === 1
    })
  },
  /**
   * 点击 登录/注册 或者  微信快速登录
   */
  bindLogin() {
    if (!this.isAgree) {
      toast('请先勾选底部同意协议选项')
      return
    }
  },
})
