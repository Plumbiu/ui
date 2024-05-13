export function calOffset(width?: string | number) {
  if (typeof width === 'number') {
    return width;
  }
  if (typeof width === 'string') {
    const num = parseFloat(width)
    return Number.isNaN(num) ? 200 : num
  }
  return 200
}