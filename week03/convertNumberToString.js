/*
 * @Descripttion: 
 * @version: 
 * @Author: tina.cai
 * @Date: 2020-04-29 00:18:50
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-04-29 00:36:35
 */
function convertNumberToString (number, radix) {
  let integer = Math.floor(number)
  let fraction = String(number).match(/\.\d+$/)
  if (fraction) {
    fraction = fraction[0].replace('.', '')
  }
  let string = ''
  while (integer > 0) {
    string = String(integer % radix) + string
    integer = Math.floor(integer / radix)
  }
  return fraction ? `${string}.${fraction}` : string
}
