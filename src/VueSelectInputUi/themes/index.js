import { ShadeColor, HexToRgba, isColorName, colorNameToHex } from 'color-transformer-ui'

export default ({ color, lightColor, darkColor, validColor, borderRadius, errorColor }) => {
  const theme = {
    '--vue-select-input-ui-primary-color': color,
    '--vue-select-input-ui-second-color-light': '#747474',
    '--vue-select-input-ui-second-color-dark': 'rgba(255, 255, 255, 0.7)',
    '--vue-select-input-ui-third-color-light': '#CCC',
    '--vue-select-input-ui-third-color-dark': 'rgba(255, 255, 255, 0.7)',
    '--vue-select-input-ui-bg-color-light': lightColor,
    '--vue-select-input-ui-bg-color-dark': darkColor,
    '--vue-select-input-ui-error-color': errorColor,
    '--vue-select-input-ui-valid-color': validColor,
    '--vue-select-input-ui-hover-color-light': ShadeColor(lightColor, -8),
    '--vue-select-input-ui-hover-color-dark': ShadeColor(darkColor, 50),
    '--vue-select-input-ui-muted-color-light': '#747474',
    '--vue-select-input-ui-muted-color-dark': 'rgba(255, 255, 255, 0.3)',
    '--vue-select-input-ui-primary-color-transparency': isColorName(color) ? HexToRgba(colorNameToHex(color), 0.7) : HexToRgba(color, 0.7),
    '--vue-select-input-ui-error-color-transparency': isColorName(errorColor) ? HexToRgba(colorNameToHex(errorColor), 0.7) : HexToRgba(errorColor, 0.7),
    '--vue-select-input-ui-valid-color-transparency': isColorName(validColor) ? HexToRgba(colorNameToHex(validColor), 0.7) : HexToRgba(validColor, 0.7),
    '--vue-select-input-ui-border-radius': `${borderRadius}px`
  }
  return theme
}
