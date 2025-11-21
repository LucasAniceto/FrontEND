# ⚡ QUICK START - Integração Backend

## 📌 TL;DR (Muito Ocupado?)

```bash
# 1. Configure env
cp .env.local.example .env.local
# Edite: VITE_API_BASE_URL=seu_backend_url

# 2. Instale
npm install

# 3. Rode
npm run dev

# 4. Teste login
# Email: admin@investic.com
# Senha: admin123

# 5. Quando backend estiver pronto:
# - Descomentar linhas em AuthContext.tsx (search: "TODO: Integrar com API real")
# - Adaptar endpoints se necessário
```

---

## 🔧 3 Passos para Integrar Seu Backend

### Passo 1: Configurar URL da API

```bash
# Arquivo: .env.local
VITE_API_BASE_URL=http://localhost:3000/api
```

### Passo 2: Adaptar Endpoints (se diferentes)

```typescript
// Se seus endpoints são diferentes, edite em:
// - client/src/services/authService.ts
// - client/src/services/investmentService.ts

// Exemplo:
// De: /auth/login
// Para: /api/v1/auth/login
```

### Passo 3: Remover Mocks

```typescript
// Em client/src/contexts/AuthContext.tsx, linha ~55:
// Comentar:
if (email === 'admin@investic.com' && password === 'admin123') { ... }

// Descomentar:
// const response = await authService.login({ email, password })
// setUser(response.user)
```

---

## 📚 Guias Disponíveis

| Guia | Quando Usar |
|------|-------------|
| **Este arquivo** | Precisa apenas do essencial |
| `MELHORIAS_IMPLEMENTADAS.md` | Quer entender o que foi feito |
| `GUIA_INTEGRACAO_COMPLETO.md` | Quer detalhes e exemplos |
| Código com comments | Quer ver como funciona |

---

## 🎯 APIs que Seu Backend Precisa Ter

### Autenticação

```http
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

```http
POST /auth/register
{
  "name": "John Doe",
  "email": "user@example.com",
  "cpf": "12345678910",
  "phone": "11999999999",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

```http
GET /auth/validate
Authorization: Bearer {token}

Response:
{
  "id": "123",
  "name": "John Doe",
  "email": "user@example.com"
}
```

### Investimentos

```http
GET /investments/dashboard
Authorization: Bearer {token}

Response:
{
  "user": { ... },
  "summary": { ... },
  "institutions": [ ... ],
  "investments": [ ... ],
  "categories": [ ... ],
  "monthlyReturns": [ ... ],
  "riskProfile": { ... }
}
```

Veja `GUIA_INTEGRACAO_COMPLETO.md` para mais endpoints.

---

## 🐛 Debugging

### Ver se está funcionando

```bash
# 1. Abrir DevTools (F12)
# 2. Ir em Network
# 3. Fazer login
# 4. Ver as requisições

# Deve ver:
# POST http://localhost:3000/api/auth/login (200)
# GET http://localhost:3000/api/auth/validate (200)
```

### Erros Comuns

```
❌ "Failed to fetch"
→ Backend não está rodando ou URL está errada

❌ "Erro 401: Unauthorized"
→ Token inválido ou expirado

❌ "CORS error"
→ Configurar CORS no backend
```

---

## 💡 Dicas Úteis

### Usar hooks ao invés de componente

```typescript
// ❌ Assim:
const [data, setData] = useState(null)
useEffect(() => {
  fetch('/api/data').then(r => r.json()).then(setData)
}, [])

// ✅ Assim (usando nosso hook):
const { data } = useFetch('/api/data')
```

### Usar formatadores

```typescript
// ❌ Assim:
`R$ ${value.toFixed(2)}`

// ✅ Assim:
formatters.currency(value)
```

### Tratar erros

```typescript
// ❌ Assim:
.catch(err => console.log(err))

// ✅ Assim:
.catch(err => {
  if (err instanceof ApiError) {
    toast.error(err.getUserMessage())
  }
})
```

---

## 📞 Problemas?

1. Consulte `GUIA_INTEGRACAO_COMPLETO.md` → Troubleshooting
2. Verifique console do navegador (F12)
3. Verifique Network tab
4. Verifique se backend está rodando

---

**Pronto! Integração com backend em 3 passos.** ✅

Para mais detalhes, veja os outros guias. 📚
