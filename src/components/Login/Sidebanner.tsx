import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'

import homeSideImage from '../../../public/homeSide.jpg'
import { Logo } from '../Logo'

import packageJson from '../../../package.json'

export const Sidebanner = () => {
  return (
    <Flex width='640px' userSelect='none'>
      <Image src={homeSideImage} alt='' priority />

      <Flex
        position='absolute'
        width='640px'
        height='100%'
        background='rgba(0, 0, 0, 0.7)'
      >
        <Flex
          width='100%'
          height='100%'
          alignItems='flex-start'
          justifyContent='center'
          flexDirection='column'
          pb='14'
          px='14'
        >
          <Flex
            flex='1'
            width='100%'
            alignItems='flex-start'
            justifyContent='center'
            flexDirection='column'
            gap='4'
            mt='-20'
          >
            <Logo
              fontSize='5xl'
              fontWeight='bold'
              letterSpacing='tight'
              display='flex'
            />
            <Text maxW='96' color='gray.200'>
              Welcome to your dashboard. Feel free to login and start managing
              your data.
            </Text>
          </Flex>
          <Flex
            width='100%'
            justifyContent='space-between'
            color='primaryTextGray'
          >
            <Text>{`din.go ${packageJson.version} © 2022`}</Text>
            <Flex gap={4}>
              <Text>Legal</Text>
              <Text>Contact</Text>
              <Text>Terms</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
