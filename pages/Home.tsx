import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import TasteQuiz from '../components/TasteQuiz';
import { Flame, Truck, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        const retry = () => {
          videoRef.current?.play().catch(() => {});
          document.removeEventListener('click', retry);
        };
        document.addEventListener('click', retry, { once: true });
      });
    }
  }, []);

  return (
    <div className="w-full">

      {/* HERO + QUIZ — video background with quiz overlay */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src="/Hero Roasting Sequence.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/30 via-black/40 to-black/70"></div>
        </div>

        {/* Quiz Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-0">
          <TasteQuiz />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/Coffee Beans Texture Background.webp"
            alt=""
            className="w-full h-full object-cover opacity-[0.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-espresso"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-amber text-xs font-bold uppercase tracking-widest block mb-2">Selected For You</span>
              <h2 className="text-3xl md:text-5xl font-serif text-cream">Signature Roasts</h2>
            </motion.div>
            <Link to="/shop" className="hidden md:flex items-center space-x-2 text-cream-dim hover:text-gold transition-colors">
              <span className="text-sm uppercase tracking-widest">View All</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Button to="/shop" variant="outline">View All</Button>
          </div>
        </div>
      </section>

      {/* FRESHNESS */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/Roasting Fire Ritual.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-obsidian/70"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10"
          >
            <div className="px-4 py-8 hover:bg-white/5 transition-colors rounded-lg duration-300">
              <div className="text-gold mb-6 flex justify-center"><Flame size={48} strokeWidth={1} /></div>
              <h3 className="text-2xl font-serif text-cream mb-4">Roasted On Order</h3>
              <p className="text-cream-dim text-base leading-relaxed">We don't hold stock. Your coffee is roasted specifically for you, ensuring peak flavor profile upon arrival.</p>
            </div>
            <div className="px-4 py-8 hover:bg-white/5 transition-colors rounded-lg duration-300">
              <div className="text-gold mb-6 flex justify-center"><Check size={48} strokeWidth={1} /></div>
              <h3 className="text-2xl font-serif text-cream mb-4">Precision Grind</h3>
              <p className="text-cream-dim text-base leading-relaxed">From fine espresso to coarse French Press, we grind your beans to micron-level precision just before sealing.</p>
            </div>
            <div className="px-4 py-8 hover:bg-white/5 transition-colors rounded-lg duration-300">
              <div className="text-gold mb-6 flex justify-center"><Truck size={48} strokeWidth={1} /></div>
              <h3 className="text-2xl font-serif text-cream mb-4">Delivered in 48 Hrs</h3>
              <p className="text-cream-dim text-base leading-relaxed">Fast, tracked delivery across Hyderabad and major metros to preserve the volatile aromatics.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LIFESTYLE QUOTE */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/URBAN ACHIEVER LIFESTYLE.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-7xl font-serif text-white mb-8 md:mb-10 drop-shadow-2xl leading-tight"
          >
            "Your Morning Is Not A Routine.<br /> It Is A Ritual."
          </motion.h2>
        </div>
      </section>

      {/* SUBSCRIPTION BLOCK */}
      <div className="flex flex-col justify-center bg-cream text-espresso py-24">
        <Section className="py-0">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="relative aspect-square">
                <img
                  src="/AVERA Starter Bundle.webp"
                  alt="Subscription Box"
                  className="w-full h-full object-cover shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-obsidian text-gold p-6 md:p-8 shadow-xl">
                  <p className="text-3xl font-serif font-bold">10%</p>
                  <p className="text-xs uppercase tracking-widest">Savings</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <span className="text-amber text-xs font-bold uppercase tracking-widest block mb-4">The Avera Club</span>
              <h2 className="text-4xl md:text-6xl font-serif text-espresso mb-6">Never Run Out of <br />Freshness</h2>
              <p className="text-espresso/80 text-lg mb-8 leading-relaxed">
                Set your frequency. Choose your roast. Cancel anytime.
                Subscribers get priority roasting slots and exclusive access to our Estate Reserve lots.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3"><Check size={20} className="text-amber" /> <span className="font-medium">Free shipping on all orders</span></li>
                <li className="flex items-center gap-3"><Check size={20} className="text-amber" /> <span className="font-medium">Freshly roasted within 24h of dispatch</span></li>
                <li className="flex items-center gap-3"><Check size={20} className="text-amber" /> <span className="font-medium">Flexible delivery schedule</span></li>
              </ul>
              <Button to="/subscription" variant="secondary" className="bg-obsidian text-cream hover:bg-espresso hover:text-gold border-none hover:scale-105 transition-transform">Join The Club</Button>
            </div>
          </div>
        </Section>
      </div>

      {/* TESTIMONIALS */}
      <div className="flex items-center border-t border-white/5 py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/Floating Coffee Particles in Smoke.webp"
            alt=""
            className="w-full h-full object-cover opacity-[0.04]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-obsidian/95"></div>
        </div>
        <Section className="w-full py-0 relative z-10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif text-cream mb-16">The Connoisseur's Choice</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map(t => (
                <div key={t.id} className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors hover:-translate-y-2 duration-300">
                  <div className="flex justify-center text-gold mb-6 gap-1">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 bg-gold rounded-full" />)}
                  </div>
                  <p className="text-cream-dim italic mb-6 leading-relaxed">"{t.quote}"</p>
                  <h4 className="text-cream font-serif text-lg">{t.name}</h4>
                  <span className="text-xs text-amber uppercase tracking-widest">{t.role}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

    </div>
  );
};

export default Home;
