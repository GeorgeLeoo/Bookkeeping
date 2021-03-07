// miniprogram/pages/add/add.js
import Config from './../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHost: Config.IMG_HOST,
    navIndex: 0,
    iconIndex: 0,
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
  bindTabNav(e) {
    this.setData({
      navIndex: Number(e.currentTarget.dataset.index)
    })
  },
  async getCategorySetting() {
    // const db = wx.cloud.database()
    // const {
    //   data
    // } = await db.collection('categorySetting').get()
    const data = [
      {
        "_id": "b00064a76044d34208c7f46176ba34ae",
        "_openid": "o14jn5DCGjHcuxdR_3yR9P9204CA",
        "in": {
          "addList": [
            {
              "icon": "/assets/cc_entertainmente_game.png",
              "name": "游戏",
              "type": "system"
            },
            {
              "icon": "/assets/cc_entertainmente_ping_pong.png",
              "name": "乒乓",
              "type": "system"
            }
          ],
          "delList": [
            {
              "icon": "/assets/cc_entertainmente_swimming.png",
              "name": "游泳",
              "type": "system"
            }
          ]
        },
        "out": {
          "addList": [
            {
              "icon": "/assets/cc_entertainmente_game.png",
              "name": "游戏",
              "type": "system"
            },
            {
              "icon": "/assets/cc_entertainmente_ping_pong.png",
              "name": "乒乓",
              "type": "system"
            },
            {
              "icon": "/assets/cc_entertainmente_movies.png",
              "name": "电影演出",
              "type": "custom"
            },
            {
              "icon": "/assets/cc_entertainmente_whirligig.png",
              "name": "滑雪",
              "type": "system"
            }
          ],
          "delList": [
            {
              "icon": "/assets/cc_entertainmente_swimming.png",
              "name": "游泳",
              "type": "system"
            },
            {
              "icon": "/assets/cc_entertainmente_chess_s.png",
              "name": "象棋",
              "type": "system"
            }
          ]
        }
      }
    ]
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
  bindtapIcon(e) {
    this.setData({
      iconIndex: e.currentTarget.dataset.index
    })
  },
  bindKeyboardOk() {
    console.log('bindKeyboardOk');
  }
})