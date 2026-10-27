import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): {
  value: Ref<T>
  remove: () => void
} {
  const value = ref(initialValue) as Ref<T>
  let isReady = false

  if (typeof window !== 'undefined') {
    const storedValue = window.localStorage.getItem(key)

    if (storedValue) {
      try {
        value.value = JSON.parse(storedValue) as T
      } catch (error) {
        console.error(`Impossible de lire la donnée localStorage "${key}".`, error)
      }
    }

    isReady = true
  }

  watch(value, (nextValue) => {
    if (!isReady || typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, JSON.stringify(nextValue))
    } catch (error) {
      console.error(`Impossible d'enregistrer la donnée localStorage "${key}".`, error)
    }
  }, { deep: true })

  function remove() {
    value.value = initialValue

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  }

  return { value, remove }
}
