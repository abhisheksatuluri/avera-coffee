import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import Button from '../components/Button';
import { Star, Truck, RefreshCw, Coffee } from 'lucide-react';

const ProductDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const product = PRODUCTS.find(p => p.id === id);
   const [grind, setGrind] = useState('Whole Bean');
   const [subType, setSubType] = useState<'onetime' | 'subscribe'>('onetime');
   const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current.play().catch(() => { });
      }
   }, []);

   if (!product) {
      return <div className="pt-32 text-center text-cream">Product not found</div>;
   }

   return (
      <div className="bg-obsidian min-h-screen pt-24 md:pt-32 pb-20 relative">
         {/* Global subtle texture */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <img
               src="/Floating Coffee Particles in Smoke.jpeg"
               alt=""
               className="w-full h-full object-cover opacity-[0.02]"
               loading="lazy"
            />
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16">

               {/* Left: Gallery */}
               <div className="w-full lg:w-1/2 space-y-6">
                  <div className="aspect-[4/5] w-full bg-espresso relative overflow-hidden group">
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                     <div className="aspect-square bg-espresso relative overflow-hidden">
                        <video
                           ref={videoRef}
                           autoPlay
                           loop
                           muted
                           playsInline
                           preload="metadata"
                           className="w-full h-full object-cover opacity-80"
                        >
                           <source src="/CREMA MACRO DETAIL.mp4" type="video/mp4" />
                        </video>
                     </div>
                     <div className="aspect-square bg-espresso relative overflow-hidden group">
                        <img
                           src="/Floating Coffee Particles in Smoke.jpeg"
                           alt="Coffee Texture"
                           className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                           loading="lazy"
                        />
                     </div>
                     <div className="aspect-square bg-espresso relative overflow-hidden group">
                        <img
                           src="/GRID CONSISTENCY SHOT.jpeg"
                           alt="Product Grid"
                           className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                           loading="lazy"
                        />
                     </div>
                  </div>
               </div>

               {/* Right: Details */}
               <div className="w-full lg:w-1/2">
                  <div className="mb-8">
                     <div className="flex items-center space-x-2 text-amber text-xs uppercase tracking-widest mb-4">
                        <span>{product.origin}</span>
                        <span>•</span>
                        <span>{product.roastLevel} Roast</span>
                     </div>
                     <h1 className="text-4xl md:text-5xl font-serif text-cream mb-4">{product.name}</h1>
                     <p className="text-xl text-gold font-medium">₹{product.price * 100}</p>
                  </div>

                  <div className="prose prose-invert mb-10 text-cream-dim leading-relaxed">
                     <p>{product.description}</p>
                  </div>

                  {/* Roast Meter */}
                  <div className="mb-10">
                     <p className="text-xs uppercase tracking-widest text-cream mb-3">Roast Profile</p>
                     <div className="h-1 w-full bg-white/10 rounded-full flex items-center">
                        <div className={`h-1.5 rounded-full bg-gold relative transition-all duration-500`} style={{
                           width: product.roastLevel === 'Light' ? '25%' :
                              product.roastLevel === 'Medium' ? '50%' :
                                 product.roastLevel === 'Medium-Dark' ? '75%' : '100%'
                        }}>
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(214,168,79,0.5)]"></div>
                        </div>
                     </div>
                     <div className="flex justify-between text-[10px] text-cream-dim uppercase mt-2">
                        <span>Light</span>
                        <span>Medium</span>
                        <span>Dark</span>
                     </div>
                  </div>

                  {/* Grind Selection */}
                  <div className="mb-10">
                     <p className="text-xs uppercase tracking-widest text-cream mb-3">Grind Option</p>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['Whole Bean', 'Aeropress', 'French Press', 'Espresso'].map(g => (
                           <button
                              key={g}
                              onClick={() => setGrind(g)}
                              className={`py-3 px-2 text-xs border transition-colors ${grind === g ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-cream-dim hover:border-white/30'}`}
                           >
                              {g}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Purchase Option */}
                  <div className="bg-espresso/50 border border-white/5 p-6 mb-10">
                     <label className="flex items-start cursor-pointer mb-6 group">
                        <input
                           type="radio"
                           name="subtype"
                           checked={subType === 'onetime'}
                           onChange={() => setSubType('onetime')}
                           className="mt-1 accent-gold"
                        />
                        <div className="ml-4">
                           <span className="block text-cream font-bold group-hover:text-gold transition-colors">One-time Purchase</span>
                           <span className="text-sm text-cream-dim">Standard delivery</span>
                        </div>
                        <span className="ml-auto text-cream">₹{product.price * 100}</span>
                     </label>

                     <label className="flex items-start cursor-pointer group">
                        <input
                           type="radio"
                           name="subtype"
                           checked={subType === 'subscribe'}
                           onChange={() => setSubType('subscribe')}
                           className="mt-1 accent-gold"
                        />
                        <div className="ml-4">
                           <span className="block text-cream font-bold group-hover:text-gold transition-colors">Subscribe & Save 15%</span>
                           <span className="text-sm text-cream-dim">Fresh roasted delivered every 2 weeks</span>
                        </div>
                        <span className="ml-auto text-gold font-bold">₹{(product.price * 100 * 0.85).toFixed(0)}</span>
                     </label>
                  </div>

                  <div className="flex flex-col gap-4">
                     <Button variant="primary" className="w-full">Add To Cart</Button>
                     <p className="text-center text-xs text-cream-dim flex items-center justify-center gap-2">
                        <Truck size={14} /> Free shipping on orders above ₹999
                     </p>
                  </div>
               </div>
            </div>

            {/* Bottom Details — with texture background */}
            <div className="relative mt-32 overflow-hidden">
               <img
                  src="/Coffee Beans Texture Background.jpeg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
                  loading="lazy"
               />
               <div className="absolute inset-0 bg-obsidian/95"></div>
               <div className="relative z-10 border-t border-white/5 pt-16 pb-8 grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                  <div>
                     <h3 className="font-serif text-xl text-cream mb-4 flex items-center gap-2"><Coffee className="text-gold" size={20} /> The Cup</h3>
                     <p className="text-cream-dim text-sm leading-relaxed">
                        Tasting notes of {product.tastingNotes.join(', ')}. This coffee has a silky body with a lingering sweet finish.
                     </p>
                  </div>
                  <div>
                     <h3 className="font-serif text-xl text-cream mb-4 flex items-center gap-2"><RefreshCw className="text-gold" size={20} /> The Process</h3>
                     <p className="text-cream-dim text-sm leading-relaxed">
                        Washed and sun-dried on raised beds. This careful processing ensures a clean cup with distinct flavor clarity.
                     </p>
                  </div>
                  <div>
                     <h3 className="font-serif text-xl text-cream mb-4 flex items-center gap-2"><Star className="text-gold" size={20} /> The Origin</h3>
                     <p className="text-cream-dim text-sm leading-relaxed">
                        Sourced directly from partner estates in {product.origin}. Grown under shade trees at elevations above 1200m.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductDetail;