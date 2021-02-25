// miniprogram/pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settings: [
      [
        {
          icon: '../../assets/me_category.png',
          text: '类别设置',
          type: 'classSetting'
        },
        {
          icon: '../../assets/me_export.png',
          text: '导出数据',
          type: 'exportExcel'
        }
      ],
      [
        {
          icon: '../../assets/me_recommend.png',
          text: '邀请好友',
          type: 'inviteFriends'
        },
        {
          icon: '../../assets/me_feedback.png',
          text: '意见反馈',
          type: 'feedback'
        },
        {
          icon: '../../assets/me_help.png',
          text: '帮助',
          type: 'help'
        },
        {
          icon: '../../assets/setting_privacy.png',
          text: '隐私协议',
          type: 'feedback'
        },
        {
          icon: '../../assets/setting_about.png',
          text: '关于我们',
          type: 'about'
        },
      ]
    ]
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

  }
})