const themeVars = {
  info: [
    ['#73767a', '#a6a9ad'],
    ['#b1b3b8', '#6b6d71'],
    ['#c8c9cc', '#525457'],
    ['#dedfe0', '#393a3c'],
    ['#e9e9eb', '#2d2d2f'],
    ['#f4f4f5', '#202121'],
    ['#f7f7f7', '#151517'],
  ],
  primary: [
    ['#326bff', '#66b1ff'],
    ['#79bbff', '#3375b9'],
    ['#a0cfff', '#2a598a'],
    ['#c6e2ff', '#213d5b'],
    ['#d9ecff', '#1d3043'],
    ['#ecf5ff', '#18222c'],
    ['#fafaff', '#08131a'],
  ],
  warning: [
    ['#faad14', '#ebb563'],
    ['#eebe77', '#a77730'],
    ['#f3d19e', '#7d5b28'],
    ['#f8e3c5', '#533f20'],
    ['#faecd8', '#3e301c'],
    ['#fdf6ec', '#292218'],
    ['#fff9f2', '#141013'],
  ],
  success: [
    ['#52c41a', '#85ce61'],
    ['#95d475', '#4e8e2f'],
    ['#b3e19d', '#3e6b27'],
    ['#d1edc4', '#2d481f'],
    ['#e1f3d8', '#25371c'],
    ['#f0f9eb', '#1c2518'],
    ['#f5fff0', '#101308'],
  ],
  danger: [
    ['#c45656', '#f78989'],
    ['#f89898', '#b25252'],
    ['#fab6b6', '#854040'],
    ['#fcd3d3', '#582e2e'],
    ['#fde2e2', '#412626'],
    ['#fef0f0', '#2b1d1d'],
    ['#fff3f3', '#120303'],
  ],
  text: [
    ['#323232', '#ececec'],
    ['#434343', '#dedede'],
    ['#686868', '#c8c8c8'],
  ],
  background: [['#fff', '#272727']],
  title: [['#080808', '#fafafa']],
} as const

const colorSchemes: Record<'light' | 'dark', any> = {
  light: {},
  dark: {},
}

for (const [color, hexs] of Object.entries(themeVars)) {
  for (let i = 0; i < hexs.length; i++) {
    const [lightColor, darkColor] = hexs[i]
    colorSchemes.light[`${color}-${i + 1}`] = lightColor
    colorSchemes.dark[`${color}-${i + 1}`] = darkColor
  }
}

const tokens: Record<string, string | string[]> = {
  text: ['#fefefe', '#e5eef3', '#ccd1cd', '#a4a4a8', '#919099', '#65676a'],
  info: '#73767a',
  primary: '#326bfb',
  success: '#52c41a',
  warning: '#faad14',
  danger: '#c45656',
  boxShadow: `0 6px 16px 0 rgba(0, 0, 0, 0.08),
  0 3px 6px -4px rgba(0, 0, 0, 0.12),
  0 9px 28px 8px rgba(0, 0, 0, 0.05)`,
}

for (const [key, value] of Object.entries(tokens)) {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      tokens[`${key}-${i + 1}`] = value[i]
    }
    delete tokens[key]
  }
}

export { colorSchemes, tokens }
