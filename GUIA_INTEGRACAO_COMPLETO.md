# 🔧 GUIA COMPLETO DE INTEGRAÇÃO COM BACKEND

**Data:** 21 de novembro de 2025
**Status:** ✅ Pronto para integração

---

## 📋 ÍNDICE

1. [Setup Inicial](#setup-inicial)
2. [Estrutura de Serviços](#estrutura-de-serviços)
3. [Autenticação](#autenticação)
4. [Chamadas de API](#chamadas-de-api)
5. [Tratamento de Erros](#tratamento-de-erros)
6. [Variáveis de Ambiente](#variáveis-de-ambiente)
7. [Checklist de Integração](#checklist-de-integração)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Setup Inicial

### 1. Criar arquivo `.env.local`

```bash
cp .env.local.example .env.local
```

### 2. Editar `.env.local`

```bash
# VITE_API_BASE_URL deve apontar para seu backend
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Investic
VITE_LOG_LEVEL=debug
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Iniciar desenvolvimento

```bash
npm run dev
```

---

## 📦 Estrutura de Serviços

### Arquivos Principais

```
client/src/
├── services/
│   ├── authService.ts              ← Autenticação
│   └── investmentService.ts        ← Investimentos
├── lib/
│   ├── formatters.ts               ← Formatações
│   ├── apiError.ts                 ← Tratamento de erros
│   └── utils.ts
├── hooks/
│   ├── useFetch.ts                 ← Hook para fetch
│   ├── useLocalStorage.ts          ← Hook para localStorage
│   └── index.ts
└── contexts/
    ├── AuthContext.tsx             ← Estado de autenticação
    └── ThemeContext.tsx
```

### Services Implementados

#### `authService.ts`
Responsável por autenticação e gerenciamento de tokens.

```typescript
// Login
const response = await authService.login({ email, password })
// response.token é armazenado automaticamente

// Register
const response = await authService.register({ name, email, cpf, phone, password })

// Validar token (chamado automaticamente ao carregar app)
const user = await authService.validateToken()

// Logout
await authService.logout()

// Verificar se autenticado
const isAuth = authService.isAuthenticated()

// Obter token
const token = authService.getToken()
```

#### `investmentService.ts`
Responsável por chamadas relacionadas a investimentos.

```typescript
// Obter dashboard completo
const data = await investmentService.getDashboard()

// Obter instituições
const institutions = await investmentService.getInstitutions()

// Obter investimentos
const investments = await investmentService.getInvestments()

// Sincronizar investimentos
const synced = await investmentService.syncInvestments(institutionId)

// Obter recomendações
const recommendations = await investmentService.getRecommendations()

// Exportar dados
const blob = await investmentService.exportInvestments('pdf')
```

---

## 🔐 Autenticação

### Fluxo de Autenticação

```
┌─────────────────────────────────────────────┐
│ 1. App.tsx carrega                          │
├─────────────────────────────────────────────┤
│ 2. AuthProvider valida token (se existe)    │
│    → authService.validateToken()            │
├─────────────────────────────────────────────┤
│ 3. Se válido, restaura estado do usuário    │
│ 4. Se inválido, limpa token (logout)        │
├─────────────────────────────────────────────┤
│ 5. App renderiza com usuario restaurado     │
└─────────────────────────────────────────────┘
```

### Como Usar Autenticação em Componentes

```typescript
import { useAuth } from '@/contexts/AuthContext'

export function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth()

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password123')
      // Usuário logado com sucesso
    } catch (err) {
      console.error('Erro ao fazer login:', err)
    }
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Bem-vindo, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  )
}
```

### Proteger Rotas

```typescript
// Em App.tsx
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <div>Carregando...</div>
  if (!isAuthenticated) return <Navigate to="/" />

  return <Dashboard />
}

// Usar em rotas
<Route path="/dashboard" element={<ProtectedRoute />} />
```

---

## 🔗 Chamadas de API

### Padrão de Fetch em Componentes

#### Opção 1: Usar Hook `useFetch`

```typescript
import { useFetch } from '@/hooks'

export function Dashboard() {
  const { data, loading, error, refetch } = useFetch('/investments/dashboard')

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error.message}</div>
  if (!data) return <div>Sem dados</div>

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Usar data */}
      <button onClick={refetch}>Recarregar</button>
    </div>
  )
}
```

#### Opção 2: Usar Service + useEffect

```typescript
import { useEffect, useState } from 'react'
import { investmentService } from '@/services/investmentService'
import { ApiError } from '@/lib/apiError'

export function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await investmentService.getDashboard()
        setData(result)
      } catch (err) {
        setError(err instanceof ApiError ? err : new ApiError(500, 'UNKNOWN', String(err)))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error.getUserMessage()}</div>
  if (!data) return <div>Sem dados</div>

  return <div>{/* renderizar data */}</div>
}
```

### Formatação de Dados

```typescript
import { formatters } from '@/lib/formatters'

// Currency
formatters.currency(1234.56)  // "R$ 1.234,56"

// Percentage
formatters.percentage(15.5)   // "15.50%"

// CPF
formatters.cpf("12345678910")  // "123.456.789-10"

// Date
formatters.date("2025-11-21")  // "21/11/2025"

// Profit/Loss
formatters.profitLoss(1234.56)           // "+R$ 1.234,56"
formatters.profitLossPercentage(5.5)     // "+5.50%"

// Investment Type
formatters.investmentType("fii")  // "FII"
```

---

## ❌ Tratamento de Erros

### Classe ApiError

```typescript
import { ApiError } from '@/lib/apiError'

try {
  await investmentService.getDashboard()
} catch (err) {
  if (err instanceof ApiError) {
    // Verificar tipo de erro
    if (err.isAuthError()) {
      // Token expirado, redirecionar para login
    } else if (err.isValidationError()) {
      // Erro de validação, mostrar erro específico
      console.log(err.details)
    } else if (err.isNetworkError()) {
      // Problema de conexão
    } else if (err.isServerError()) {
      // Erro no servidor (5xx)
    }

    // Mensagem amigável para usuário
    console.log(err.getUserMessage())
  }
}
```

### Retry Automático

```typescript
import { retryAsync } from '@/lib/apiError'

// Fazer retry automático
const data = await retryAsync(
  () => investmentService.getDashboard(),
  {
    maxAttempts: 3,
    initialDelayMs: 1000,
    maxDelayMs: 10000,
  }
)
```

### Toast Notifications

```typescript
import { toast } from 'sonner'

// Sucesso
toast.success('Dados atualizados com sucesso!')

// Erro
toast.error('Erro ao atualizar dados')

// Info
toast.info('Processando...')

// Loading
const { dismiss } = toast.loading('Carregando...')
dismiss()
```

---

## 📝 Variáveis de Ambiente

### Desenvolvimento (.env.local)

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Investic
VITE_LOG_LEVEL=debug
VITE_ENV=development
```

### Staging (.env.staging)

```bash
VITE_API_BASE_URL=https://api-staging.investic.com/api
VITE_APP_NAME=Investic Staging
VITE_LOG_LEVEL=warn
VITE_ENV=staging
```

### Produção (.env.production)

```bash
VITE_API_BASE_URL=https://api.investic.com/api
VITE_APP_NAME=Investic
VITE_LOG_LEVEL=error
VITE_ENV=production
```

### Build para Ambiente Específico

```bash
# Development
npm run dev

# Staging
npm run build -- --mode staging

# Production
npm run build -- --mode production
```

---

## ✅ Checklist de Integração

### Pré-Integração
- [ ] Backend configurado e disponível
- [ ] Endpoints documentados
- [ ] CORS configurado no backend
- [ ] `.env.local` criado com URL correta
- [ ] `npm install` executado

### Autenticação
- [ ] Login funciona e retorna token JWT
- [ ] Token é armazenado em localStorage
- [ ] Logout limpa token
- [ ] Página recarregada mantém sessão (token validado)
- [ ] Token expirado redireciona para login

### Dashboard
- [ ] `GET /investments/dashboard` retorna dados corretos
- [ ] Dados são exibidos na UI
- [ ] Loading state mostrado corretamente
- [ ] Erros tratados e mostrados ao usuário

### Institucoes
- [ ] `GET /investments/institutions` funciona
- [ ] Conectar instituição (`POST /investments/institutions/connect`)
- [ ] Desconectar instituição (`POST /investments/institutions/{id}/disconnect`)

### Investimentos
- [ ] `GET /investments` retorna lista
- [ ] `GET /investments/{id}` retorna detalhes
- [ ] `PUT /investments/{id}` atualiza dados
- [ ] Sincronização funciona

### Features
- [ ] Recomendações carregam
- [ ] Alertas funcionam
- [ ] Exportação (PDF/CSV) funciona
- [ ] Relatórios geram corretamente

### Performance
- [ ] Aplicação carrega rápido
- [ ] Sem avisos de console
- [ ] Network tab mostra requisições rápidas
- [ ] Nenhum vazamento de memória

### Segurança
- [ ] Token incluído em headers das requisições
- [ ] Senhas nunca logadas
- [ ] Dados sensíveis não expostos no console
- [ ] CORS headers corretos

---

## 🔍 Troubleshooting

### "VITE_API_BASE_URL não configurada"

```bash
# Solução: Criar arquivo .env.local
cp .env.local.example .env.local

# Editar com URL correta
VITE_API_BASE_URL=http://localhost:3000/api
```

### "Erro 401: Unauthorized"

```typescript
// Possíveis causas:
// 1. Token expirado ou inválido
// 2. Token não incluído no header

// Solução:
// - Fazer login novamente
// - Verificar localStorage.getItem('authToken')
// - Verificar network tab se Authorization header está presente
```

### "CORS error"

```bash
# Solução: Configurar CORS no backend

// Node.js Express exemplo:
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
```

### "Erro ao fazer fetch: TypeError"

```typescript
// Possível causa: Problema de conexão

// Verificar:
// 1. Backend está rodando?
// 2. URL em .env.local está correta?
// 3. Rede conectada?

// Teste: Abrir URL em browser
// http://localhost:3000/api/health
```

### "Token não persiste após reload"

```typescript
// Problema: AuthContext não valida token ao montar

// Solução: Verificar se useEffect está rodando
// Em AuthProvider, o useEffect faz:
// 1. Verifica se token existe
// 2. Valida com backend
// 3. Restaura usuário

// Se não funciona, verificar:
// - Console.log para debug
// - Network tab para validação
// - localStorage tem o token?
```

### "Erro 500 do servidor"

```typescript
// Solução: Verificar logs do backend
// 1. Abrir terminal do backend
// 2. Procurar pelo erro
// 3. Verificar se dados enviados estão corretos
// 4. Verificar banco de dados

// Frontend: Mostrar erro amigável ao usuário
catch (err) {
  if (err instanceof ApiError && err.isServerError()) {
    toast.error('Servidor em manutenção. Tente novamente em alguns minutos.')
  }
}
```

---

## 📞 Suporte

Para dúvidas sobre integração:

1. **Documentação:** Consultar este guia
2. **Logs:** Verificar console do navegador (F12)
3. **Network:** Verificar requisições em DevTools
4. **Backend:** Confirmar endpoints e respostas esperadas

---

## 🎯 Próximas Etapas Após Integração

1. ✅ Implementar testes automatizados
2. ✅ Adicionar analytics/tracking
3. ✅ Implementar PWA (offline support)
4. ✅ Otimizar performance (lazy loading)
5. ✅ Configurar CI/CD

---

**Última atualização:** 21 de novembro de 2025
**Versão:** 1.0
