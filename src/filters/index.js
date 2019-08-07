//默认时间转固定格式
const normalTime = time => {
  if (time) {
    var oDate = new Date()
    oDate.setTime(time)

    var y = oDate.getFullYear()
    var m = oDate.getMonth() + 1
    var d = oDate.getDate()

    var h = oDate.getHours()
    var min = oDate.getMinutes()
    var s = oDate.getSeconds()

    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
  }
}
//补零
const fillZero = num => {
  return num < 10 ? '0' + num : num
}
//带参数
//货币形式
const currency = (value, unit, decimal) => {
  let reg = /^[0-9]+.?[0-9]*$/
  if (!reg.test(value)) return ''
  value = decimal == undefined ? value : value.toFixed(decimal)
  return `${unit}${value}`
}
//首字母大写
const capitalize = value => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}
//时间戳转换为指定格式时间
const timeFormat = (value, format) => {
  let date = new Date(value)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let min = date.getMinutes()
  let s = date.getSeconds()
  let result = ''
  if (format === undefined) {
    result = `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d} ${
      h < 10 ? '0' + h : h
    }:${min < 10 ? '0' + min : min}:${s < 10 ? '0' + s : s}`
  }
  if (format === 'yyyy-mm-dd') {
    result = `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
  }
  if (format === 'yyyy-mm') {
    result = `${y}-${m < 10 ? '0' + m : m}`
  }
  if (format === 'mm-dd') {
    result = ` ${m < 10 ? '0' + m : m}:${d < 10 ? '0' + d : d}`
  }
  if (format === 'hh:mm') {
    result = ` ${h < 10 ? '0' + h : h}:${min < 10 ? '0' + min : min}`
  }
  return result
}
export default {
  normalTime,
  fillZero,
  currency,
  capitalize,
  timeFormat
}
