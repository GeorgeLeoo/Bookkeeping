// components/tab-bar/tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Array,
    margin: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindTabChange(e) {
      const selectedIndex = Number(e.currentTarget.dataset.index)
      this.setData({
        selectedIndex
      })
      this.triggerEvent('TabChange', { index: selectedIndex })
    }
  }
})
