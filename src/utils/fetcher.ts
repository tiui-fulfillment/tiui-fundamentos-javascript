// Important note: the Fetch API is not avaiable for NodeJS versions below 18. If you have a inferior version try using `src/utils/fetch-data.ts` instead.

export const fetcher = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const response = await fetch(url, options)
  const data = await response.json()

  if (!response.ok) {
    console.error(data)
    return Promise.reject(data)
  }

  return data
}
