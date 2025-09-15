# Página de Promoções - Ekhytera

Uma página completa de catálogo de promoções para peças e notebooks, desenvolvida com React + TypeScript e estilizada com Tailwind CSS v4.1.

## Características

### 🎠 Carrossel Hero
- **Carrossel automático** com transições suaves
- **Navegação por setas** e indicadores de pontos
- **Produtos em destaque** com informações detalhadas
- **Gradientes animados** e efeitos visuais modernos
- **Responsive design** para todos os dispositivos

### 🛍️ Galeria de Produtos
- **Grid responsivo** que se adapta ao tamanho da tela
- **Filtros por categoria** (Processadores, GPUs, Notebooks, etc.)
- **Cards de produto** com animações hover
- **Badges de desconto** com animação pulse
- **Indicador de estoque baixo** para produtos com poucas unidades
- **Sistema de favoritos** com persistência visual
- **Botões "Ver em [Loja]"** que direcionam para a loja específica de cada produto

## Tecnologias Utilizadas

- **React 18** com TypeScript
- **Tailwind CSS v4.1** para estilização
- **Heroicons** para ícones
- **CSS Grid & Flexbox** para layouts responsivos

## Componentes Criados

### ProductCard
- Componente reutilizável para exibir produtos
- Props tipadas com TypeScript
- Animações hover com Tailwind
- Sistema de favoritos integrado
- Botão para visualizar produto na loja específica

### Carousel
- Componente de carrossel genérico e reutilizável
- Autoplay configurável
- Navegação por setas e dots
- Transições suaves

## Recursos de UX/UI

### Animações
- **Hover effects** nos cards de produto
- **Animações de escala** nos botões
- **Transições suaves** no carrossel
- **Efeitos pulse** nos badges de desconto
- **Gradientes animados** nos textos

### Responsividade
- **Mobile-first approach**
- **Grid adaptativo** (1 coluna em mobile, até 4 em desktop)
- **Carrossel otimizado** para touch
- **Tipografia escalável**

### Acessibilidade
- **Aria-labels** nos botões de navegação
- **Alt text** nas imagens
- **Contraste adequado** nas cores
- **Navegação por teclado** suportada

## Estrutura de Dados

```typescript
interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  category: string;
  rating: number;
  brand: string;
  featured: boolean;
  stock: number;
  specifications?: string[];
  store: string; // Nome da loja que vende o produto
}
```

## Funcionalidades

- ✅ Carrossel automático com produtos em destaque
- ✅ Filtros por categoria de produto
- ✅ Sistema de favoritos
- ✅ Cálculo automático de desconto e economia
- ✅ Indicadores de estoque baixo
- ✅ Formatação de preços em Real (BRL)
- ✅ Botões "Ver em [Loja]" para direcionamento às lojas parceiras
- ✅ Animações e transições suaves
- ✅ Design totalmente responsivo

## Performance

- **Lazy loading** pode ser implementado para imagens
- **Memorização** de funções de formatação de preço
- **Otimização** de re-renders com React.memo
- **CSS puro** através do Tailwind para máxima performance

## Próximos Passos

- [ ] Integração com API de produtos e lojas
- [ ] Sistema de redirecionamento para lojas parceiras
- [ ] Filtros avançados (preço, marca, rating)
- [ ] Busca de produtos
- [ ] Wishlist persistente
- [ ] Comparação de produtos
- [ ] Reviews e avaliações
- [ ] Sistema de tracking de cliques nas lojas