# 🔗 Setup do Git e Como Fazer Commit

**Tudo que você precisa saber para versionar seu projeto.**

---

## 📋 Resumo Rápido

```bash
# 1. Verificar status
git status

# 2. Adicionar arquivos
git add .

# 3. Fazer commit
git commit -m "🚀 feat: preparar frontend para integração com backend"

# 4. Push (opcional, se tem repo remoto)
git push origin main
```

---

## 🚀 Passo-a-Passo Completo

### Verificar se é um repositório git

```bash
cd /home/luybi/FRONT
git status
```

**Se retornar erro "not a git repository":**

```bash
git init
```

---

### 1. Ver arquivos que mudaram

```bash
git status
```

Você verá algo como:

```
Changes not staged for commit:
  modified:   client/src/contexts/AuthContext.tsx

Untracked files:
  client/src/lib/formatters.ts
  client/src/lib/apiError.ts
  client/src/hooks/
  client/src/services/
  .gitignore
  .env.local.example
  LEIA_PRIMEIRO.md
  ... etc
```

---

### 2. Adicionar Arquivos

```bash
# Adicionar TUDO
git add .

# Ou específicos (não recomendado)
git add client/src/lib/
git add client/src/hooks/
git add client/src/services/
git add .gitignore
git add *.md
```

---

### 3. Verificar o que será commitado

```bash
git diff --staged
```

**Importante:** Verifique se NÃO tem:
- ❌ `.env.local` (apenas `.env.local.example`)
- ❌ `node_modules/` (deve estar no `.gitignore`)
- ❌ `dist/` (deve estar no `.gitignore`)
- ❌ Senhas ou credenciais

---

### 4. Fazer o Commit

**Opção 1: Mensagem Curta**

```bash
git commit -m "🚀 feat: preparar frontend para integração com backend"
```

**Opção 2: Mensagem Detalhada (RECOMENDADO)**

```bash
git commit -m "🚀 feat: preparar frontend para integração com backend

Implementadas 5 melhorias críticas:

1. Formatadores Centralizados
   - lib/formatters.ts com funções reutilizáveis
   - Suporte para currency, percentage, cpf, phone, date
   - Pronto para internacionalização

2. Hooks Customizados
   - useFetch<T>() com loading e error automáticos
   - useLocalStorage<T>() para persistência
   - Type-safe e reutilizáveis

3. Services Reais
   - authService.ts com JWT e persistência
   - investmentService.ts com 11 endpoints
   - API client centralizado com Bearer token

4. Persistência de Sessão
   - AuthContext valida token ao carregar
   - Restaura usuário automaticamente
   - Logout com limpeza completa

5. Tratamento de Erros
   - ApiError class com métodos de identificação
   - retryAsync com backoff exponencial
   - Mensagens amigáveis ao usuário

Documentação:
- LEIA_PRIMEIRO.md
- RESUMO_EXECUTIVO.md
- QUICK_START.md
- GUIA_INTEGRACAO_COMPLETO.md
- MELHORIAS_IMPLEMENTADAS.md
- API_ENDPOINTS_ESPERADOS.md

Qualidade:
- Build passa 100%
- TypeScript strict mode
- Zero breaking changes
- Sem dependências novas"
```

---

### 5. Verificar que foi commitado

```bash
git log -1
```

Você deve ver seu commit recém-criado.

---

### 6. Push para Repositório Remoto (Opcional)

Se tem GitHub, GitLab ou outro repositório configurado:

```bash
# Para branch main
git push origin main

# Ou seu branch atual
git push origin seu-branch-name

# Ver branches
git branch -a
```

---

## 📝 Mensagem de Commit: Padrão Convencional

Usamos **Conventional Commits** para mensagens claras:

```
<tipo>(<escopo>): <descrição>

<corpo>

<rodapé>
```

### Tipos Comuns

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Mudanças em documentação
- **refactor**: Refatoração de código
- **perf**: Melhorias de performance
- **test**: Adição de testes
- **chore**: Alterações de build, dependências, etc

### Exemplo

```bash
git commit -m "🚀 feat(core): preparar frontend para integração com backend

- Formatadores centralizados
- Hooks customizados
- Services reais
- Persistência de sessão
- Tratamento de erros"
```

---

## 🔍 Comandos Úteis

### Ver diferenças

```bash
# Não staged
git diff

# Staged
git diff --staged

# Comparar com último commit
git diff HEAD
```

### Ver histórico

```bash
# Últimos 5 commits
git log --oneline -5

# Com detalhes
git log -1 --stat

# Gráfico
git log --graph --oneline --all
```

### Desfazer

```bash
# Desfazer último commit (sem perder arquivos)
git reset --soft HEAD~1

# Desfazer último commit (perdendo arquivos)
git reset --hard HEAD~1

# Desfazer arquivo específico
git restore arquivo.ts
```

### Ver ramos

```bash
# Ver todos
git branch -a

# Criar novo
git branch novo-nome

# Mudar para outro
git checkout outro-nome

# Deletar
git branch -d nome-a-deletar
```

---

## ⚠️ Cuidados Importantes

### 1. Nunca commitear `.env.local`

```bash
# Adicione ao .gitignore (já está!)
echo ".env.local" >> .gitignore

# Se foi commitado, remova:
git rm --cached .env.local
git commit -m "chore: remove .env.local"
```

### 2. Nunca commitear senhas

**Busque no código:**

```bash
# Procurar por "password"
grep -r "password" client/src/

# Procurar por "secret"
grep -r "secret" client/src/
```

### 3. Ignorar node_modules e dist

O `.gitignore` já cuida disso, mas verifique:

```bash
# Ver o que será ignorado
git status --ignored

# Listar arquivos no git
git ls-files
```

---

## 🔄 Workflow Recomendado

### 1. Criar branch para feature

```bash
git checkout -b feat/integracao-backend
```

### 2. Fazer mudanças e commits

```bash
# Trabalhar no código
# ... mudanças ...

# Commit
git add .
git commit -m "feat: adicionar autenticação real"
```

### 3. Push para remoto

```bash
git push origin feat/integracao-backend
```

### 4. Pull Request / Merge Request

No GitHub/GitLab, criar PR e mergear para main

### 5. Atualizar main localmente

```bash
git checkout main
git pull origin main
```

---

## 💻 Configuração Git (Primeira Vez)

Se é a primeira vez usando git, configure:

```bash
# Nome
git config --global user.name "Seu Nome"

# Email
git config --global user.email "seu.email@example.com"

# Verificar
git config --global --list
```

---

## 📊 Resumo do Commit

Será commitado:

```
✨ Arquivos Novos (12):
   - 7 TypeScript files
   - 5 Markdown docs
   - 1 .gitignore

🔧 Arquivos Modificados (1):
   - AuthContext.tsx

📄 Configuração (2):
   - .env.local.example
   - COMO_FAZER_COMMIT.md (este)
```

---

## ✅ Checklist Final

Antes de fazer commit:

- [ ] `npm run build` passou?
- [ ] `git status` mostra os arquivos corretos?
- [ ] `.env.local` não está nos arquivos a commitear?
- [ ] Nenhuma senha ou credencial no código?
- [ ] Pronto para fazer commit?

---

## 🎯 Comando Único (Copie e Execute)

```bash
cd /home/luybi/FRONT && git add . && git commit -m "🚀 feat: preparar frontend para integração com backend

Implementadas 5 melhorias críticas:
- Formatadores centralizados
- Hooks customizados
- Services reais
- Persistência de sessão
- Tratamento de erros estruturado

Adicionada documentação completa e .gitignore"
```

---

## 🚀 Depois do Commit

Se tem repositório remoto:

```bash
git push origin main
```

Ver resultado:

```bash
git log --oneline -5
```

---

## 📖 Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Docs](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

**Pronto! Seu projeto está versionado. 🎉**

Qualquer dúvida, consulte os comandos acima ou a documentação do Git.
