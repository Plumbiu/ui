import { ExtendTheme } from '@pigment-css/react/theme'
import { extendTheme } from '@pigment-css/vite-plugin'

const themeVars = {
  info: [
    ['#73767a', '#a6a9ad'],
    ['#b1b3b8', '#6b6d71'],
    ['#c8c9cc', '#525457'],
    ['#dedfe0', '#393a3c'],
    ['#e9e9eb', '#2d2d2f'],
    ['#f4f4f5', '#202121'],
    ['#f7f7f7', '#181818'],
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
    ['#232323', '#f2f2f2'],
    ['#434343', '#dedede'],
    ['#686868', '#c8c8c8'],
    ['#969696', '#a2a2a2'],
    ['#b2b2b2', '#868686'],
  ],
  background: [
    ['#fff', '#272727'],
    ['#f7f7f7', '#343434'],
  ],
  hover: [['rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)']],
} as const

const colorSchemes: Record<'light' | 'dark', any> = {
  light: {},
  dark: {},
} as const

for (const [color, hexs] of Object.entries(themeVars)) {
  for (let i = 0; i < hexs.length; i++) {
    const [lightColor, darkColor] = hexs[i]
    colorSchemes.light[`${color}-${i + 1}`] = lightColor
    colorSchemes.dark[`${color}-${i + 1}`] = darkColor
  }
}

const tokens: Record<string, string | string[]> = {
  gray: [
    '#fefefe',
    '#e5eef3',
    '#c8c9cc',
    '#a4a4a8',
    '#919099',
    '#65676a',
    '#434343',
    '#232323',
  ],
  info: '#73767a',
  primary: '#326bfb',
  success: '#52c41a',
  warning: '#faad14',
  danger: '#c45656',
  blue: [
    '#F6FAFF',
    '#DDEDFF',
    '#7AAEFC',
    '#326BFB',
    '#0344E9',
    '#0047B3',
    '#00338C',
    '#002266',
  ],
  boxShadow: `0 6px 16px 0 rgba(0, 0, 0, 0.08),
  0 3px 6px -4px rgba(0, 0, 0, 0.12),
  0 9px 28px 8px rgba(0, 0, 0, 0.05)`,
  'boxShadow-secondary': `0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)`,
  boxShadowTop: '0 -6px 16px 0 rgba(0, 0, 0, 0.08)',
  boxShadowBottom: '0 6px 0 0 rgba(0, 0, 0, 0.08)',
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

const theme: ExtendTheme<{
  colorScheme: string
  tokens: typeof tokens
}> = extendTheme({
  colorSchemes,
  ...tokens,
  getSelector(colorScheme, css) {
    return colorScheme === 'light' ? ':root' : '.theme-dark'
  },
})

export default theme
