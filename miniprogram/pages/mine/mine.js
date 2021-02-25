// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isPunchCard: false,
    punchConsecutiveDays: 2,
    totalDays: 293,
    billTotalCount: 215,
    menuList: [
      {
        icon: '../../assets/me_item_guide_msg_ic.png',
        text: '消息'
      },
      {
        icon: '../../assets/me_item_guide_badge_ic.png',
        text: '我的徽章'
      },
      {
        icon: '../../assets/me_item_guide_reward_ic.png',
        text: '我的积分'
      },
      {
        icon: '../../assets/me_item_guide_recommend_ic.png',
        text: '邀请好友'
      },
      {
        icon: '../../assets/me_item_guide_setting_ic.png',
        text: '设置'
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

  }
})