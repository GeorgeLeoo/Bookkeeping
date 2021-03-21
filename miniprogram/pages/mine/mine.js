// miniprogram/pages/mine/mine.js
import Config from './../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHost: Config.IMG_HOST,
    userInfo: {},
    isPunchCard: false,
    punchConsecutiveDays: 2,
    totalDays: 293,
    billTotalCount: 215,
    menuList: [
      {
        icon: '/assets/me_item_guide_msg_ic.png',
        text: '消息',
        url: '/pages/setting/setting'
      },
      {
        icon: '/assets/me_item_guide_badge_ic.png',
        text: '我的徽章',
        url: '/pages/setting/setting'
      },
      {
        icon: '/assets/me_item_guide_reward_ic.png',
        text: '我的积分',
        url: '/pages/setting/setting'
      },
      {
        icon: '/assets/me_item_guide_recommend_ic.png',
        text: '邀请好友',
        url: '/pages/setting/setting'
      },
      {
        icon: '/assets/me_item_guide_setting_ic.png',
        text: '设置',
        url: '/pages/setting/setting'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    })
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
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
  bindMenuTab({currentTarget}) {
    wx.navigateTo({
      url: currentTarget.dataset.item.url,
    })
  }
})