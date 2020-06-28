export const swapArrElement = ({ data, from, to }) => {
  const arr = [...data]
  const temp = arr[from]
  arr[from] = arr[to]
  arr[to] = temp
  return arr
}
