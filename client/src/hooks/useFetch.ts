import { useEffect, useState, useCallback } from 'react'

/**
 * Hook para fetch de dados com loading, error e retry
 * @example
 * const { data, loading, error, refetch } = useFetch<User>('/api/user')
 */
export function useFetch<T>(
  url: string | null,
  options?: {
    method?: string
    body?: any
    headers?: Record<string, string>
    autoFetch?: boolean
  }
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(!!url)
  const [error, setError] = useState<Error | null>(null)

  const fetch = useCallback(async () => {
    if (!url) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('authToken')
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options?.headers,
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await window.fetch(url, {
        method: options?.method || 'GET',
        headers,
        body: options?.body ? JSON.stringify(options.body) : undefined,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Erro ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao carregar dados'))
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    if (options?.autoFetch === false) return
    fetch()
  }, [url, fetch, options?.autoFetch])

  return { data, loading, error, refetch: fetch }
}
