// miniprogram/pages/login/login.js
import toast, {
  hideToast
} from '../../utils/toast'
import loading, {
  hideLoading
} from '../../utils/loading'
import Config from '../../config/config'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * @description 是否同意协议
     */
    isAgree: false,
    username: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    hideToast()
  },
  /**
   * 点击 登录/注册 或者  微信快速登录
   */
  async bindLogin({ target }) {
    // 1. 判断是否勾选
    if (!this.data.isAgree) {
      toast('请先勾选底部同意协议选项')
      return
    }
    // 2. 当点击 登录/注册 按钮时，检查用户名密码是否为空
    if (target.dataset.type === 'base-login') {
      if (!this.data.username) {
        toast('用户名不能为空')
        return
      }
      if (!this.data.password) {
        toast('密码不能为空')
        return
      }
    }

    loading()
    // 3. 是否授权过 userInfo
    const { authSetting } = await wx.getSetting()
    if (!authSetting['scope.userInfo']) {
      // 未授权，去授权
      this.getAuthorize(target)
    }
    this.getOpenId()
    const isOk = await this.setUserInfo(target)
    if (!isOk) {
      return
    }
    this.toHome()
    hideLoading()
  },
  /**
   * LOGIN
   */
  async getOpenId() {
    // 登录
    const { result } = await wx.cloud.callFunction({
      name: 'login',
      data: {}
    })
    // console.log('[云函数] [login] user openid: ', result.openid)
    app.globalData.openid = result.openid
  },
  async getAuthorize(target) {
    await wx.authorize({
      scope: 'scope.userInfo'
    })
  },
  /**
   * 能否去首页
   * @param {{}} userInfo 
   */
  async canToHome(userInfo = {}, type) {
    // 判断是已经注册过
    let users = await this.getUserByOpenId()
    // 未注册
    if (!users || users.length === 0) {
      await this.insertUser(userInfo)
      return true
    }
    // 已注册
    if (users.length === 1) {
      const user = users[0]
      // 微信快捷登录
      if (type === 'wx-login') {
        return true
      }
      // 使用 微信/注册 按钮 登陆
      if (!user.username) { // 之前使用微信快捷登录
        await this.updateUser(userInfo, user._id) // 去更新用户名和密码
      } else {
        if (userInfo.username !== user.username || userInfo.password !== user.password) {
          toast('账号或密码错误', 'error')
          return false
        }
      }
    }
    return true
  },
  /**
   * 设置用户信息
   */
  async setUserInfo(target) {
    const { userInfo } = await wx.getUserInfo()
    wx.setStorageSync('userInfo', userInfo)

    // 点击 登录/注册 按钮，设置用户名和密码
    if (target.dataset.type === 'base-login') {
      userInfo.username = this.data.username
      userInfo.password = this.data.password
    }
    return this.canToHome(userInfo, target.dataset.type)
  },
  /**
   * 更新用户信息
   */
  async updateUser(userInfo, _id) {
    const db = wx.cloud.database()
    return db.collection('users').doc(_id).update({
      data: {
        ...userInfo
      }
    })
  },
  /**
   * 通过 openid 查询用户
   */
  async getUserByOpenId() {
    const db = wx.cloud.database()
    const users = await db.collection('users').get({
      data: {
        _openid: app.globalData.openid
      }
    })
    return users.data
  },
  /**
   * 插入数据
   * @param {{}} userInfo 用户信息
   */
  insertUser(userInfo = {}) {
    const db = wx.cloud.database()
    return db.collection('users').add({
      data: {
        ...userInfo
      }
    })
  },
  /**
   * 跳转首页
   */
  toHome() {
    wx.switchTab({
      url: '/pages/detail/detail',
    })
  },
  /**
   * 绑定输入框
   */
  bindInput({ detail, target }) {
    this.setData({
      [target.dataset.type]: detail.value
    })
  }
})