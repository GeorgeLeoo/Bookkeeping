// components/keyboard/keyboard.js
import Config from './../../config/config'
import {
  getToday
} from '../../utils/utils'
import {
  keyBoardList
} from './const'
import {
  isFunction
} from '../../utils/dataType'

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  observers: {
    numberStack(_numberStack) {
      const _numberStack0 = _numberStack[0]
      const _numberStack1 = _numberStack[1]
      if (_numberStack.length === 1) {
        if (_numberStack0.includes('.')) {
          if (_numberStack0.length > 11 || _numberStack0.split('.')[1].length > 2) {
            let formula = _numberStack0.substring(0, _numberStack0.length - 1)
            this.setData({
              numberStack: [formula],
              formula
            })
          }
        } else {
          if (_numberStack0.length > 8) {
            let formula = _numberStack0.substring(0, _numberStack0.length - 1)
            this.setData({
              numberStack: [formula],
              formula
            })
          }
        }
      }
      if (_numberStack.length === 2) {
        if (_numberStack1.includes('.')) {
          if (_numberStack1.length > 11 || _numberStack1.split('.')[1].length > 2) {
            let ns1 = _numberStack1.substring(0, _numberStack1.length - 1)
            let formula = _numberStack0 + this.data.operatorStack[0] + ns1
            this.setData({
              numberStack: [_numberStack0, ns1],
              formula
            })
          }
        } else {
          if (_numberStack1.length > 8) {
            let ns1 = _numberStack1.substring(0, _numberStack1.length - 1)
            let formula = _numberStack0 + this.data.operatorStack[0] + ns1
            this.setData({
              numberStack: [_numberStack0, ns1],
              formula
            })
          }
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    formula: 0,
    today: getToday(),
    imgHost: Config.IMG_HOST,
    date: getToday(),
    bottom: 262,
    list: keyBoardList,
    numberStack: [],
    operatorStack: [],
    flg: '',
    remarkFocus: false,
    remark: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 执行函数的函数
     */
    executeFunction(fnName, type, value) {
      isFunction(this[fnName]) && this[fnName](type, value)
    },
    /**
     * 完成 按钮
     */
    tapKeyOk() {
      this.keyboardOk()
    },
    /**
     * 小数点
     */
    tabKeyDot() {
      if (this.data.operatorStack.length === 0) {
        const numberStack = this.data.numberStack
        if (!numberStack[0].includes('.')) {
          numberStack[0] = numberStack[0] + '.'
          this.setData({
            formula: this.data.formula + '.',
            numberStack
          })
        }
      } else {
        const numberStack = this.data.numberStack
        if (!numberStack[1].includes('.')) {
          numberStack[1] = numberStack[1] + '.'
          this.setData({
            formula: this.data.formula + '.',
            numberStack
          })
        }
      }
    },
    /**
     * 删除
     */
    tapKeyDel() {
      let formula = this.data.formula
      formula = (formula + '').substring(0, formula.length - 1)
      const numberStack = this.data.numberStack
      const operatorStack = this.data.operatorStack
      let numberStack0 = numberStack[0]
      let numberStack1 = numberStack[1]
      let operatorStack0 = operatorStack[0]

      const newNumberStack = []
      const newOperatorStack = []

      if (numberStack1) {
        numberStack1 = (numberStack1 + '').substring(0, numberStack1.length - 1)
      } else if (operatorStack0) {
        operatorStack0 = (operatorStack0 + '').substring(0, operatorStack0.length - 1)
      } else if (numberStack0) {
        numberStack0 = (numberStack0 + '').substring(0, numberStack0.length - 1)
      }

      if (numberStack0) {
        newNumberStack.push(numberStack0)
      }

      if (numberStack1) {
        newNumberStack.push(numberStack1)
      }

      if (operatorStack0) {
        newOperatorStack.push(operatorStack0)
      }

      this.setData({
        formula,
        numberStack: newNumberStack,
        operatorStack: newOperatorStack
      })
    },
    /**
     * 数字键
     * @param {string} type 
     * @param {string | number} value 
     */
    tapKeyNumber(type, value) {
      let numberStack = this.data.numberStack

      let finalFormula = 0

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
    },
    /**
     * +、-
     * @param {*} type 
     * @param {*} value 
     */
    tapKeyOperator(type, value) {
      let numberStack = this.data.numberStack
      let operatorStack = this.data.operatorStack
      let finalFormula = 0
      if (numberStack.length === 0) {
        this.setData({
          formula: `0${value}`,
          numberStack: [`0`],
          operatorStack: [value],
          flg: type
        })
        return
      }
      if (numberStack.length !== 2 && operatorStack.length === 1) {
        return
      }
      if (numberStack.length === 2 && operatorStack.length === 1) {
        let operatorStack0 = operatorStack.pop()

        let numberStack0 = Number(numberStack.pop())
        let numberStack1 = Number(numberStack.pop())

        finalFormula = this.calculator(operatorStack0, numberStack0, numberStack1)

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
    },
    /**
     * 键盘点击事件
     * @param {*} e 
     */
    bindKeyboardTap(e) {
      let {
        type,
        value
      } = e.currentTarget.dataset.item

      const keyMap = {
        'ok': 'tapKeyOk',
        'date': '',
        'dot': 'tabKeyDot',
        'del': 'tapKeyDel',
        'number': 'tapKeyNumber',
        'operator': 'tapKeyOperator',
      }
      this.executeFunction(keyMap[type], type, value)

      console.log(this.data);
    },
    /**
     * 获得最多几位小数点
     * @param {string|number} number1 
     * @param {string|number} number2 
     */
    getMaxFractionDigits(number1, number2) {
      number1 = number1 + ''
      number2 = number2 + ''
      let fractionDigits1 = 0
      let fractionDigits2 = 0
      if (number1.includes('.')) {
        fractionDigits1 = number1.split('.')[1].length
      }
      if (number2.includes('.')) {
        fractionDigits1 = number2.split('.')[1].length
      }
      return fractionDigits1 > fractionDigits2 ? fractionDigits1 : fractionDigits2
    },
    /**
     * 根据 operator 计算 +、-
     * @param {string} operator 操作符号
     * @param {string|number} number1 
     * @param {string|number} number2 
     */
    calculator(operator, number1, number2) {
      number1 = Number(number1)
      number2 = Number(number2)

      let final = 0

      const fractionDigits = this.getMaxFractionDigits(number1, number2)

      if (operator === '+') {
        final = number1 + number2
      }
      if (operator === '-') {
        final = number2 - number1
      }
      return final.toFixed(fractionDigits)
    },
    bindDateChange(e) {
      this.setData({
        date: e.detail.value.replaceAll('-', '/')
      })
    },
    bindRemarkFocus(e) {
      this.setData({
        remarkFocus: true,
        bottom: e.detail.height,
      })
    },
    bindRemarkBlur(e) {
      this.setData({
        remarkFocus: false,
        bottom: 262,
      })
    },
    keyboardOk() {
      const {
        numberStack,
        operatorStack
      } = this.data
      if (numberStack.length === 2 && operatorStack.length === 1) {
        const formula = this.calculator(operatorStack[0], numberStack[1], numberStack[0]) + ''
        this.setData({
          formula,
          operatorStack: [],
          numberStack: [formula],
          flg: 'ok'
        })
        console.log(this.data);
        return
      }
      if (numberStack.length === 1 && operatorStack.length === 1) {
        this.triggerEvent('ok', {
          money: Number(this.data.numberStack[0])
        })
        return
      }
      this.triggerEvent('ok', {
        money: Number(this.data.formula),
        remark: this.data.remark,
        date: this.data.date
      })
    },
  }
})