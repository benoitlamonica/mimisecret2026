const STORAGE_PREFIX = 'mimi-'
const EXPORT_VERSION = 1

interface ProgressExport {
  app: 'mimi-secret'
  version: number
  exportedAt: string
  data: Record<string, string>
}

function encode(value: string) {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function decode(value: string) {
  const binary = atob(value.trim())
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function exportProgress() {
  const data: Record<string, string> = {}

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (key?.startsWith(STORAGE_PREFIX)) {
      const value = window.localStorage.getItem(key)
      if (value !== null) data[key] = value
    }
  }

  const payload: ProgressExport = {
    app: 'mimi-secret',
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  }

  return encode(JSON.stringify(payload))
}

export function importProgress(encoded: string) {
  const parsed = JSON.parse(decode(encoded)) as Partial<ProgressExport>

  if (
    parsed.app !== 'mimi-secret'
    || parsed.version !== EXPORT_VERSION
    || !parsed.data
    || typeof parsed.data !== 'object'
    || Array.isArray(parsed.data)
  ) {
    throw new Error('Ce code de progression est invalide ou incompatible.')
  }

  for (const [key, value] of Object.entries(parsed.data)) {
    if (!key.startsWith(STORAGE_PREFIX) || typeof value !== 'string') {
      throw new Error('Ce code contient des données invalides.')
    }
    JSON.parse(value)
  }

  for (const [key, value] of Object.entries(parsed.data)) {
    window.localStorage.setItem(key, value)
  }

  for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
    const key = window.localStorage.key(index)
    if (key?.startsWith(STORAGE_PREFIX) && !(key in parsed.data)) {
      window.localStorage.removeItem(key)
    }
  }
}
