import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { Box, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { theme } from '../../styles/theme'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const GridCharts = () => {
  const chartBgColor = useColorModeValue('gray.50', 'gray.600')

  const options: ApexOptions = {
    chart: {
      id: 'subscribers',
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: theme.colors.primaryTextGray,
    },
    grid: { show: false },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.primaryTextGray,
      },
      axisTicks: {
        color: theme.colors.primaryTextGray,
      },

      categories: [
        '2022-08-21T00:00:00.000Z',
        '2022-08-22T00:00:00.000Z',
        '2022-08-23T00:00:00.000Z',
        '2022-08-24T00:00:00.000Z',
        '2022-08-25T00:00:00.000Z',
        '2022-08-26T00:00:00.000Z',
        '2022-08-27T00:00:00.000Z',
      ],
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.8,
        opacityTo: 0.3,
      },
    },
    colors: ['#1EB980'],
  }
  const series = [
    {
      name: '',
      data: [5, 34, 26, 29, 49, 74, 12],
    },
  ]

  return (
    <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
      <Box
        p={{ base: '6', lg: '8' }}
        pb="4"
        bg={chartBgColor}
        borderRadius="2xl"
      >
        <Text fontSize="lg">Subscribers this week</Text>
        <Chart type="area" height="160" options={options} series={series} />
      </Box>
      <Box
        p={{ base: '6', lg: '8' }}
        pb="4"
        bg={chartBgColor}
        borderRadius="2xl"
      >
        <Text fontSize="lg">Opening rate</Text>
        <Chart type="area" height="160" options={options} series={series} />
      </Box>
    </SimpleGrid>
  )
}
