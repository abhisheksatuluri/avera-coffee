import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Reusable parallax section — mirrors Home.tsx pattern
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
   priority = false,
}) => {
   const ref = useRef<HTMLDivElement>(null);
   const videoRef = useRef<HTMLVideoElement>(null);
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
   });

   const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

   useEffect(() => {
      if (bgType === 'video' && videoRef.current) {
         const video = videoRef.current;
         video.play().catch(() => {
            const retryPlay = () => {
               video.play().catch(() => { });
               document.removeEventListener('click', retryPlay);
               document.removeEventListener('scroll', retryPlay);
            };
            document.addEventListener('click', retryPlay, { once: true });
            document.addEventListener('scroll', retryPlay, { once: true });
         });
      }
   }, [bgType]);

   return (
      <section
         ref={ref}
         className="relative w-full min-h-screen md:h-screen md:snap-start flex flex-col justify-center overflow-hidden"
      >
         {/* Background Media Layer */}
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

const About: React.FC = () => {
   return (
      <div className="w-full bg-obsidian md:h-screen md:overflow-y-scroll md:snap-y md:snap-mandatory scroll-smooth">

         {/* SECTION 1: HERO */}
         <ParallaxSection
            bgSource="/ORIGIN STORY.mp4"
            bgType="video"
            priority={true}
            overlayOpacity="bg-black/30"
         >
            <div className="container mx-auto px-4 md:px-6 pt-24">
               <div className="max-w-4xl mt-[30vh] md:mt-[35vh]">
                  <motion.h1
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1, delay: 0.2 }}
                     className="text-4xl md:text-7xl font-serif text-cream mb-4 drop-shadow-2xl"
                  >
                     Our Craft
                  </motion.h1>
                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1, delay: 0.4 }}
                     className="text-lg md:text-xl text-cream-dim max-w-lg drop-shadow-lg"
                  >
                     Born in Hyderabad. Rooted in the Hills.
                  </motion.p>
               </div>
            </div>
         </ParallaxSection>

         {/* SECTION 2: PHILOSOPHY QUOTE */}
         <ParallaxSection
            bgSource="/Floating Coffee Particles in Smoke.jpeg"
            bgType="image"
            overlayOpacity="bg-obsidian/90"
         >
            <div className="container mx-auto px-6 max-w-4xl text-center">
               <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="text-2xl md:text-4xl font-serif text-cream leading-relaxed"
               >
                  "We started Avera with a simple, rebellious idea: <span className="text-gold">Coffee should be treated like fresh produce, not a pantry staple.</span>"
               </motion.p>
            </div>
         </ParallaxSection>

         {/* SECTION 3: THE HYDERABAD ROAST */}
         <ParallaxSection
            bgSource="/Coffee Beans Texture Background.jpeg"
            bgType="image"
            overlayOpacity="bg-espresso/85"
         >
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
               <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full md:w-1/2"
               >
                  <img
                     src="/Roasting Fire Ritual.jpeg"
                     alt="Roasting Process"
                     className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                     loading="lazy"
                  />
               </motion.div>
               <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/2"
               >
                  <h2 className="text-3xl md:text-5xl font-serif text-cream mb-6">The Hyderabad Roast</h2>
                  <p className="text-cream-dim leading-relaxed mb-6 text-base md:text-lg">
                     In a city known for its history and taste, we are building a new legacy. Our roastery is a sanctuary of precision.
                  </p>
                  <p className="text-cream-dim leading-relaxed text-base md:text-lg">
                     We use state-of-the-art drum roasters hooked up to software that tracks the roast curve in real-time. But technology only guides us; taste defines us. Every batch is cupped and scored before it leaves our doors.
                  </p>
               </motion.div>
            </div>
         </ParallaxSection>

         {/* SECTION 4: ORIGIN & CRAFT */}
         <section className="relative min-h-screen md:h-screen md:snap-start flex items-center py-24 md:py-0 overflow-hidden bg-obsidian">
            <div className="container mx-auto px-6">
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center text-3xl md:text-5xl font-serif text-cream mb-12 md:mb-16"
               >
                  Origin & Craft
               </motion.h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                     className="relative aspect-[4/3] overflow-hidden group"
                  >
                     <img
                        src="/Farmer Silhouette.jpeg"
                        alt="Farmer at Dawn"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                     <p className="absolute bottom-6 left-6 text-cream font-serif text-xl drop-shadow-lg">The Farmer's Dawn</p>
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.15 }}
                     className="relative aspect-[4/3] overflow-hidden group"
                  >
                     <img
                        src="/Hand Holding Coffee Cherries.jpeg"
                        alt="Hand Holding Coffee Cherries"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                     <p className="absolute bottom-6 left-6 text-cream font-serif text-xl drop-shadow-lg">From Cherry to Cup</p>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* SECTION 5: THE JOURNEY TIMELINE */}
         <ParallaxSection
            bgSource="/Roasting Fire Ritual.jpeg"
            bgType="image"
            overlayOpacity="bg-obsidian/92"
         >
            <div className="container mx-auto px-6 max-w-3xl">
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center text-3xl md:text-5xl font-serif text-cream mb-16"
               >
                  The Journey
               </motion.h2>
               <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-16">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6, delay: 0.2 }}
                     className="relative pl-8"
                  >
                     <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold"></span>
                     <span className="text-gold font-bold block mb-2 text-lg">December 2025</span>
                     <h3 className="text-xl md:text-2xl text-cream font-serif mb-2">The Inception</h3>
                     <p className="text-cream-dim max-w-md text-base leading-relaxed">Founded by a coffee enthusiast who was tired of instant and commodity coffee in India, driven by a passion for specialty coffee.</p>
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6, delay: 0.4 }}
                     className="relative pl-8"
                  >
                     <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold"></span>
                     <span className="text-gold font-bold block mb-2 text-lg">2026</span>
                     <h3 className="text-xl md:text-2xl text-cream font-serif mb-2">Direct Trade</h3>
                     <p className="text-cream-dim max-w-md text-base leading-relaxed">Partnered with 5 estates in Coorg and Chikmagalur for exclusive lots.</p>
                  </motion.div>
               </div>
            </div>
         </ParallaxSection>

      </div>
   );
};

export default About;