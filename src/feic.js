// 获取非重随机数   将数值用数组保存，方法传入一个数时，
function nonRerandom (...num) {
  let minNum, maxNum
  const randomArr = []
  if (num.length === 2) {
    if (num[0] === num[1]) {
      return num[0]
    }
    [minNum, maxNum] = num[0] < num[1] ? [num[0], num[1]] : [num[1], num[0]]
  } else {
    if (num[0] === 1) {
      return 1
    }
    [minNum, maxNum] = num[0] < 1 ? [num[0], 1] : [1, num[0]]
  }
  for (let i = parseInt(minNum); i <= parseInt(maxNum); i++) {
    randomArr.push(i)
  }
  let index = randomArr.length
  while (index) {
    const r = Math.floor(Math.random() * index--);
    [randomArr[r], randomArr[index]] = [randomArr[index], randomArr[r]]
  }
  return randomArr
}
nonRerandom(32)
