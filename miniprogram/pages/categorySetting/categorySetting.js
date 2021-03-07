// miniprogram/pages/categorySetting/categorySetting.js
import Config from './../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    imgHost: Config.IMG_HOST,
    tabList: [{
        label: '支出',
        value: 'OUT',
        index: 0
      },
      {
        label: '收入',
        value: 'IN',
        index: 1
      },
    ],
    categorySettingList: [],
    outAddList: [],
    outDelList: [],
    inAddList: [],
    inDelList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategorySetting()
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
  bindTabChange({detail}) {
    this.setData({
      index: detail.index
    })
  },
  bindToAddCategory() {
    const list = ['OUT', 'IN']
    wx.navigateTo({
      url: `/pages/addCategory/addCategory?type=${list[this.data.index]}`,
    })
  },
  async getCategorySetting() {
    const db = wx.cloud.database()
    const {
      data
    } = await db.collection('categorySetting').get()
    const item = data[0]
    if (item) {
      this.setData({
        outAddList: item.out.addList,
        outDelList: item.out.delList,
        inAddList: item.in.addList,
        inDelList: item.in.delList,
      })
    }
  },
})