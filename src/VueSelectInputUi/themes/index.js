import ShadeColor from './ShadeColor'

export default ({ dark, color, lightColor, darkColor, validColor, borderRadius }) => {
  return {
    '--primary-color': color,
    '--second-color': dark ? 'rgba(255, 255, 255, 0.7)' : '#747474',
    '--third-color': dark ? 'rgba(255, 255, 255, 0.7)' : '#CCC',
    '--bg-color': dark ? darkColor : lightColor,
    '--hover-color': dark ? ShadeColor(darkColor, 20) : ShadeColor(lightColor, -8),
    '--valid-color': validColor,
    '--muted-color': dark ? 'rgba(255, 255, 255, 0.3)' : '#747474',
    '--border-radius': `${borderRadius}px`
  }
}
