import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

//https://github.com/chakra-ui/chakra-ui/issues/4975
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

//import { makeServer } from '../lib/services/mirage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from '../components/contexts/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import { queryClient } from '../lib/services/queryClient'

//mirage mock data
//if (process.env.NODE_ENV === 'development') {
//makeServer()
//}
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const renderSidebar = router.pathname !== '/' && router.pathname !== '/404'

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            {renderSidebar ? (
              <>
                <Flex
                  w='100%'
                  minW='20rem'
                  minH='90vh'
                  mx='auto'
                  px='8'
                  mt='5'
                  gap='16'
                >
                  <Sidebar />
                  <Flex w='100%' flexDirection='column' gap='6'>
                    <Header />
                    <Component {...pageProps} />
                    <ToastContainer />
                  </Flex>
                </Flex>
              </>
            ) : (
              <Component {...pageProps} />
            )}
          </AuthProvider>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
