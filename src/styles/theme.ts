import { extendTheme, StyleFunctionProps, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { colors } from './colors'
import { components } from './components'

// color mode config
const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
}

const fonts = {
  body: `'Roboto', sans-serif`,
  heading: `'Roboto', sans-serif`,
  mono: `'Roboto Mono', monospace`,
}

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('#FFF', 'gray.500')(props),
      // color: mode('gray.800', 'whiteAlpha.900')(props),
    },
  }),
}
const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1048px',
  xl: '1200px',
  '2xl': '1536px',
}

export const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
  breakpoints
})
