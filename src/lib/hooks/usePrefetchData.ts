import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

export const usePrefetchData = (
  queryKey: string,
  queryCallback: () => unknown,
  staleTime = 0,
) => {
  const queryClient = useQueryClient()

  const prefetchData = useCallback(async () => {
    await queryClient.prefetchQuery(queryKey, queryCallback, {
      staleTime: staleTime,
    })
  }, [queryCallback, queryClient, queryKey, staleTime])

  return prefetchData
}
