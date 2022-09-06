import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'
import { GridCharts } from '../../components/Dashboard/GridCharts'

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

/* export const getStaticProps: GetStaticProps = async () => {
  
  return {
    props: {
      
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
} */
