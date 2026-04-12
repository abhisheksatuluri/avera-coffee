import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
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
      <div className="w-full bg-obsidian">

         {/* HERO */}
         <section className="relative w-full min-h-[70vh] flex flex-col justify-center overflow-hidden">
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
                  <source src="/ORIGIN STORY.mp4" type="video/mp4" />
               </video>
               <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 md:px-6 pt-24">
               <div className="max-w-4xl mt-[20vh]">
                  <h1 className="text-4xl md:text-7xl font-serif text-cream mb-4 drop-shadow-2xl">Our Craft</h1>
                  <p className="text-lg md:text-xl text-cream-dim max-w-lg drop-shadow-lg">
                     Born in Hyderabad. Rooted in the Hills.
                  </p>
               </div>
            </div>
         </section>

         {/* PHILOSOPHY QUOTE */}
         <section className="py-24 bg-obsidian">
            <div className="container mx-auto px-6 max-w-4xl text-center">
               <p className="text-2xl md:text-4xl font-serif text-cream leading-relaxed">
                  "We started Avera with a simple, rebellious idea: <span className="text-gold">Coffee should be treated like fresh produce, not a pantry staple.</span>"
               </p>
            </div>
         </section>

         {/* THE HYDERABAD ROAST */}
         <section className="py-24 bg-espresso/50">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
               <div className="w-full md:w-1/2">
                  <img
                     src="/Roasting Fire Ritual.webp"
                     alt="Roasting Process"
                     className="w-full aspect-[4/3] object-cover"
                     loading="lazy"
                  />
               </div>
               <div className="w-full md:w-1/2">
                  <h2 className="text-3xl md:text-5xl font-serif text-cream mb-6">The Hyderabad Roast</h2>
                  <p className="text-cream-dim leading-relaxed mb-6 text-base md:text-lg">
                     In a city known for its history and taste, we are building a new legacy. Our roastery is a sanctuary of precision.
                  </p>
                  <p className="text-cream-dim leading-relaxed text-base md:text-lg">
                     We use state-of-the-art drum roasters hooked up to software that tracks the roast curve in real-time. But technology only guides us; taste defines us. Every batch is cupped and scored before it leaves our doors.
                  </p>
               </div>
            </div>
         </section>

         {/* ORIGIN & CRAFT */}
         <section className="py-24 bg-obsidian">
            <div className="container mx-auto px-6">
               <h2 className="text-center text-3xl md:text-5xl font-serif text-cream mb-12 md:mb-16">Origin & Craft</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative aspect-[4/3] overflow-hidden group">
                     <img
                        src="/Farmer Silhouette.webp"
                        alt="Farmer at Dawn"
                        className="w-full h-full object-cover"
                        loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                     <p className="absolute bottom-6 left-6 text-cream font-serif text-xl drop-shadow-lg">The Farmer's Dawn</p>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden group">
                     <img
                        src="/Hand Holding Coffee Cherries.webp"
                        alt="Hand Holding Coffee Cherries"
                        className="w-full h-full object-cover"
                        loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                     <p className="absolute bottom-6 left-6 text-cream font-serif text-xl drop-shadow-lg">From Cherry to Cup</p>
                  </div>
               </div>
            </div>
         </section>

         {/* THE JOURNEY TIMELINE */}
         <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img src="/Roasting Fire Ritual.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
               <div className="absolute inset-0 bg-obsidian/92"></div>
            </div>
            <div className="container mx-auto px-6 max-w-3xl relative z-10">
               <h2 className="text-center text-3xl md:text-5xl font-serif text-cream mb-16">The Journey</h2>
               <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-16">
                  <div className="relative pl-8">
                     <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold"></span>
                     <span className="text-gold font-bold block mb-2 text-lg">December 2025</span>
                     <h3 className="text-xl md:text-2xl text-cream font-serif mb-2">The Inception</h3>
                     <p className="text-cream-dim max-w-md text-base leading-relaxed">Founded by a coffee enthusiast who was tired of instant and commodity coffee in India, driven by a passion for specialty coffee.</p>
                  </div>
                  <div className="relative pl-8">
                     <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold"></span>
                     <span className="text-gold font-bold block mb-2 text-lg">2026</span>
                     <h3 className="text-xl md:text-2xl text-cream font-serif mb-2">Direct Trade</h3>
                     <p className="text-cream-dim max-w-md text-base leading-relaxed">Partnered with 5 estates in Coorg and Chikmagalur for exclusive lots.</p>
                  </div>
               </div>
            </div>
         </section>

      </div>
   );
};

export default About;
