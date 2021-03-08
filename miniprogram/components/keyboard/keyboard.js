// components/keyboard/keyboard.js
import Config from './../../config/config'

function getToday() {
  const myDate = new Date();
  const year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  const month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  const date = myDate.getDate();
  return `${year}/${month > 0 ? month : '0' + month}/${date > 0 ? date : '0' + date}`
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    formula: 0,
    today: getToday(),
    imgHost: Config.IMG_HOST,
    date: getToday(),
    bottom: 262,
    list: [{
        value: 7,
        type: 'number'
      },
      {
        value: 8,
        type: 'number'
      },
      {
        value: 9,
        type: 'number'
      },
      {
        value: -1,
        type: 'date'
      },
      {
        value: 4,
        type: 'number'
      },
      {
        value: 5,
        type: 'number'
      },
      {
        value: 6,
        type: 'number'
      },
      {
        value: '+',
        type: 'operator'
      },
      {
        value: 1,
        type: 'number'
      },
      {
        value: 2,
        type: 'number'
      },
      {
        value: 3,
        type: 'number'
      },
      {
        value: '-',
        type: 'operator'
      },
      {
        value: '.',
        type: 'dot'
      },
      {
        value: 0,
        type: 'number'
      },
      {
        value: '',
        type: 'del'
      },
      {
        value: '',
        type: 'ok'
      },
    ],
    numberStack: [],
    operatorStack: [],
    flg: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindKeyboardTap(e) {
      let { type, value } = e.currentTarget.dataset.item
      if (type === 'ok') {
        this.triggerEvent('ok', {})
        return
      }
      if (type === 'date') {
        return
      }
      if (type === 'del') {
        let formula = this.data.formula
        formula = (formula + '').substring(0, formula.length - 1)
        this.setData({
          formula: formula === '' ? 0 : formula
        })
      }
    
      if (type === 'number') {
        let numberStack = this.data.numberStack

        let finalFormula = 0
        let finalValue = ''

        finalFormula = this.data.formula + value + ''

        if (numberStack.length === 0) {
          numberStack.push(value + '')
        } else {
          if (this.data.flg === 'operator') {
            numberStack.push(value + '')
          } else {
            let index = numberStack.length - 1
            numberStack[index] = numberStack[index] + value + ''
          }
        }
        
        this.setData({
          formula: finalFormula,
          numberStack,
          flg: type
        })
      }
      if (type === 'operator') {
        let numberStack = this.data.numberStack
        let operatorStack = this.data.operatorStack
        let finalFormula = 0
        if (numberStack.length === 2 && operatorStack.length === 1) {
          let numberStack0 = Number(numberStack.pop())
          let operatorStack0 = operatorStack.pop()
          let numberStack1 = Number(numberStack.pop())
          
          if (operatorStack0 === '+') {
            finalFormula = numberStack0 + numberStack1
          }
          if (operatorStack0 === '-') {
            finalFormula = numberStack0 - numberStack1
          }
          numberStack.push(finalFormula)
          finalFormula = finalFormula + value
        } else {
          finalFormula = this.data.formula + value
        }
        operatorStack.push(value)
        this.setData({
          formula: finalFormula,
          operatorStack,
          flg: type
        })
      }
      console.log(this.data);
      // let formula = this.data.formula + value
      // if (item.type === 'operator') {
      //   // formula = eval(formula)
      //   const list = ['+', '-']
      //   const operator = list.indexOf(item.value)
      //   console.log(formula.split(operator));
      // }
      // this.setData({
      //   formula
      // })
    },
    bindDateChange(e) {
      this.setData({
        date: e.detail.value.replaceAll('-', '/')
      })
    },
    bindRemarkFocus(e) {
      console.log(e.detail.height);
      this.setData({
        bottom: e.detail.height,
      })
    },
    bindRemarkBlur(e) {
      this.setData({
        bottom: 262,
      })
    }
  }
})