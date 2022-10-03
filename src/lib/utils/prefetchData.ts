import { queryClient } from '../services/queryClient'

export const prefetchData = async (
  queryKey: string,
  queryCallback: () => unknown,
  staleTime = 0,
) => {
  return await queryClient.prefetchQuery(queryKey, queryCallback, {
    staleTime: staleTime,
  })
}
