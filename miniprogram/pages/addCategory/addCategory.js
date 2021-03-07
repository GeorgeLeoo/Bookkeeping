// miniprogram/pages/addCategory/addCategory.js
import Config from './../../config/config'

Page({
  pageData: {
    type: ''
  },

  /**
   * 页面的初始数据
   */
  data: {
    category: '',
    categoryList: [],
    imgHost: Config.IMG_HOST,
    rowIndex: 0,
    colIndex: 0,
    selectedIcon: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pageData.type = options.type ? options.type : 'OUT'
    this.setTitle()
    this.getCategory()
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
  setTitle() {
    const titleMap = {
      OUT: '添加支出类别',
      IN: '添加收入类别',
    }
    wx.setNavigationBarTitle({
      title: titleMap[this.pageData.type],
    })
  },
  bindDelInput() {
    this.setData({
      category: ''
    })
  },
  async getCategory() {
    const db = wx.cloud.database()
    const { data } = await db.collection('category').get()
    this.setData({
      categoryList: data,
      selectedIcon: data[0].icons[0].selected
    })
  },
  bindIconTab({currentTarget}) {
    const { rowindex, colindex } = currentTarget.dataset
    this.setData({
      rowIndex: rowindex,
      colIndex: colindex,
      selectedIcon: this.data.categoryList[rowindex].icons[colindex].selected
    })
  }
})