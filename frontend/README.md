# 🖥️ Ekhytera - Plataforma de Hardware e PC Building

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-6.15-2D3748?style=for-the-badge&logo=prisma)

Uma plataforma completa para entusiastas de hardware, oferecendo ferramentas de montagem de PC, catálogo de produtos, fórum de comunidade, sistema de promoções e conteúdo educacional.

## 📋 Índice

- [🏗️ Arquitetura do Sistema](#️-arquitetura-do-sistema)
- [🎨 Frontend (React + TypeScript)](#-frontend-react--typescript)
  - [Estrutura de Pastas](#estrutura-de-pastas)
  - [Componentes Principais](#componentes-principais)
  - [Gerenciamento de Estado](#gerenciamento-de-estado)
  - [Sistema de Roteamento](#sistema-de-roteamento)
- [⚙️ Backend (Node.js + Express)](#️-backend-nodejs--express)
  - [Arquitetura MVC](#arquitetura-mvc)
  - [Banco de Dados](#banco-de-dados)
  - [Autenticação e Segurança](#autenticação-e-segurança)
- [🚀 Instalação e Configuração](#-instalação-e-configuração)
- [📱 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)

## 🏗️ Arquitetura do Sistema

A aplicação segue uma **arquitetura cliente-servidor** com separação completa entre frontend e backend:

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│                 │    Requests     │                 │
│   Frontend      │◄───────────────►│    Backend      │
│   (React SPA)   │                 │   (Express API) │
│                 │                 │                 │
└─────────────────┘                 └─────────────────┘
         │                                   │
         │                                   │
         ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│   Static Files  │                 │   PostgreSQL    │
│   (Images/CSS)  │                 │   Database      │
└─────────────────┘                 └─────────────────┘
```

### Princípios Arquiteturais

- **Separação de Responsabilidades**: Frontend focado na UI/UX, Backend na lógica de negócio
- **RESTful API**: Comunicação padronizada via endpoints REST
- **Component-Based Architecture**: Interface modular e reutilizável
- **Responsive Design**: Adaptação automática para diferentes dispositivos
- **Progressive Web App**: Experiência nativa em navegadores

## 🎨 Frontend (React + TypeScript)

### Estrutura de Pastas

```
src/
├── components/           # Componentes reutilizáveis
│   ├── BentoGrid/       # Grid de funcionalidades principais
│   ├── ProductCard/     # Cards de produtos
│   ├── Testimonial/     # Depoimentos de usuários
│   ├── News/            # Seção de notícias
│   └── Carousel/        # Carrossel de imagens
├── pages/               # Páginas da aplicação
│   ├── Home/           # Página inicial
│   ├── Promotions/     # Catálogo de promoções
│   └── Login/          # Autenticação
├── contexts/           # Context API (Estado global)
├── services/           # Serviços de API
├── routes.tsx          # Configuração de rotas
├── types.ts           # Definições TypeScript
└── assets/            # Recursos estáticos
```

### Componentes Principais

#### 🏠 **BentoGrid Component**
```typescript
// Componente responsivo que apresenta os diferenciais da plataforma
export default function Bento() {
  return (
    <div className="bg-black py-24 sm:py-32 relative overflow-hidden">
      {/* Efeito de luz de fundo com blur */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-4xl aspect-square bg-gradient-to-tr from-[#79A7DD] to-[#415A77] opacity-20 blur-3xl transform rotate-12 scale-150" />
      </div>
      {/* Grid responsivo com diferentes layouts */}
    </div>
  )
}
```

**Características técnicas:**
- **CSS Grid responsivo**: Adapta layout em `lg:grid-cols-3 lg:grid-rows-2`
- **Blur effect**: Utiliza `backdrop-filter` para efeitos visuais
- **Responsive images**: Background dinâmico via Unsplash API
- **Hover states**: Transições suaves com `transition-all duration-500`

#### 🛒 **ProductCard Component**
```typescript
interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  category: 'processor' | 'gpu' | 'motherboard' | 'ram' | 'storage' | 'notebook' | 'monitor' | 'cooler' | 'source' | 'case';
  rating: number;
  brand: string;
  featured: boolean;
  stock: number;
  specifications?: string[];
  store: string;
}
```

**Lógica de negócio:**
- **Sistema de favoritos**: Gerenciado via `useState` com `Set<number>`
- **Cálculo de desconto**: Automático baseado em `originalPrice` e `salePrice`
- **Indicador de estoque**: Alerta visual quando `stock <= 5`
- **Integração com lojas**: Redirecionamento para stores parceiras

#### 📰 **News Component**
```typescript
const getNews = async () => {
  try {
    // Cache inteligente por data
    const storedNews = localStorage.getItem('noticias');
    const lastFetchDate = localStorage.getItem('lastFetchDate');
    const today = new Date().toISOString().split('T')[0];

    if (storedNews && lastFetchDate === today) {
      setNoticias(JSON.parse(storedNews));
      return;
    }

    // API NewsData.io com filtros específicos
    const url = `https://newsdata.io/api/1/latest?country=br&category=technology&language=pt&apikey=${apiKey}`;
    const resp = await fetch(url);
    const dados = await resp.json();

    // Filtragem dupla para garantir relevância
    const techNews = dados.results.filter((noticia: any) => 
      noticia.category && noticia.category.includes('technology')
    );
  }
}
```

**Otimizações implementadas:**
- **Cache por dia**: Evita chamadas desnecessárias à API
- **Filtragem dupla**: API + código para garantir conteúdo de tecnologia
- **Lazy loading**: Imagens carregadas sob demanda
- **Fallback image**: Imagem padrão quando a notícia não possui imagem

### Gerenciamento de Estado

#### Context API para Estado Global
```typescript
// Exemplo de contexto de autenticação
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

#### Local State Management
- **useState**: Para estados de componente (favoritos, modais, formulários)
- **useEffect**: Para side effects (API calls, subscriptions)
- **Custom hooks**: Para lógica reutilizável

### Sistema de Roteamento

```typescript
// routes.tsx - Configuração centralizada
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "promocoes", element: <Promotions /> },
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <Register /> },
    ]
  }
]);
```

**Características:**
- **Lazy loading**: Componentes carregados sob demanda
- **Protected routes**: Rotas que requerem autenticação
- **Error boundaries**: Tratamento de erros de rota

## ⚙️ Backend (Node.js + Express)

### Arquitetura MVC

```
src/
├── controllers/        # Lógica de controle
│   ├── authController.js
│   ├── productController.js
│   └── userController.js
├── middlewares/       # Middlewares customizados
│   ├── auth.js       # Verificação de JWT
│   └── validation.js # Validação de dados
├── repositories/     # Camada de dados
│   ├── userRepository.js
│   └── productRepository.js
├── routes/          # Definição de rotas
│   ├── auth.js
│   ├── products.js
│   └── users.js
└── server.js       # Configuração do servidor
```

#### **Controllers Layer**
```javascript
// authController.js - Exemplo de lógica de autenticação
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Busca usuário no banco
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Verifica senha com bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Gera JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
```

#### **Middleware de Autenticação**
```javascript
// middlewares/auth.js
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
```

### Banco de Dados

#### **Prisma Schema**
```prisma
// prisma/schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relacionamentos
  favorites Favorite[]
  posts     Post[]
  comments  Comment[]
  
  @@map("users")
}

model Product {
  id            Int      @id @default(autoincrement())
  name          String
  description   String?
  price         Decimal
  discount      Int?     @default(0)
  category      String
  brand         String
  specifications Json?
  images        String[]
  stock         Int      @default(0)
  featured      Boolean  @default(false)
  createdAt     DateTime @default(now())
  
  // Relacionamentos
  favorites     Favorite[]
  
  @@map("products")
}
```

#### **Repository Pattern**
```javascript
// repositories/userRepository.js
export const userRepository = {
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email }
    });
  },
  
  async create(userData) {
    return await prisma.user.create({
      data: userData
    });
  },
  
  async update(id, userData) {
    return await prisma.user.update({
      where: { id },
      data: userData
    });
  }
};
```

### Autenticação e Segurança

#### **JWT Implementation**
```javascript
// Geração de token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h',
    issuer: 'ekhytera-api',
    audience: 'ekhytera-client'
  });
};

// Refresh token logic
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newToken = generateToken({ userId: decoded.userId });
    
    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: 'Refresh token inválido' });
  }
};
```

#### **Password Security**
```javascript
// Hash da senha com bcrypt
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Validação de força da senha
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);
  
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas;
};
```

## 🚀 Instalação e Configuração

### Frontend Setup

```bash
# Navegar para o diretório frontend
cd ekhytera-backend/frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Backend Setup

```bash
# Navegar para o diretório backend
cd ekhytera-backend/backend

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma db push

# Executar em modo desenvolvimento
npm run dev
```

### Variáveis de Ambiente

#### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_NEWS_API_KEY=your_newsdata_api_key
```

#### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ekhytera"
JWT_SECRET=your_super_secret_jwt_key
REFRESH_SECRET=your_refresh_token_secret
PORT=3001
```

## 📱 Funcionalidades

### 🏠 **Página Inicial**
- **Hero Section**: Apresentação da plataforma com call-to-action
- **BentoGrid**: Grid responsivo mostrando diferenciais
- **Testimonials**: Carrossel de depoimentos com Swiper.js
- **News**: Notícias de tecnologia da API NewsData.io

### 🛒 **Sistema de Promoções**
- **Catálogo paginado**: 8 produtos por página
- **Filtros por categoria**: GPU, CPU, RAM, etc.
- **Sistema de favoritos**: Persistido no localStorage
- **Hero carousel**: Produtos em destaque com auto-advance

### 🔐 **Autenticação**
- **Login/Register**: Formulários com validação
- **JWT tokens**: Autenticação stateless
- **Refresh tokens**: Renovação automática de sessão
- **Protected routes**: Controle de acesso

### 🎯 **Sistema de Recomendação**
- **Análise de compatibilidade**: Verificação de hardware
- **Filtros inteligentes**: Por orçamento e uso
- **Comparação de preços**: Entre diferentes lojas

## 🛠️ Tecnologias Utilizadas

### Frontend Stack
- **React 19.1.1**: Biblioteca principal para UI
- **TypeScript**: Tipagem estática para maior segurança
- **Vite**: Build tool rápido e moderno
- **Tailwind CSS 4.1**: Framework CSS utility-first
- **React Router Dom**: Roteamento SPA
- **Axios**: Cliente HTTP para APIs
- **Swiper.js**: Carrosséis e sliders responsivos
- **React Hook Form**: Gerenciamento de formulários
- **GSAP**: Animações avançadas
- **Heroicons**: Biblioteca de ícones

### Backend Stack
- **Node.js 18+**: Runtime JavaScript
- **Express.js 4.21**: Framework web minimalista
- **Prisma 6.15**: ORM moderno para PostgreSQL
- **PostgreSQL**: Banco de dados relacional
- **JWT**: Autenticação via tokens
- **bcrypt**: Hash seguro de senhas
- **Multer**: Upload de arquivos
- **CORS**: Cross-Origin Resource Sharing

### DevOps & Tools
- **ESLint**: Linting para JavaScript/TypeScript
- **Prettier**: Formatação automática de código
- **Nodemon**: Hot reload para desenvolvimento
- **Git**: Controle de versão
- **VS Code**: Editor recomendado

## 📊 Performance e Otimizações

### Frontend Optimizations
- **Code Splitting**: Componentes carregados sob demanda
- **Lazy Loading**: Imagens e rotas lazy-loaded
- **Tree Shaking**: Eliminação de código não utilizado
- **Bundle Optimization**: Vite otimiza automaticamente o bundle
- **Image Optimization**: WebP quando possível

### Backend Optimizations
- **Database Indexing**: Índices em campos frequentemente consultados
- **Query Optimization**: Prisma com queries eficientes
- **Caching Strategy**: Cache de dados frequentes
- **Compression**: Gzip para responses HTTP

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Prisma
- **Database**: PostgreSQL
- **DevOps**: Vite + ESLint + Prettier

---

**Desenvolvido com ❤️ pela equipe Ekhytera**
