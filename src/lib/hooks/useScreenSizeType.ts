import { useBreakpointValue } from '@chakra-ui/react'

export const useScreenSizeType = () => {
  //currently there is a bug with chakra-ui causing unnecessary rendering
  //https://github.com/chakra-ui/chakra-ui/pull/6402
  const currentType = useBreakpointValue(
    {
      base: 'sm',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
    },
    { ssr: false, fallback: 'sm' },
  )

  const resolutionTypes = {
    isSmallScreen: currentType === 'sm',
    isMediumScreen: currentType === 'md',
    isLargeScreen: currentType === 'lg',
    isXLargeScreen: currentType === 'xl',
    is2xLargeScreen: currentType === '2xl',
  }

  return resolutionTypes
}
