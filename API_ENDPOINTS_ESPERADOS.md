# 📡 Endpoints da API Esperados

**Versão:** 1.0
**Data:** 21 de novembro de 2025
**Status:** Documentação de referência para backend

---

## 🔐 Autenticação

### POST /auth/login
Fazer login com email e senha.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```

**Errors:**
- 400: Email ou senha inválidos
- 401: Credenciais incorretas
- 500: Erro no servidor

---

### POST /auth/register
Registrar novo usuário.

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "cpf": "12345678910",
  "phone": "11999999999",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "name": "João Silva",
    "email": "joao@example.com",
    "cpf": "12345678910",
    "phone": "11999999999",
    "createdAt": "2025-11-21T10:30:00Z"
  }
}
```

**Errors:**
- 400: Email já registrado ou dados inválidos
- 422: Validação falhou
- 500: Erro no servidor

---

### GET /auth/validate
Validar token JWT atual.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "user-123",
  "name": "João Silva",
  "email": "joao@example.com"
}
```

**Errors:**
- 401: Token inválido ou expirado
- 403: Token ausente

---

### POST /auth/logout
Fazer logout (opcional).

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

## 📊 Investimentos

### GET /investments/dashboard
Obter dashboard completo do usuário (todas as informações combinadas).

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "user": {
    "id": "user-123",
    "name": "João Silva",
    "email": "joao@example.com"
  },
  "summary": {
    "totalInvested": 50000.00,
    "totalCurrentValue": 55000.00,
    "totalProfitLoss": 5000.00,
    "totalProfitLossPercentage": 10.0,
    "institutions": 3,
    "accounts": 5,
    "investments": 15
  },
  "institutions": [
    {
      "id": "inst-1",
      "name": "Nubank",
      "type": "fintech",
      "connected": true,
      "connectedAt": "2025-11-15T10:30:00Z",
      "accounts": [
        {
          "id": "acc-1",
          "institutionId": "inst-1",
          "name": "Conta Nubank",
          "type": "investimento",
          "balance": 15000.00,
          "currency": "BRL"
        }
      ]
    }
  ],
  "investments": [
    {
      "id": "inv-1",
      "accountId": "acc-1",
      "institutionId": "inst-1",
      "name": "NVDA34",
      "type": "acao",
      "quantity": 10,
      "purchasePrice": 450.00,
      "currentPrice": 480.50,
      "purchaseDate": "2025-10-01T00:00:00Z",
      "currentValue": 4805.00,
      "profitLoss": 305.00,
      "profitLossPercentage": 6.78
    }
  ],
  "categories": [
    {
      "type": "acao",
      "count": 5,
      "value": 25000.00,
      "percentage": 45.45
    }
  ],
  "monthlyReturns": [
    {
      "month": "2025-10",
      "value": 50000.00,
      "return": 1250.00
    }
  ],
  "riskProfile": {
    "score": 6,
    "level": "médio",
    "recommendation": "Carteira equilibrada"
  }
}
```

---

### GET /investments/institutions
Obter lista de instituições conectadas.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": "inst-1",
    "name": "Nubank",
    "type": "fintech",
    "connected": true,
    "connectedAt": "2025-11-15T10:30:00Z",
    "accounts": [...]
  }
]
```

---

### POST /investments/institutions/connect
Conectar uma nova instituição via Open Finance.

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "institutionId": "inst-123",
  "accessToken": "open-finance-token"
}
```

**Response (201):**
```json
{
  "id": "inst-123",
  "name": "Bradesco",
  "type": "banco",
  "connected": true,
  "connectedAt": "2025-11-21T10:30:00Z",
  "accounts": [...]
}
```

---

### POST /investments/institutions/{institutionId}/disconnect
Desconectar uma instituição.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Instituição desconectada com sucesso"
}
```

---

### GET /investments
Obter lista de investimentos do usuário.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters (opcionais):**
```
?accountId=acc-1
?type=acao
?limit=20
?offset=0
```

**Response (200):**
```json
[
  {
    "id": "inv-1",
    "accountId": "acc-1",
    "institutionId": "inst-1",
    "name": "NVDA34",
    "type": "acao",
    "quantity": 10,
    "purchasePrice": 450.00,
    "currentPrice": 480.50,
    "purchaseDate": "2025-10-01T00:00:00Z",
    "currentValue": 4805.00,
    "profitLoss": 305.00,
    "profitLossPercentage": 6.78
  }
]
```

---

### GET /investments/{investmentId}
Obter detalhes de um investimento específico.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "inv-1",
  "accountId": "acc-1",
  "institutionId": "inst-1",
  "name": "NVDA34",
  "type": "acao",
  "quantity": 10,
  "purchasePrice": 450.00,
  "currentPrice": 480.50,
  "purchaseDate": "2025-10-01T00:00:00Z",
  "currentValue": 4805.00,
  "profitLoss": 305.00,
  "profitLossPercentage": 6.78
}
```

---

### PUT /investments/{investmentId}
Atualizar dados de um investimento (preço atual, etc).

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "currentPrice": 485.00,
  "quantity": 10
}
```

**Response (200):**
```json
{
  "id": "inv-1",
  "accountId": "acc-1",
  "institutionId": "inst-1",
  "name": "NVDA34",
  "type": "acao",
  "quantity": 10,
  "purchasePrice": 450.00,
  "currentPrice": 485.00,
  "purchaseDate": "2025-10-01T00:00:00Z",
  "currentValue": 4850.00,
  "profitLoss": 350.00,
  "profitLossPercentage": 7.78
}
```

---

### POST /investments/institutions/{institutionId}/sync
Sincronizar investimentos com instituição conectada.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": "inv-new-1",
    "accountId": "acc-1",
    "institutionId": "inst-1",
    "name": "PETR4",
    "type": "acao",
    "quantity": 20,
    "purchasePrice": 35.00,
    "currentPrice": 37.50,
    "purchaseDate": "2025-11-20T00:00:00Z",
    "currentValue": 750.00,
    "profitLoss": 50.00,
    "profitLossPercentage": 7.14
  }
]
```

---

## 📈 Performance

### GET /investments/performance
Obter histórico de rentabilidade.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
```
?startDate=2025-10-01
?endDate=2025-11-21
?granularity=daily  (optional: daily, weekly, monthly)
```

**Response (200):**
```json
[
  {
    "date": "2025-10-01",
    "value": 50000.00,
    "return": 0.00
  },
  {
    "date": "2025-10-15",
    "value": 50500.00,
    "return": 500.00
  },
  {
    "date": "2025-11-21",
    "value": 55000.00,
    "return": 5000.00
  }
]
```

---

## 💡 Recomendações

### GET /investments/recommendations
Obter recomendações baseadas no perfil do usuário.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": "rec-1",
    "title": "Migrar de CDB para Tesouro Direto",
    "description": "O Tesouro Direto oferece melhores rendimentos com menor risco",
    "type": "migrar",
    "institution": "Nubank",
    "product": "CDB",
    "currentReturn": 10.5,
    "recommendedReturn": 13.2,
    "potentialGain": 2700.00,
    "riskLevel": "baixo",
    "reason": "Seu perfil é conservador, essa é uma oportunidade melhor"
  }
]
```

---

## 📥 Alertas

### GET /investments/alerts
Obter lista de alertas (opcional).

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": "alert-1",
    "type": "opportunity",
    "title": "Ação em alta",
    "message": "NVDA34 subiu 10%",
    "investmentId": "inv-1",
    "investmentName": "NVDA34",
    "action": {
      "label": "Ver mais",
      "href": "/dashboard?investment=inv-1"
    },
    "timestamp": "2025-11-21T10:30:00Z",
    "read": false
  }
]
```

---

## 📄 Exportação

### GET /investments/export
Exportar dados em PDF ou CSV.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
```
?format=pdf  (ou csv)
```

**Response:**
- Content-Type: `application/pdf` ou `text/csv`
- Body: Arquivo binário

---

## 🔄 Estruturas de Dados

### DashboardData
```typescript
{
  user: User
  summary: PortfolioSummary
  institutions: Institution[]
  investments: Investment[]
  categories: InvestmentCategory[]
  monthlyReturns: MonthlyReturn[]
  riskProfile: RiskProfile
}
```

### Investment
```typescript
{
  id: string
  accountId: string
  institutionId: string
  name: string
  type: 'acao' | 'fii' | 'cdb' | 'fundo' | 'tesouro' | 'cripto'
  quantity: number
  purchasePrice: number
  currentPrice: number
  purchaseDate: string (ISO 8601)
  currentValue: number
  profitLoss: number
  profitLossPercentage: number
}
```

### Institution
```typescript
{
  id: string
  name: string
  type: 'banco' | 'corretora' | 'fintech'
  connected: boolean
  connectedAt?: string
  accounts: Account[]
}
```

### Account
```typescript
{
  id: string
  institutionId: string
  name: string
  type: 'investimento' | 'poupanca' | 'conta_corrente'
  balance: number
  currency: string
}
```

---

## ⚠️ Erros Padrões

### 400 Bad Request
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Email inválido",
  "details": {
    "email": "Formato inválido"
  }
}
```

### 401 Unauthorized
```json
{
  "code": "UNAUTHORIZED",
  "message": "Token inválido ou expirado"
}
```

### 403 Forbidden
```json
{
  "code": "FORBIDDEN",
  "message": "Você não tem permissão para acessar este recurso"
}
```

### 404 Not Found
```json
{
  "code": "NOT_FOUND",
  "message": "Recurso não encontrado"
}
```

### 500 Internal Server Error
```json
{
  "code": "INTERNAL_SERVER_ERROR",
  "message": "Erro no servidor. Tente novamente mais tarde."
}
```

---

## 🔒 Autenticação

Todos os endpoints (exceto login e register) requerem:

```
Authorization: Bearer {token}
```

O token deve ser um JWT válido que:
1. Contém `userId` ou `sub` claim
2. Tem `exp` claim válido
3. Foi assinado com a chave secreta do backend

---

## 📌 Notas Importantes

1. **Timezone:** Use sempre ISO 8601 com timezone UTC (Z)
2. **Moeda:** Sempre BRL a menos que especificado
3. **Decimal:** Use `.` como separador decimal (não `,`)
4. **Rate Limiting:** Considere implementar para produção
5. **CORS:** Configure para `http://localhost:5173` em dev
6. **Validação:** Valide entrada no backend (nunca confie no cliente)

---

## 🧪 Teste Rápido

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Obter dashboard (usar token retornado)
curl -X GET http://localhost:3000/api/investments/dashboard \
  -H "Authorization: Bearer {token}"
```

---

**Última atualização:** 21 de novembro de 2025
**Versão:** 1.0
**Status:** Pronto para implementação
