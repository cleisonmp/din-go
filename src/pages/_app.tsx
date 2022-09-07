import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

//https://github.com/chakra-ui/chakra-ui/issues/4975
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const renderSidebar = router.pathname !== '/' && router.pathname !== '/404'

  return (
    <>
      <ChakraProvider theme={theme}>
        {renderSidebar ? (
          <>
            <Flex w='100%' minW='20rem' mx='auto' px='8' mt='5' gap='16'>
              <Sidebar />
              <Flex w='100%' flexDirection='column' gap='6'>
                <Header />
                <Component {...pageProps} />
              </Flex>
            </Flex>
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </>
  )
}

export default MyApp
