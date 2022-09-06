import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const Button: ComponentStyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    lineHeight: 'none',
    _focus: {
      boxShadow: '0 0 0 2px ' + mode('#72DFFF', '#86868C')(props),
    },
  }),
  variants: {
    link: {
      _hover: {
        boxShadow: 'none',
      },
      _focus: {
        boxShadow: 'none',
      },
      _active: {
        color: 'none',
      },
    },
  },
  defaultProps: {
    colorScheme: 'buttonColorScheme',
  },
}
