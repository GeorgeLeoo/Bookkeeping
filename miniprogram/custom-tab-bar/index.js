Component({
  data: {
    selected: 1,
    color: "#7A7E83",
    "selectedColor": "#333",
    "list": [
      {
        "pagePath": "/pages/detail/detail",
        "text": "明细",
        "iconPath": "/assets/bottom_detail_normal.png",
        "selectedIconPath": "/assets/bottom_detail_pressed.png"
      },
      {
        "pagePath": "/pages/chart/chart",
        "text": "图表",
        "iconPath": "/assets/bottom_chart_normal.png",
        "selectedIconPath": "/assets/bottom_chart_pressed.png"
      },
      {
        "pagePath": "/pages/add/add",
        "text": "记账",
        "iconPath": "/assets/bottom_add_normal.png",
        "selectedIconPath": "/assets/bottom_add_pressed.png"
      },
      {
        "pagePath": "/pages/social/social",
        "text": "社区",
        "iconPath": "/assets/bottom_sns_normal.png",
        "selectedIconPath": "/assets/bottom_sns_pressed.png"
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "iconPath": "/assets/bottom_me_normal.png",
        "selectedIconPath": "/assets/bottom_me_pressed.png"
      }
    ]
  },
  attached() {
    console.log(this.data);
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if (data.index === 2) {
        wx.navigateTo({
          url,
        })
        return
      }
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})