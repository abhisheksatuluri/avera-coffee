import React, { useEffect, useRef } from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { Check, X } from 'lucide-react';

const Subscription: React.FC = () => {
   const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current.play().catch(() => { });
      }
   }, []);

   return (
      <div className="bg-obsidian min-h-screen pt-24">
         {/* Hero with ambient video */}
         <div className="relative overflow-hidden mb-16">
            <video
               ref={videoRef}
               autoPlay
               loop
               muted
               playsInline
               preload="auto"
               className="absolute inset-0 w-full h-full object-cover opacity-30"
            >
               <source src="/the power of silence.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian"></div>
            <div className="relative z-10 text-center container mx-auto px-6 py-24">
               <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-4">The Avera Club</span>
               <h1 className="text-4xl md:text-6xl font-serif text-cream mb-6">Better Coffee.<br />On Autopilot.</h1>
               <p className="text-cream-dim max-w-xl mx-auto text-lg">
                  Skip the supermarket stale beans. Get estate-level freshness delivered to your door at a schedule that suits you.
               </p>
            </div>
         </div>

         {/* Steps — with subtle texture */}
         <div className="relative overflow-hidden">
            <img
               src="/Floating Coffee Particles in Smoke.jpeg"
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-[0.03]"
               loading="lazy"
            />
            <div className="absolute inset-0 bg-obsidian/97"></div>
            <div className="container mx-auto px-6 mb-24 relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="text-center p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300">
                     <div className="text-4xl text-white/20 font-serif mb-4">01</div>
                     <h3 className="text-xl text-cream font-serif mb-4">Choose Your Coffee</h3>
                     <p className="text-sm text-cream-dim">Select from our signature blends or rotating single origins.</p>
                  </div>
                  <div className="text-center p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300">
                     <div className="text-4xl text-white/20 font-serif mb-4">02</div>
                     <h3 className="text-xl text-cream font-serif mb-4">Select Frequency</h3>
                     <p className="text-sm text-cream-dim">Weekly, bi-weekly, or monthly. Pause or cancel anytime.</p>
                  </div>
                  <div className="text-center p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300">
                     <div className="text-4xl text-white/20 font-serif mb-4">03</div>
                     <h3 className="text-xl text-cream font-serif mb-4">We Roast & Ship</h3>
                     <p className="text-sm text-cream-dim">Your coffee is roasted 24 hours before it ships. Guaranteed.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Subscription Image Block */}
         <div className="relative overflow-hidden">
            <img
               src="/Coffee Beans Texture Background.jpeg"
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-[0.05]"
               loading="lazy"
            />
            <div className="absolute inset-0 bg-espresso/90"></div>
            <Section className="relative z-10 py-24">
               <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                  <div className="w-full md:w-1/2">
                     <img
                        src="/Early Morning Window Ritual.jpeg"
                        alt="Morning Coffee Ritual"
                        className="w-full aspect-[4/3] object-cover opacity-90"
                        loading="lazy"
                     />
                  </div>
                  <div className="w-full md:w-1/2">
                     <h2 className="text-3xl font-serif text-cream mb-6">Your Morning, Elevated</h2>
                     <p className="text-cream-dim leading-relaxed mb-6">
                        Imagine waking up knowing that the freshest, most precisely roasted coffee in India is already at your door. That's the Avera Club promise.
                     </p>
                     <Button to="/shop" variant="primary">Browse The Collection</Button>
                  </div>
               </div>
            </Section>
         </div>

         {/* Comparison Table — with texture */}
         <div className="relative overflow-hidden">
            <img
               src="/Roasting Fire Ritual.jpeg"
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
               loading="lazy"
            />
            <div className="absolute inset-0 bg-espresso/95"></div>
            <Section className="relative z-10 py-24">
               <div className="container mx-auto px-6">
                  <h2 className="text-center text-3xl font-serif text-cream mb-16">Why Subscribe?</h2>
                  <div className="overflow-x-auto">
                     <table className="w-full max-w-4xl mx-auto text-left border-collapse">
                        <thead>
                           <tr className="border-b border-white/10">
                              <th className="p-4 text-cream font-serif">Benefit</th>
                              <th className="p-4 text-cream-dim font-normal">One-Time Purchase</th>
                              <th className="p-4 text-gold font-bold">Avera Subscriber</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                           <tr>
                              <td className="p-4 text-cream">Price per bag</td>
                              <td className="p-4 text-cream-dim">MRP</td>
                              <td className="p-4 text-cream">15% Off</td>
                           </tr>
                           <tr>
                              <td className="p-4 text-cream">Shipping</td>
                              <td className="p-4 text-cream-dim">Standard Rates</td>
                              <td className="p-4 text-cream">Always Free</td>
                           </tr>
                           <tr>
                              <td className="p-4 text-cream">Roast Priority</td>
                              <td className="p-4 text-cream-dim">Standard Queue</td>
                              <td className="p-4 text-cream">First Batch Priority</td>
                           </tr>
                           <tr>
                              <td className="p-4 text-cream">Exclusive Lots</td>
                              <td className="p-4 text-cream-dim"><X size={16} className="text-white/20" /></td>
                              <td className="p-4 text-cream"><Check size={16} className="text-gold" /></td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <div className="text-center mt-12">
                     <Button to="/shop" variant="primary">Start Your Subscription</Button>
                  </div>
               </div>
            </Section>
         </div>
      </div>
   );
};

export default Subscription;