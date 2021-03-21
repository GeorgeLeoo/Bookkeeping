export const getToday = () => {
  const myDate = new Date();
  const year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  const month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  const date = myDate.getDate();
  return `${year}/${month > 10 ? month : '0' + month}/${date > 10 ? date : '0' + date}`
}
