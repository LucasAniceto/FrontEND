import { useState } from 'react'

/**
 * Hook para persistir estado em localStorage
 * @example
 * const [name, setName] = useLocalStorage('user-name', 'João')
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Erro ao ler localStorage[${key}]:`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Erro ao escrever em localStorage[${key}]:`, error)
    }
  }

  return [storedValue, setValue]
}
