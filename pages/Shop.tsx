import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import Section from '../components/Section';

const Shop: React.FC = () => {
   const [activeFilter, setActiveFilter] = useState<string>('All');
   const filters = ['All', 'Light', 'Medium', 'Medium-Dark', 'Dark'];

   const filteredProducts = activeFilter === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.roastLevel === activeFilter);

   return (
      <div className="bg-obsidian min-h-screen pt-24 relative">
         {/* Subtle global grain texture */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <img
               src="/Floating Coffee Particles in Smoke.jpeg"
               alt=""
               className="w-full h-full object-cover opacity-[0.02]"
               loading="lazy"
            />
         </div>

         {/* Header */}
         <div className="relative h-[40vh] w-full overflow-hidden mb-16 z-10">
            <img
               src="/Coffee Beans Texture Background.jpeg"
               alt="Coffee Beans"
               className="absolute inset-0 w-full h-full object-cover opacity-40"
               loading="eager"
            />
            <img
               src="/Floating Coffee Particles in Smoke.jpeg"
               alt="Floating Particles"
               className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
               loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian/80">
               <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-serif text-cream mb-4">Our Collection</h1>
                  <p className="text-cream-dim tracking-widest uppercase text-sm">Small Batch. Hand Roasted.</p>
               </div>
            </div>
         </div>

         <div className="container mx-auto px-6 pb-24 flex flex-col md:flex-row gap-12 relative z-10">

            {/* Sidebar Filters */}
            <aside className="w-full md:w-1/4 sticky top-32 h-fit">
               <h3 className="text-gold uppercase tracking-widest text-sm font-bold mb-6 pb-2 border-b border-white/10">Roast Level</h3>
               <div className="flex flex-col space-y-3">
                  {filters.map(filter => (
                     <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`text-left text-sm transition-colors ${activeFilter === filter ? 'text-cream font-bold pl-2 border-l-2 border-gold' : 'text-cream-dim hover:text-cream'}`}
                     >
                        {filter}
                     </button>
                  ))}
               </div>

               <h3 className="text-gold uppercase tracking-widest text-sm font-bold mt-12 mb-6 pb-2 border-b border-white/10">Grind Type</h3>
               <div className="flex flex-col space-y-3">
                  <label className="flex items-center space-x-3 text-cream-dim text-sm cursor-pointer hover:text-cream">
                     <input type="checkbox" className="accent-gold w-4 h-4 bg-transparent border-white/20" />
                     <span>Whole Bean</span>
                  </label>
                  <label className="flex items-center space-x-3 text-cream-dim text-sm cursor-pointer hover:text-cream">
                     <input type="checkbox" className="accent-gold w-4 h-4" />
                     <span>French Press</span>
                  </label>
                  <label className="flex items-center space-x-3 text-cream-dim text-sm cursor-pointer hover:text-cream">
                     <input type="checkbox" className="accent-gold w-4 h-4" />
                     <span>Paper Filter</span>
                  </label>
                  <label className="flex items-center space-x-3 text-cream-dim text-sm cursor-pointer hover:text-cream">
                     <input type="checkbox" className="accent-gold w-4 h-4" />
                     <span>Espresso</span>
                  </label>
               </div>
            </aside>

            {/* Product Grid */}
            <div className="w-full md:w-3/4">
               <Section className="py-0 md:py-0">
                  <p className="text-cream-dim text-sm mb-6">Showing {filteredProducts.length} results</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                     ))}
                  </div>
               </Section>
            </div>
         </div>
      </div>
   );
};

export default Shop;