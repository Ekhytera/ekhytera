import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';

export interface Product {
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
  store: string; // Nome da loja
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
  onViewInStore?: (productId: number, store: string) => void;
}

export default function ProductCard({ 
  product, 
  isFavorite, 
  onToggleFavorite, 
  onViewInStore 
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleViewInStore = () => {
    if (onViewInStore) {
      onViewInStore(product.id, product.store);
    }
  };

  return (
    <div className="bg-zinc-950/55 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group border border-zinc-700/50 hover:border-zinc-600/50 hover:shadow-2xl hover:shadow-[#79A7DD]/10">
      <div className="relative pt-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
          -{product.discount}%
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 border border-white/20"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {isFavorite ? (
            <HeartIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartOutlineIcon className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Stock Warning */}
        {product.stock <= 5 && (
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse shadow-lg">
            Últimas {product.stock} unidades
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400 bg-zinc-800/50 px-2 py-1 rounded-full">{product.brand}</span>
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300 font-medium">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 text-lg">
          {product.name}
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#79A7DD] to-white bg-clip-text text-transparent">
            {formatPrice(product.salePrice)}
          </div>
          <div className="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Economia de {formatPrice(product.originalPrice - product.salePrice)}
          </div>
        </div>

        <button 
          onClick={handleViewInStore}
          className="w-full mt-6 bg-zinc-900 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:bg-zinc-800"
        >
          Ver em {product.store}
        </button>
      </div>
    </div>
  );
}