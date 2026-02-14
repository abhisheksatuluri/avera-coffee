import React, { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import { ArrowDown, Flame, Clock, Truck, ChevronRight, Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Helper for Parallax Sections
interface ParallaxSectionProps {
  children: React.ReactNode;
  bgSource: string;
  bgType: 'video' | 'image';
  overlayOpacity?: string;
  className?: string;
  priority?: boolean;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  bgSource,
  bgType,
  overlayOpacity = "bg-black/40",
  className = "",
  priority = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Force video autoplay — browsers may block even muted autoplay in some contexts
  useEffect(() => {
    if (bgType === 'video' && videoRef.current) {
      const video = videoRef.current;
      const playVideo = () => {
        video.play().catch(() => {
          // Retry on user interaction
          const retryPlay = () => {
            video.play().catch(() => { });
            document.removeEventListener('click', retryPlay);
            document.removeEventListener('scroll', retryPlay);
          };
          document.addEventListener('click', retryPlay, { once: true });
          document.addEventListener('scroll', retryPlay, { once: true });
        });
      };
      playVideo();
    }
  }, [bgType]);

  return (
    <section
      ref={ref}
      className={`relative w-full min-h-screen md:h-screen md:snap-start flex flex-col justify-center overflow-hidden ${className}`}
    >
      {/* Background Media Layer — z-0 so it sits behind z-10 content but IN FRONT of parent bg */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        style={{ y }}
      >
        {bgType === 'video' ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload={priority ? "auto" : "metadata"}
            className="w-full h-full object-cover"
          >
            <source src={bgSource} type="video/mp4" />
          </video>
        ) : (
          <img
            src={bgSource}
            alt="Background"
            className="w-full h-full object-cover"
            loading={priority ? "eager" : "lazy"}
          />
        )}
        <div className={`absolute inset-0 ${overlayOpacity} bg-gradient-to-b from-black/20 via-transparent to-black/80`}></div>
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);
  const containerRef = useRef<HTMLDivElement>(null);


  // Direct scroll-progress interpolation for 1:1 brand morph (always centered)
  const [brandStyle, setBrandStyle] = React.useState<React.CSSProperties>({});
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = React.useCallback(() => {
    const container = containerRef.current;
    let scrollTop = window.scrollY;
    if (container && container.scrollTop > 0) {
      scrollTop = container.scrollTop;
    } else if (container && !isMobile && window.scrollY === 0) {
      scrollTop = container.scrollTop;
    }
    // Dispatch for Navbar blur
    window.dispatchEvent(new CustomEvent('avera-scroll', { detail: scrollTop }));

    if (isMobile) {
      const startTop = 35; // % from top
      const endTop = 3.5;  // % from top (navbar center)
      const startScale = 1.1;
      const endScale = 0.6;
      const travelPx = 200;
      const p = Math.min(Math.max(scrollTop / travelPx, 0), 1);
      // Ease-out for smoothness
      const ease = 1 - Math.pow(1 - p, 3);
      setBrandStyle({
        position: 'fixed',
        left: '50%',
        top: `${startTop - ease * (startTop - endTop)}%`,
        transform: `translate(-50%, -50%) scale(${startScale - ease * (startScale - endScale)})`,
        zIndex: 51,
        width: 'max-content',
        pointerEvents: 'none',
      });
    } else {
      const startTopPx = window.innerHeight * 0.30;
      const endTopPx = 32; // navbar vertical center
      const startScale = 1.4;
      const endScale = 0.65;
      const travelPx = startTopPx - endTopPx; // total scroll distance to dock
      const p = Math.min(Math.max(scrollTop / travelPx, 0), 1);
      // Ease-out cubic for refined feel
      const ease = 1 - Math.pow(1 - p, 3);
      const currentTop = startTopPx - scrollTop; // 1:1 sticky for vertical
      setBrandStyle({
        position: 'fixed',
        left: '50%',
        top: `${Math.max(currentTop, endTopPx)}px`,
        transform: `translate(-50%, -50%) scale(${startScale - ease * (startScale - endScale)})`,
        zIndex: 51,
        width: 'max-content',
        pointerEvents: 'none',
      });
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="w-full md:h-screen md:overflow-y-scroll md:snap-y md:snap-mandatory scroll-smooth"
    >
      {/* Animated Brand Element — ALWAYS centered horizontally, moves 1:1 with scroll */}
      <div
        style={{
          ...brandStyle,
          transition: 'transform 0.05s linear',
          willChange: 'transform, top',
        }}
        className="flex items-center gap-4"
      >
        <img
          src="/Logo.jpeg"
          alt="Avera Logo"
          className="h-12 w-12 md:h-16 md:w-16 rounded-full shadow-2xl object-cover"
        />
        <div className="flex flex-col text-left drop-shadow-lg">
          <span className="text-2xl md:text-4xl font-serif font-bold tracking-widest text-cream leading-none mb-1">AVERA</span>
          <span className="text-[0.55rem] md:text-xs uppercase tracking-[0.2em] text-gold font-medium">Specialty Coffee</span>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <ParallaxSection
        bgSource="/Hero Roasting Sequence.mp4"
        bgType="video"
        priority={true}
        overlayOpacity="bg-black/30"
      >
        <div className="container mx-auto px-6 flex flex-col items-center text-center pt-32 md:pt-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif font-bold text-cream mb-8 leading-tight max-w-5xl drop-shadow-2xl mt-40 md:mt-[28vh]"
          >
            Precision Roasted. <br />
            <span className="text-gold italic">Crafted For Those Who Refuse Average.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-cream-dim text-lg md:text-2xl max-w-2xl mb-12 font-light tracking-wide drop-shadow-lg"
          >
            100% Arabica specialty coffee, roasted fresh on order in Hyderabad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
          >
            <Button to="/shop" variant="primary" className="hover:scale-105 transition-transform duration-300">Shop The Collection</Button>
            <Button to="/about" variant="outline" className="hover:scale-105 transition-transform duration-300">Discover The Ritual</Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-cream-dim flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ArrowDown className="animate-bounce" size={20} />
          </motion.div>
        </div>
      </ParallaxSection>

      {/* SECTION 2: THE RITUAL */}
      <ParallaxSection
        bgSource="/Slow Pour Ritual.mp4"
        bgType="video"
        overlayOpacity="bg-obsidian/60"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <span className="text-gold text-sm font-bold uppercase tracking-widest mb-4 block">The Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif text-cream mb-8 leading-tight">
              The Art of the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-600">Morning Ritual</span>
            </h2>
            <p className="text-cream-dim text-xl leading-relaxed mb-10 max-w-2xl">
              We believe coffee is not fuel. It is a moment of pause. A sensory experience that demands respect.
              At Avera, we source the finest beans from Indian high-altitude estates and roast them only after you place your order.
            </p>
            <div className="flex items-center space-x-2 text-gold hover:text-white transition-colors cursor-pointer group w-fit">
              <span className="uppercase tracking-widest text-sm font-bold">Explore Our Craft</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* SECTION 3: FEATURED PRODUCTS */}
      <section className="relative min-h-screen md:h-screen md:snap-start flex items-center py-24 md:py-0 overflow-hidden">
        {/* Subtle texture background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Coffee Beans Texture Background.jpeg"
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

      {/* SECTION 4: FRESHNESS */}
      <ParallaxSection
        bgSource="/Roasting Fire Ritual.jpeg"
        bgType="image"
        overlayOpacity="bg-obsidian/70"
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
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
      </ParallaxSection>

      {/* SECTION 5: LIFESTYLE */}
      <ParallaxSection
        bgSource="/URBAN ACHIEVER LIFESTYLE.jpeg"
        bgType="image"
        overlayOpacity="bg-black/20"
      >
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-serif text-white mb-10 drop-shadow-2xl"
          >
            "Your Morning Is Not A Routine.<br /> It Is A Ritual."
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button to="/subscription" variant="primary" className="text-lg px-10 py-4 shadow-xl hover:shadow-gold/20">Upgrade Your Mornings</Button>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* SECTION 6: SUBSCRIPTION BLOCK */}
      <div className="md:snap-start min-h-screen flex flex-col justify-center bg-cream text-espresso py-24">
        <Section className="py-0">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="relative aspect-square">
                <img
                  src="/AVERA Starter Bundle.jpeg"
                  alt="Subscription Box"
                  className="w-full h-full object-cover shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -right-6 bg-obsidian text-gold p-8 shadow-xl">
                  <p className="text-3xl font-serif font-bold">15%</p>
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
              <Button to="/subscription" variant="secondary" className="bg-obsidian text-cream hover:bg-espresso hover:text-gold border-none hover:scale-105 transition-transform">Start Subscription</Button>
            </div>
          </div>
        </Section>
      </div>

      {/* SECTION 7: TESTIMONIALS */}
      <div className="md:snap-start min-h-[50vh] flex items-center border-t border-white/5 py-24 relative overflow-hidden">
        {/* Subtle texture background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Floating Coffee Particles in Smoke.jpeg"
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