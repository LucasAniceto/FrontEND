# Investic Frontend

Frontend da aplicação Investic - Seu Aplicativo Centralizado de Investimentos.

## 🚀 Tecnologias

- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes acessíveis
- **Lucide React** - Ícones
- **Wouter** - Roteamento
- **Vite** - Build tool

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

## 🏗️ Executar o projeto

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## 🎨 Recursos

✅ Tema escuro elegante (amarelo, branco, preto)  
✅ Página inicial com hero section e features  
✅ Carrossel de depoimentos com 5 testemunhos  
✅ Página de contato com formulário validado  
✅ Dashboard preview com gráficos  
✅ Responsividade completa  
✅ Navegação intuitiva  
✅ Footer com links úteis  

## 📁 Estrutura do Projeto

```
investic-frontend/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── ContactForm.tsx
│   │   │   ├── TestimonialCarousel.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── ui/
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   └── index.html
├── server/
├── shared/
└── package.json
```
