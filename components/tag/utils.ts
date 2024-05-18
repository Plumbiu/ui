export function formatHex(hex: string) {
  if (hex.length === 4) {
    return hex + hex.slice(1)
  }
  return hex
}

// copyed: https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
export function isDarkColor(color: string) {
  const hex = formatHex(color).replace('#', '')
  const c_r = parseInt(hex.slice(0, 2), 16)
  const c_g = parseInt(hex.slice(2, 4), 16)
  const c_b = parseInt(hex.slice(4, 6), 16)
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000

  return brightness < 155
}
