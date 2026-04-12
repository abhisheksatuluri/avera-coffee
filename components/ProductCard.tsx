import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-espresso aspect-[3/4] mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
        />

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-obsidian/80 backdrop-blur-sm px-3 py-1 border border-white/10">
          <span className="text-[10px] uppercase tracking-widest text-gold">Roasted On Order</span>
        </div>

        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-xs uppercase tracking-widest text-white">View Details</span>
          <div className="bg-gold p-2 rounded-full text-obsidian">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-serif text-cream group-hover:text-gold transition-colors">{product.name}</h3>
        <div className="flex justify-between items-center border-t border-white/10 pt-2">
          <p className="text-sm text-cream-dim">{product.roastLevel} Roast</p>
          <p className="text-lg font-medium text-gold">₹{product.price * 100}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;