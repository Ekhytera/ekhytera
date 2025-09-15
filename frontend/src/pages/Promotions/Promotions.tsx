import { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { Product } from '../../components/ProductCard/ProductCard';

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "RTX 4080 Super Gaming X Trio",
    image: "/imgs/placadevideo.png",
    originalPrice: 4999.99,
    salePrice: 3799.99,
    discount: 24,
    category: "gpu",
    rating: 4.8,
    brand: "MSI",
    featured: true,
    stock: 5,
    specifications: ["16GB GDDR6X", "Boost Clock: 2550 MHz", "Ray Tracing"],
    store: "TechWorld"
  },
  {
    id: 2,
    name: "Notebook Gamer Legion 5 Pro",
    image: "https://p3-ofp.static.pub//fes/cms/2024/09/12/elsxf6rwrtxudesy107rsj88cg0qhx499173.png",
    originalPrice: 6999.99,
    salePrice: 5299.99,
    discount: 24,
    category: "notebook",
    rating: 4.7,
    brand: "Lenovo",
    featured: true,
    stock: 3,
    specifications: ["RTX 4060", "AMD Ryzen 7", "16GB RAM", "512GB SSD"],
    store: "GamerHub"
  },
  {
    id: 3,
    name: "Intel Core i7-13700K",
    image: "/imgs/processador.png",
    originalPrice: 2199.99,
    salePrice: 1649.99,
    discount: 25,
    category: "processor",
    rating: 4.9,
    brand: "Intel",
    featured: true,
    stock: 8,
    specifications: ["16 Cores", "24 Threads", "5.4 GHz Boost"],
    store: "PCMaster"
  }
];

const promotionProducts: Product[] = [
  {
    id: 4,
    name: "ASUS TUF Gaming B550M-Plus",
    image: "/imgs/placamae.png",
    originalPrice: 899.99,
    salePrice: 679.99,
    discount: 24,
    category: "motherboard",
    rating: 4.6,
    brand: "ASUS",
    featured: false,
    stock: 12,
    store: "TechZone"
  },
  {
    id: 5,
    name: "Corsair Vengeance LPX 32GB",
    image: "/imgs/image.png",
    originalPrice: 799.99,
    salePrice: 599.99,
    discount: 25,
    category: "ram",
    rating: 4.7,
    brand: "Corsair",
    featured: false,
    stock: 15,
    store: "MemoryShop"
  },
  {
    id: 6,
    name: "Samsung 980 PRO 1TB NVMe",
    image: "/imgs/print_nvme_kingston.png",
    originalPrice: 649.99,
    salePrice: 449.99,
    discount: 31,
    category: "storage",
    rating: 4.8,
    brand: "Samsung",
    featured: false,
    stock: 20,
    store: "SSDCenter"
  },
  {
    id: 7,
    name: "Monitor Gamer ASUS 27'' 144Hz",
    image: "/imgs/monitor.png",
    originalPrice: 1299.99,
    salePrice: 999.99,
    discount: 23,
    category: "monitor",
    rating: 4.5,
    brand: "ASUS",
    featured: false,
    stock: 7,
    store: "DisplayMax"
  },
  {
    id: 8,
    name: "Noctua NH-D15 CPU Cooler",
    image: "/imgs/cooler.png",
    originalPrice: 399.99,
    salePrice: 319.99,
    discount: 20,
    category: "cooler",
    rating: 4.9,
    brand: "Noctua",
    featured: false,
    stock: 10,
    store: "CoolTech"
  },
  {
    id: 9,
    name: "Corsair RM850x 850W 80+ Gold",
    image: "/imgs/fonte.png",
    originalPrice: 899.99,
    salePrice: 699.99,
    discount: 22,
    category: "source",
    rating: 4.8,
    brand: "Corsair",
    featured: false,
    stock: 6,
    store: "PowerStore"
  },
  {
    id: 10,
    name: "NZXT H5 Flow RGB Gaming Case",
    image: "/imgs/gabinete.png",
    originalPrice: 599.99,
    salePrice: 449.99,
    discount: 25,
    category: "case",
    rating: 4.6,
    brand: "NZXT",
    featured: false,
    stock: 8,
    store: "CaseWorld"
  },
  {
    id: 11,
    name: "AMD Ryzen 5 7600X",
    image: "/imgs/processador.png",
    originalPrice: 1499.99,
    salePrice: 1199.99,
    discount: 20,
    category: "processor",
    rating: 4.7,
    brand: "AMD",
    featured: false,
    stock: 12,
    store: "CPUCenter"
  },
  {
    id: 12,
    name: "Gigabyte B650 AORUS Elite",
    image: "/imgs/placamae.png",
    originalPrice: 1099.99,
    salePrice: 849.99,
    discount: 23,
    category: "motherboard",
    rating: 4.5,
    brand: "Gigabyte",
    featured: false,
    stock: 9,
    store: "MoboShop"
  },
  {
    id: 13,
    name: "G.SKILL Trident Z5 RGB 32GB",
    image: "/imgs/image.png",
    originalPrice: 1299.99,
    salePrice: 999.99,
    discount: 23,
    category: "ram",
    rating: 4.8,
    brand: "G.SKILL",
    featured: false,
    stock: 15,
    store: "RAMWorld"
  }
];

export default function Promotions() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'gpu', name: 'Placas de Vídeo' },
    { id: 'processor', name: 'Processadores' },
    { id: 'notebook', name: 'Notebooks' },
    { id: 'motherboard', name: 'Placas-mãe' },
    { id: 'ram', name: 'Memórias RAM' },
    { id: 'storage', name: 'Armazenamento' },
    { id: 'monitor', name: 'Monitores' },
    { id: 'cooler', name: 'Coolers' },
    { id: 'source', name: 'Fontes' },
    { id: 'case', name: 'Gabinetes' }
  ];

  const filteredProducts = filter === 'all' 
    ? promotionProducts 
    : promotionProducts.filter(product => product.category === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Carousel */}
      <section className="relative h-[50vh] overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 z-10" />
        
        {/* Carousel Container */}
        <div 
          className="flex transition-transform duration-700 ease-out h-full pt-6"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10" />
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover opacity-80"
              />
              
              {/* Product Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-end justify-between">
                    <div className="flex-1 max-w-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                          -{product.discount}%
                        </span>
                        <span className="text-sm text-gray-300 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">{product.brand}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-[#79A7DD] to-white bg-clip-text text-transparent">
                        {product.name}
                      </h2>
                      {product.specifications && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.specifications.slice(0, 3).map((spec, i) => (
                            <span key={i} className="bg-zinc-800/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs border border-zinc-700/50 hover:bg-zinc-700/80 transition-colors">
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#79A7DD] to-white bg-clip-text text-transparent">
                          {formatPrice(product.salePrice)}
                        </span>
                      </div>
                      <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:bg-zinc-800">
                        Comprar Agora
                      </button>
                    </div>
                    
                    {/* Stock Info */}
                    <div className="text-right bg-black/30 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                      <p className="text-xs text-gray-300">Restam apenas</p>
                      <p className="text-xl font-bold text-red-400 animate-pulse">{product.stock} unidades</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#79A7DD] scale-125 shadow-lg shadow-[#79A7DD]/50' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Promotions Gallery */}
      <section className="py-12 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              🔥 Ofertas Imperdíveis
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Descontos de até 50% em peças e notebooks selecionados. Ofertas por tempo limitado!
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-gradient-to-r from-[#79A7DD] to-white text-black shadow-lg shadow-[#79A7DD]/25 scale-105'
                    : 'bg-zinc-800/80 text-gray-300 hover:bg-zinc-700/80 backdrop-blur-sm border border-zinc-700/50 hover:border-zinc-600/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {currentProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.has(product.id)}
                onToggleFavorite={toggleFavorite}
                onViewInStore={(id, store) => console.log(`Ver produto ${id} na loja ${store}`)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-zinc-800/50 text-gray-500 cursor-not-allowed'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700 hover:scale-105'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-[#79A7DD] to-white text-black shadow-lg scale-110'
                        : 'bg-zinc-800 text-white hover:bg-zinc-700 hover:scale-105'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-zinc-800/50 text-gray-500 cursor-not-allowed'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700 hover:scale-105'
                }`}
              >
                Próxima
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Products count info */}
          <div className="text-center text-gray-400 text-sm mb-8">
            Mostrando {currentProducts.length} de {filteredProducts.length} produtos
            {totalPages > 1 && ` • Página ${currentPage} de ${totalPages}`}
          </div>

          {/* No products message */}
          {currentProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">
                Nenhum produto encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}