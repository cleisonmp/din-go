import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'
import { GridCharts } from '../../components/Dashboard/GridCharts'
import { withSSRAuth } from '../../lib/services/authentication/withSSRAuth'
import { setupAPIClient } from '../../lib/services/api'

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>din.go</title>
      </Head>

      <Flex as='main' flex='1'>
        <GridCharts />
      </Flex>
    </>
  )
}

export default Dashboard
export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const ssrApiClient = setupAPIClient(ctx)
    //const response =
    await ssrApiClient.get('/auth/checkPermissions')

    return {
      props: {},
    }
  },
  {
    permissions: ['dashboard.read'],
    roles: [],
  },
)

/* export const getStaticProps: GetStaticProps = async () => {
  
  return {
    props: {
      
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
} */
