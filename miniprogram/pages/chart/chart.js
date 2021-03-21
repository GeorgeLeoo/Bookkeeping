// miniprogram/pages/chart/chart.js
import Config from './../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    imgHost: Config.IMG_HOST,
    headerType: 'OUT',
    HEADER_MAP: {
      IN: '收入',
      OUT: '支出'
    },
    headerList: [
      {
        label: '支出',
        type: 'OUT',
        icon: '/assets/ic_expenses.png'
      },
      {
        label: '收入',
        type: 'IN',
        icon: '/assets/ic_expenses.png'
      },
    ],
    tabList: [{
        label: '周',
        value: 'WEEK',
        index: 0
      },
      {
        label: '月',
        value: 'MONTH',
        index: 1
      },
      {
        label: '年',
        value: 'YEAR',
        index: 2
      },
    ],
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
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
  bindTabChange({detail}) {
    this.setData({
      index: detail.index
    })
  },
})