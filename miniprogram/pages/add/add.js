// miniprogram/pages/add/add.js
import Config from './../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHost: Config.IMG_HOST,
    navIndex: 0,
    iconIndex: -1,
    outAddList: [],
    outDelList: [],
    inAddList: [],
    inDelList: [],
    showKeyboard: false
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
      iconIndex: -1,
      showKeyboard: false,
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
        "_id": "3f1780f4605372c10345333a73d7c357",
        "_openid": "o14jn5DCGjHcuxdR_3yR9P9204CA",
        "in": {
          "delList": [
            {
              "icon": {
                "base": "/assets/cc_entertainmente_swimming_s.png",
                "normal": "/assets/cc_entertainmente_swimming.png",
                "selected": "/assets/cc_entertainmente_swimming_selected.png"
              },
              "name": "游泳",
              "type": "system"
            }
          ],
          "addList": [
            {
              "icon": {
                "base": "/assets/cc_entertainmente_game_s.png",
                "normal": "/assets/cc_entertainmente_game.png",
                "selected": "/assets/cc_entertainmente_game_selected.png"
              },
              "name": "游戏",
              "type": "system"
            },
            {
              "icon": {
                "base": "/assets/cc_entertainmente_ping_pong_s.png",
                "normal": "/assets/cc_entertainmente_ping_pong.png",
                "selected": "/assets/cc_entertainmente_ping_pong_selected.png"
              },
              "name": "乒乓",
              "type": "system"
            }
          ]
        },
        "out": {
          "addList": [
            {
              "icon": {
                "base": "/assets/cc_entertainmente_game_s.png",
                "normal": "/assets/cc_entertainmente_game.png",
                "selected": "/assets/cc_entertainmente_game_selected.png"
              },
              "name": "游戏",
              "type": "system"
            },
            {
              "icon": {
                "base": "/assets/cc_entertainmente_ping_pong_s.png",
                "normal": "/assets/cc_entertainmente_ping_pong.png",
                "selected": "/assets/cc_entertainmente_ping_pong_selected.png"
              },
              "name": "乒乓",
              "type": "system"
            },
            {
              "icon": {
                "base": "/assets/cc_entertainmente_movies_s.png",
                "normal": "/assets/cc_entertainmente_movies.png",
                "selected": "/assets/cc_entertainmente_movies_selected.png"
              },
              "name": "电影演出",
              "type": "custom"
            },
            {
              "icon": {
                "base": "/assets/cc_entertainmente_whirligig_s.png",
                "normal": "/assets/cc_entertainmente_whirligig.png",
                "selected": "/assets/cc_entertainmente_whirligig_selected.png"
              },
              "name": "滑雪",
              "type": "system"
            }
          ],
          "delList": [
            {
              "icon": {
                "base": "/assets/cc_entertainmente_swimming_s.png",
                "normal": "/assets/cc_entertainmente_swimming.png",
                "selected": "/assets/cc_entertainmente_swimming_selected.png"
              },
              "name": "游泳",
              "type": "system"
            },
            {
              "icon": {
                "base": "/assets/cc_entertainmente_chess_s.png",
                "normal": "/assets/cc_entertainmente_chess.png",
                "selected": "/assets/cc_entertainmente_chess_selected.png"
              },
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
    const animation = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease',
      delay: 1000
    })
    animation.opacity(1).step()
    this.setData({
      showKeyboard: true,
      iconIndex: e.currentTarget.dataset.index,
      animation: animation.export()
    })
  },
  bindKeyboardOk(e) {
    const { money, date, remark } = e.detail
    wx.showLoading()
    this.addDetail({money, date, remark}).then(() => {
      this.setData({
        showKeyboard: false,
      })
      wx.navigateBack()
    }).finally(() => {
      wx.hideLoading()
    })
  },
  addDetail({money, date, remark}) {
    date = date.replaceAll('/', '-')
    const iconList = this.data.navIndex === 0 ? this.data.outAddList : this.data.inAddList
    const db = wx.cloud.database()
    return db.collection('detail').add({
      data: {
        money,
        date: new Date(date),
        remark,
        type: this.data.navIndex === 0 ? 'OUT' : 'IN',
        icon: iconList[this.data.iconIndex]
      }
    })
  }
})
