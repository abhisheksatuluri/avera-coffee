import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import Button from '../components/Button';
import { Star, RefreshCw, Coffee } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

const ProductDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const product = PRODUCTS.find(p => p.id === id);
   const [grind, setGrind] = useState('Whole Bean');
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
      <div className="bg-obsidian min-h-screen pt-20 md:pt-32 pb-20 relative">
         {/* Global subtle texture */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <img
               src="/Floating Coffee Particles in Smoke.jpeg"
               alt=""
               className="w-full h-full object-cover opacity-[0.02]"
               loading="lazy"
            />
         </div>

         <div className="container mx-auto px-4 md:px-6 relative z-10">
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

                  {/* Order Actions */}
                  <div className="flex flex-col gap-4">
                     <a
                        href={getWhatsAppLink(`Hi! I'd like to order ${product.name} (${grind} grind) — ₹${product.price * 100}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gold text-obsidian font-bold py-4 px-6 text-center text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors flex items-center justify-center gap-3"
                     >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Order on WhatsApp
                     </a>
                     <Button variant="outline" className="w-full" to="/contact">Have Questions? Get in Touch</Button>
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