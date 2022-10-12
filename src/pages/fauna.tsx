import type { NextPage } from 'next'

import { Button } from '@chakra-ui/react'

import { signIn } from '../lib/services/authentication'
import { Client, query } from 'faunadb'

const Fauna: NextPage = () => {
  const directFauna = () => {
    const faunaClient = new Client({
      secret: 'fnAEyMD2RzACUYH35npLk3vYKWfW15YWC7lu4P8_',
    })
    faunaClient
      .query(
        query.Get(
          query.Match(query.Index('user_by_email_and_password'), [
            'mail@mail.com',
            'poGLgYizbETRd4TFVR9jrMxd6vh4b50K0a482NiHy6tPd3KG27MV+xSFTId03A0QtVZ+SnBVNswqHWHsChanpg==',
          ]),
        ),
      )
      .then((response) => {
        console.log('============handleSignIn============')
        console.log(response)
        console.log('============ENDdleSignIn============')
      })
      .catch((error) => {
        console.log('============handleSignInerror============')
        console.log(error)
        console.log('============ENDdleSignInerror============')
      })
  }

  const handleSignIn = async () => {
    await signIn('mail@mail.com', 'password')
      .then((response) => {
        console.log('============handleSignIn============')
        console.log(response)
        console.log('============ENDdleSignIn============')
      })
      .catch((error) => {
        console.log('============handleSignInerror============')
        console.log(error)
        console.log('============ENDdleSignInerror============')
      })
  }

  return (
    <>
      <Button onClick={handleSignIn}>handleSignIn</Button>
      <Button onClick={directFauna}>directFauna</Button>
    </>
  )
}

export default Fauna
