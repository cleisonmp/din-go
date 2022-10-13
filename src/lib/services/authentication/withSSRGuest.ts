import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
//import { parseCookies } from 'nookies'
import { GenericObject } from '../../models/common'
import { getAuthCookies } from './authCookies'

/**
 * Only allow guests to view the page
 * @param  {GetServerSideProps<ResultType>} fn callback function invoked when it's a guest. Will receive the GetServerSidePropsContext as param when invoked
 */
export function withSSRGuest<ResultType extends GenericObject>(
  fn: GetServerSideProps<ResultType>,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<ResultType>> => {
    //const cookies = parseCookies(ctx)
    //const token = cookies['nextauth.token']
    const { token } = getAuthCookies(ctx)

    if (token) {
      return {
        redirect: {
          destination: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}
