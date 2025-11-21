/**
 * Custom Error Class para erros de API
 * Permite tratamento mais específico e estruturado de erros
 */

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'ApiError'
  }

  /**
   * Verificar se é erro de autenticação
   */
  isAuthError(): boolean {
    return this.statusCode === 401 || this.code === 'UNAUTHORIZED'
  }

  /**
   * Verificar se é erro de permissão
   */
  isPermissionError(): boolean {
    return this.statusCode === 403 || this.code === 'FORBIDDEN'
  }

  /**
   * Verificar se é erro de validação
   */
  isValidationError(): boolean {
    return this.statusCode === 400 || this.code === 'VALIDATION_ERROR'
  }

  /**
   * Verificar se é erro de servidor
   */
  isServerError(): boolean {
    return this.statusCode >= 500
  }

  /**
   * Verificar se é erro de rede
   */
  isNetworkError(): boolean {
    return this.code === 'NETWORK_ERROR' || this.statusCode === 0
  }

  /**
   * Verificar se é erro de timeout
   */
  isTimeoutError(): boolean {
    return this.code === 'TIMEOUT_ERROR'
  }

  /**
   * Mensagem de erro amigável para o usuário
   */
  getUserMessage(): string {
    switch (true) {
      case this.isAuthError():
        return 'Sua sessão expirou. Por favor, faça login novamente.'
      case this.isPermissionError():
        return 'Você não tem permissão para acessar este recurso.'
      case this.isValidationError():
        return 'Os dados fornecidos são inválidos. Verifique e tente novamente.'
      case this.isNetworkError():
        return 'Erro de conexão. Verifique sua internet e tente novamente.'
      case this.isTimeoutError():
        return 'A requisição demorou muito tempo. Tente novamente.'
      case this.isServerError():
        return 'O servidor está com problemas. Tente novamente mais tarde.'
      default:
        return this.message || 'Ocorreu um erro desconhecido.'
    }
  }

  /**
   * Serializar erro para logging
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      details: this.details,
      stack: this.stack,
    }
  }
}

/**
 * Tratamento centralizado de erros de API
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return await response.json()
  }

  let errorData: any = {}
  try {
    errorData = await response.json()
  } catch {
    // Se não conseguir parsear JSON, usar resposta padrão
  }

  throw new ApiError(
    response.status,
    errorData.code || `HTTP_${response.status}`,
    errorData.message || response.statusText || 'Erro na requisição',
    errorData.details
  )
}

/**
 * Wrapper para fetch com tratamento de erro centralizado
 */
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, options)
    return await handleApiResponse<T>(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof TypeError) {
      throw new ApiError(
        0,
        'NETWORK_ERROR',
        'Erro de conexão. Verifique sua internet.'
      )
    }

    throw new ApiError(
      500,
      'UNKNOWN_ERROR',
      error instanceof Error ? error.message : 'Erro desconhecido'
    )
  }
}

/**
 * Retry com exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  options = {
    maxAttempts: 3,
    initialDelayMs: 1000,
    maxDelayMs: 10000,
    backoffMultiplier: 2,
  }
): Promise<T> {
  let lastError: Error
  let delay = options.initialDelayMs

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err as Error

      // Não fazer retry em erros de validação ou autenticação
      if (err instanceof ApiError && (err.isValidationError() || err.isAuthError())) {
        throw err
      }

      // Se é a última tentativa, lançar o erro
      if (attempt === options.maxAttempts) {
        break
      }

      // Aguardar antes de fazer retry
      await new Promise(resolve => setTimeout(resolve, delay))

      // Aumentar delay para próxima tentativa
      delay = Math.min(
        delay * options.backoffMultiplier,
        options.maxDelayMs
      )
    }
  }

  throw lastError!
}
