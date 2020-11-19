export function validUsername (str) {
  const validMap = ['admin', 'editor']
  return ~validMap.indexOf(str.trim())
}
