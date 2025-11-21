# 📊 Documentação - Dashboard de Investimentos

## 🎯 Visão Geral

O Dashboard é uma página protegida que exibe um consolidado completo de investimentos e rentabilidade do usuário. Só é acessível para usuários autenticados.

## 📁 Estrutura de Arquivos

```
client/src/
├── pages/
│   └── Dashboard.tsx                 # Página principal do dashboard
├── types/
│   └── dashboard.ts                  # Tipos e interfaces do dashboard
├── services/
│   └── investmentService.example.ts  # Exemplo de serviço de investimentos
```

## 🔐 Proteção de Rota

O Dashboard só aparece quando o usuário está logado. Se não estiver autenticado:
- Será exibida mensagem de "Acesso Restrito"
- Haverá botão para voltar à Home
- A rota `/dashboard` redirecionará automaticamente

```typescript
if (!isAuthenticated) {
  return <div>Acesso restrito - faça login primeiro</div>
}
```

## 📊 Estrutura de Dados

### Tipos Principais

```typescript
interface DashboardData {
  user: User
  summary: PortfolioSummary
  institutions: Institution[]
  investments: Investment[]
  categories: InvestmentCategory[]
  monthlyReturns: MonthlyReturn[]
  riskProfile: RiskProfile
}

interface PortfolioSummary {
  totalInvested: number           // Total investido
  totalCurrentValue: number       // Valor atual
  totalProfitLoss: number         // Lucro/prejuízo em R$
  totalProfitLossPercentage: number // Lucro/prejuízo em %
  institutions: number            // Quantidade de instituições
  accounts: number                // Quantidade de contas
  investments: number             // Quantidade de investimentos
}

interface Institution {
  id: string
  name: string
  type: 'banco' | 'corretora' | 'fintech'
  connected: boolean
  accounts: Account[]
}

interface Investment {
  id: string
  name: string
  type: 'acao' | 'fii' | 'cdb' | 'fundo' | 'tesouro' | 'cripto'
  quantity: number
  purchasePrice: number
  currentPrice: number
  currentValue: number
  profitLoss: number
  profitLossPercentage: number
  purchaseDate: string
}
```

## 🎨 Componentes e Seções

### 1. **Header com Controles**
- Botão voltar
- Título
- Botão mostrar/esconder valores

### 2. **Resumo Principal (4 Cards)**
- Saldo Total
- Lucro/Prejuízo (com indicador de cor)
- Instituições Conectadas
- Total de Investimentos

### 3. **Gráficos (2 Seções)**
- **Distribuição por Tipo**: Barra de progresso para cada categoria
- **Perfil de Risco**: Barra para conservador/moderado/agressivo

### 4. **Instituições Conectadas**
- Grid com cada instituição
- Número de contas
- Saldo por conta
- Botão para conectar nova instituição

### 5. **Tabela de Investimentos**
- Tabela com todos os investimentos
- Colunas: Nome, Qtd, Preço Unit., Valor Total, Lucro/Prejuízo, %
- Clique em linha para ver detalhes

### 6. **Detalhe de Investimento (Modal)**
- Exibido quando clica em um investimento
- Mostra: Quantidade, Preço Atual, Valor Total, Preço de Compra, Data, Rentabilidade, Lucro/Prejuízo Total

## 💾 Dados Mockados

Atualmente, o Dashboard usa dados mockados localmente:

```typescript
const MOCK_DASHBOARD_DATA: DashboardData = {
  user: { ... },
  summary: { ... },
  institutions: [ ... ],
  investments: [ ... ],
  // etc
}
```

Esses dados estão **hardcoded** apenas para demonstração. Quando integrar com seu backend, remova os dados mockados e substitua pelas chamadas à API.

## 🔗 Integrando com Backend

### Passo 1: Criar um Serviço de API

Use o exemplo fornecido em `src/services/investmentService.example.ts`:

```typescript
export const investmentService = {
  async getDashboard(): Promise<DashboardData> {
    return await apiClient.fetch<DashboardData>("/investments/dashboard")
  },

  async getInstitutions(): Promise<Institution[]> {
    return await apiClient.fetch<Institution[]>("/investments/institutions")
  },

  // ... mais métodos
}
```

### Passo 2: Usar o Serviço no Dashboard

```typescript
// Em Dashboard.tsx
import { investmentService } from '@/services/investmentService'

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Substituir MOCK_DASHBOARD_DATA pela chamada à API
        const response = await investmentService.getDashboard()
        setData(response)
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // ... resto do componente
}
```

### Passo 3: Endpoints Esperados do Backend

```
GET /api/investments/dashboard
  Response: { DashboardData }

GET /api/investments/institutions
  Response: { Institution[] }

POST /api/investments/institutions/connect
  Body: { institutionId, accessToken }
  Response: { Institution }

GET /api/investments
  Response: { Investment[] }

GET /api/investments/{id}
  Response: { Investment }

PUT /api/investments/{id}
  Body: { Partial<Investment> }
  Response: { Investment }

GET /api/investments/performance?startDate=&endDate=
  Response: { Array<{ date, value, return }> }

GET /api/investments/recommendations
  Response: { Array<Recommendation> }

GET /api/investments/export?format=pdf|csv
  Response: Blob (PDF ou CSV)
```

## 🎨 Customizações

### Alterar Cores e Temas

As cores estão definidas como classes Tailwind:

```typescript
// Em Dashboard.tsx
const colors = {
  acao: 'bg-blue-500',
  fii: 'bg-purple-500',
  cdb: 'bg-green-500',
  fundo: 'bg-yellow-500',
  tesouro: 'bg-orange-500',
  cripto: 'bg-red-500',
}
```

### Adicionar Novas Seções

Copie o padrão de um card existente:

```typescript
<Card className="p-6 border-2 border-gray-700 bg-gray-800">
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm font-semibold text-gray-400">Título</span>
    <IconComponent className="w-5 h-5 text-[#FFC107]" />
  </div>
  {/* Conteúdo aqui */}
</Card>
```

### Formatar Valores

Use as funções auxiliares:

```typescript
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

const formatNumber = (value: number, decimals = 2) => {
  return value.toFixed(decimals)
}
```

## 🔒 Segurança

### Token JWT
- Token é enviado automaticamente em todos os headers
- Armazenado em `localStorage`
- Removido ao fazer logout

### Dados Sensíveis
- Implementar botão mostrar/esconder valores
- Já implementado com ícone de olho
- Clique para alternar visibilidade

## 📱 Responsividade

O Dashboard é responsivo usando:
- `grid` com `md:` breakpoints
- Classes `hidden sm:inline` para desktop
- Tabela com `overflow-x-auto` em mobile
- Layout fluido com container

## 🧪 Testando Localmente

1. **Com dados mockados:**
   ```bash
   npm run dev
   # Faça login com admin/admin
   # Clique em "Dashboard"
   # Verá dados de exemplo
   ```

2. **Com backend real:**
   - Configure a URL da API em `.env.local`
   - Implemente o serviço de investimentos
   - Remova os dados mockados
   - Teste conexão com instituições

## 📈 Fluxo de Dados

```
┌─────────────────────────────┐
│ Dashboard Component         │
└──────────────┬──────────────┘
               │
               ├─→ useAuth() → Verifica autenticação
               │
               ├─→ investmentService.getDashboard()
               │
               └─→ setData() → Atualiza estado
                   │
                   ├─→ Summary Cards
                   ├─→ Gráficos
                   ├─→ Instituições
                   ├─→ Investimentos
                   └─→ Detalhes Selecionado
```

## 🐛 Troubleshooting

### Dashboard em branco
- Verifique se está logado
- Verifique console para erros

### Dados não carregam
- Verifique URL da API
- Verifique token em localStorage
- Verifique CORS no backend

### Valores não mostram
- Clique no ícone de olho para alternar visibilidade
- Verifique se dados mockados estão corretos

## 📝 Checklist de Integração

- [ ] Criar serviço de investimentos
- [ ] Implementar autenticação/autorização
- [ ] Conectar endpoints de investimentos
- [ ] Testar fluxo completo
- [ ] Implementar conexão de instituições (Open Finance)
- [ ] Adicionar gráficos em tempo real (Chart.js, Recharts, etc)
- [ ] Implementar refresh automático de dados
- [ ] Adicionar notificações de novos retornos
- [ ] Implementar exportação PDF/CSV

## 🚀 Próximas Melhorias

- [ ] Gráficos interativos com Recharts
- [ ] Timeline de rentabilidade
- [ ] Recomendações automáticas baseadas em perfil
- [ ] Alertas de preço
- [ ] Histórico de transações
- [ ] Simulador de investimentos
- [ ] Comparativo com índices (Ibovespa, CDI, etc)
