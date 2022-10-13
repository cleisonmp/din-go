import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

import decode from 'jwt-decode'
import {
  RequiredPermissions,
  validateUserPermissions,
} from './validateUserPermissions'

import { GenericObject } from '../../models/common'
import { deleteAuthCookies, getAuthCookies } from './authCookies'
import { UserPermissions } from '../../models/user'

//import { ApiAuthError } from '../../errors'
// @param errorCallback callback function invoked when a error occurs at {fn} that's not of type ApiAuthError
//errorCallback: (ctx: GetServerSidePropsContext,error: unknown,) => GetServerSidePropsResult<ResultType>

/**
 * Only allow logged user to view the page
 * @param  {GetServerSideProps<ResultType>} fn callback function invoked after permissions are checked and valid. Will receive the GetServerSidePropsContext as param when invoked
 * @param  {UserPermissions} options obj containing required UserPermissions
 *
 */
export function withSSRAuth<ResultType extends GenericObject>(
  fn: GetServerSideProps<ResultType>,
  options: RequiredPermissions,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<ResultType>> => {
    //const cookies = parseCookies(ctx)
    //const token = cookies['nextauth.token']
    const { token } = getAuthCookies(ctx)

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    if (options) {
      const userPermissions = decode<UserPermissions>(token)

      //console.log(userPermissions, options)

      const userHasValidPermissions = validateUserPermissions({
        userPermissions,
        requiredPermissions: options,
      })
      console.log('userHasValidPermissions:', userHasValidPermissions)
      console.log(ctx.req.headers)

      if (!userHasValidPermissions) {
        return {
          redirect: {
            //destination: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
            destination:
              ctx.req.headers.referer ??
              `${process.env.NEXT_PUBLIC_URL}/dashboard`,
            permanent: false,
          },
        }
      }
    }
    // const errorHandler = ():GetServerSidePropsResult<ResultType> =>{
    //   const result:ResultType = {a:''}
    //   return {props:result}
    // }
    try {
      return await fn(ctx)
    } catch (error) {
      //if (error instanceof ApiAuthError) {
      deleteAuthCookies(ctx)
      // destroyCookie(ctx, 'nextauth.token')
      // destroyCookie(ctx, 'nextauth.refreshToken')
      return {
        redirect: {
          destination: process.env.NEXT_PUBLIC_URL,
          permanent: false,
        },
      }
      /*} else {
        return errorCallback(ctx, error)*/
      /*const message = (error as Error).message ?? 'Unknown server error.'
        throw new Error(message)        */
    }
  }
}
