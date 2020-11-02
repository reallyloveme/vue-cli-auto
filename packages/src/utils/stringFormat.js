export default {
  /**
  *   str 表示将要替换的字符串
  *   l 表示你将要替换的字符
  *   r 表示你想要替换的字符
  */
transFormat(str, l, r) { // 字符串替换
  let reg = new RegExp(l, 'g') // g表示全部替换，默认替换第一个
  str = str.replace(reg, r)
  return str
},

/**
*   character 原字符串（String）
*   site 要插入的字符的位置 （Number）
*   newStr 想要插入的字符 （String）
*/
insertStr (character, site, newStr) { // 在字符串指定位置插入字符
  return character.slice(0, site) + newStr + character.slice(site)
},

/**
*   str 是你将要进行处理的字符串(String)
*   under 是你根据什么字符处理(String)
*   event 是你根据什么字符把处理结果分割(String)
*/
keyCharacterMap (str,under,event) { // 字符串反转处理分割
  return str.split(under).reverse().join(event)
},

//  截取指定字符之前的字符串
beforeStrSub (str, char) {
  return str.split(char)[0]
},

//  截取指定字符之后的字符串
afterStrSub (str, char) {
  return str.split(char)[1]
},
/**
 *  str 要反转的字符串
 */
strInversion (str) {
  str = str + ''
  let newStr=[]
  newStr=str.split("").reverse().join("")
  return newStr
},

/**
 * str 将要查找的字符串
 * queryStr 想要在字符串中查找的字符或字符串
 *
 * 如果在字符串中有这个字符或者字符串，返回1，否则返回-1
 */
judgeStrHave (str,queryStr) {
  return str.indexOf(queryStr) === -1?-1:1
}

}