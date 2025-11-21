# Guia de Integração - Sistema de Autenticação e Aprendizado

## 🎯 Visão Geral

Este documento descreve como o sistema de autenticação e a área de aprendizado foram implementados de forma modularizada, facilitando a integração com um backend real.

## 📁 Estrutura de Arquivos

```
client/src/
├── components/
│   ├── LoginModal.tsx          # Modal de login
│   ├── RegisterModal.tsx        # Modal de registro
│   └── ui/
│       └── dialog.tsx           # Componente reutilizável de diálogo
├── contexts/
│   ├── AuthContext.tsx          # Contexto global de autenticação
│   └── ThemeContext.tsx
├── pages/
│   ├── Home.tsx                 # Página inicial com navbar atualizada
│   ├── Learning.tsx             # Página protegida de aprendizado
│   ├── Contact.tsx
│   └── NotFound.tsx
├── types/
│   └── auth.ts                  # Tipos e interfaces de autenticação
└── App.tsx                      # App com AuthProvider
```

## 🔐 Como Funciona a Autenticação

### 1. **AuthContext** (`src/contexts/AuthContext.tsx`)

O contexto centraliza toda a lógica de autenticação:

```typescript
// Exemplo de uso
const { user, isAuthenticated, login, register, logout, isLoading } = useAuth()
```

**Métodos disponíveis:**
- `login(email, password)` - Faz login do usuário
- `register(name, email, cpf, phone, password)` - Cadastra novo usuário
- `logout()` - Faz logout
- `isAuthenticated` - Boolean indicando se usuário está logado
- `user` - Objeto com dados do usuário
- `isLoading` - Boolean indicando se há uma requisição em andamento

### 2. **Credenciais de Teste**

Para testar o sistema sem backend:
- **Email:** `admin`
- **Senha:** `admin`

### 3. **Proteção de Rotas**

A página de Aprendizado (`/aprendizado`) é protegida e só aparece para usuários autenticados:

```typescript
// Em Learning.tsx
if (!isAuthenticated) {
  return <div>Acesso restrito - faça login primeiro</div>
}
```

## 🔗 Integrando com Backend

### Passo 1: Criar um Serviço de API

Crie um arquivo `src/services/authService.ts`:

```typescript
const API_BASE_URL = 'http://seu-backend.com/api'

export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) throw new Error('Login falhou')
    return await response.json() // { token, user }
  },

  register: async (data: RegisterRequest) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error('Registro falhou')
    return await response.json() // { token, user }
  }
}
```

### Passo 2: Atualizar o AuthContext

Modifique `src/contexts/AuthContext.tsx`:

```typescript
import { authService } from '@/services/authService'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Remova a validação hardcoded de admin/admin
      const response = await authService.login(email, password)

      // Armazene o token
      localStorage.setItem('authToken', response.token)

      setUser(response.user)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (...) => {
    // Similar ao login
  }, [])

  return (
    <AuthContext.Provider value={{ ... }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### Passo 3: Adicionar Persistência de Token

```typescript
// Em AuthContext.tsx, adicione um useEffect
useEffect(() => {
  const token = localStorage.getItem('authToken')
  if (token) {
    // Validar token com o backend
    authService.validateToken(token)
      .then(user => setUser(user))
      .catch(() => localStorage.removeItem('authToken'))
  }
}, [])
```

### Passo 4: Configurar Headers de Autenticação

```typescript
// src/services/api.ts
export const apiClient = {
  fetch: async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('authToken')

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return fetch(url, { ...options, headers })
  }
}
```

## 📚 Estrutura da Página de Aprendizado

A página de aprendizado é composta por:

### Cursos Disponíveis:

1. **Introdução aos Investimentos** (Iniciante - 4 horas)
   - O que é Investimento?
   - Primeiros Passos
   - Mitos e Realidades

2. **Tipos de Investimentos** (Intermediário - 6 horas)
   - Renda Fixa
   - Renda Variável
   - Fundos de Investimento
   - Criptomoedas

3. **Perfis de Risco** (Intermediário - 3 horas)
   - Perfil Conservador
   - Perfil Moderado
   - Perfil Agressivo

4. **Liquidez e Rendimento** (Intermediário - 3 horas)
   - O que é Liquidez?
   - Rendimento Real vs Nominal
   - Trade-off Liquidez vs Rendimento

5. **Planejamento Financeiro** (Avançado - 5 horas)
   - Definindo Objetivos Financeiros
   - Análise de Receita e Despesa
   - Diversificação de Carteira
   - Revisão e Ajustes

### Como Adicionar Conteúdo Real:

```typescript
// Em src/pages/Learning.tsx
const COURSES: Course[] = [
  {
    id: '1',
    title: 'Seu Título',
    description: 'Descrição do curso',
    lessons: [
      {
        id: '1-1',
        title: 'Lição 1',
        content: 'Conteúdo da lição',
        videoUrl: 'https://seu-video.com'  // Adicione vídeos
      }
    ]
  }
]
```

## 🔄 Fluxo de Autenticação

```
1. Usuário clica em "Conectar" (Home)
   ↓
2. LoginModal abre
   ↓
3. Usuário insere email e senha
   ↓
4. LoginModal chama auth.login()
   ↓
5. AuthContext faz requisição ao backend
   ↓
6. Backend retorna { token, user }
   ↓
7. Token é armazenado (localStorage)
   ↓
8. user é armazenado no contexto
   ↓
9. isAuthenticated muda para true
   ↓
10. Navbar muda: "Conectar" → "Aprender" + "Sair"
    ↓
11. Usuário pode acessar /aprendizado
```

## 📝 Endpoints esperados do Backend

```
POST /api/auth/login
  Body: { email, password }
  Response: { token: string, user: User }

POST /api/auth/register
  Body: { name, email, cpf, phone, password }
  Response: { token: string, user: User }

GET /api/auth/validate
  Headers: { Authorization: Bearer <token> }
  Response: { user: User }

POST /api/auth/logout
  Headers: { Authorization: Bearer <token> }
  Response: { success: boolean }
```

## 🛠️ Variáveis de Ambiente

Crie um `.env.local`:

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Investic
```

Use no código:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
```

## ✅ Checklist de Integração

- [ ] Criar serviço de API (`authService.ts`)
- [ ] Implementar login real
- [ ] Implementar registro real
- [ ] Adicionar persistência de token
- [ ] Configurar headers de autenticação
- [ ] Adicionar validação de token ao abrir app
- [ ] Implementar refresh token (se necessário)
- [ ] Adicionar tratamento de erros
- [ ] Configurar CORS no backend
- [ ] Testar fluxo completo

## 🧪 Testando Localmente

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend (quando pronto)
npm start
```

Acesse: `http://localhost:5173`

## 📞 Suporte à Integração

Se tiver dúvidas sobre a estrutura modularizada:

1. Verifique o `AuthContext` - é o coração do sistema
2. Verifique os tipos em `src/types/auth.ts`
3. Veja como `LoginModal` e `RegisterModal` usam `useAuth()`
4. Verifique como `Learning.tsx` protege a rota
