// 存储数据
export const setItem = (k, v) => {
  if (typeof v === 'object') {
    v = JSON.stringify(v)
  }
  localStorage.setItem(k, v)
}
// 获取数据
export const getItem = k => {
  const res = localStorage.getItem(k)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}
// 删除数据
