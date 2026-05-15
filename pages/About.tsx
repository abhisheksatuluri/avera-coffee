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
               <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 md:px-6 pt-24">
               <div className="max-w-4xl mt-[20vh]">
                  <h1 className="text-4xl md:text-7xl font-serif text-white mb-4 drop-shadow-2xl">Our Craft</h1>
                  <p className="text-lg md:text-xl text-cream max-w-lg drop-shadow-lg">
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
         <section className="py-24 bg-espresso/50">
            <div className="container mx-auto px-6 max-w-5xl">
               <div className="text-center mb-20">
                  <span className="text-amber text-xs font-bold uppercase tracking-widest block mb-4">From Seed to Cup</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-cream">The Journey</h2>
               </div>

               {/* Timeline */}
               <div className="relative">
                  {/* Center line — desktop only */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent"></div>

                  {/* Mobile line */}
                  <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gold/20"></div>

                  {[
                     {
                        date: 'December 2025',
                        title: 'The Spark',
                        desc: 'Aditya, frustrated by India\'s instant coffee culture, decides to build a brand that treats coffee like fresh produce — not a pantry staple. Avera Specialty Coffee Roasters is born in Hyderabad.',
                        icon: '🔥',
                     },
                     {
                        date: 'January 2026',
                        title: 'First Roast',
                        desc: 'The first batch rolls off our drum roaster — 5 kg of single-origin Arabica from Chikmagalur. Hand-cupped, scored, and perfected. The roast-on-order model is validated.',
                        icon: '☕',
                     },
                     {
                        date: 'March 2026',
                        title: 'Direct Trade Partnerships',
                        desc: 'Partnerships signed with 5 estate farms across Coorg, Araku Valley, and Chikmagalur. Direct sourcing means higher quality, fairer prices for farmers, and full traceability.',
                        icon: '🤝',
                     },
                     {
                        date: 'May 2026',
                        title: 'The Lineup',
                        desc: '6 signature coffees launched — from the clean precision of Arabica Washed to the experimental Fermented Whiskey Barrel. Each tells a story of origin and process.',
                        icon: '✨',
                     },
                     {
                        date: 'Q3 2026',
                        title: 'Hyderabad\'s Own',
                        desc: 'First B2B partnerships with Hyderabad\'s finest cafes and restaurants. Pop-up tastings across the city. The WhatsApp-first ordering model takes off.',
                        icon: '🏙️',
                     },
                     {
                        date: '2027',
                        title: 'Beyond Hyderabad',
                        desc: 'Expanding to Bangalore, Mumbai, and Delhi. Building the Avera Club community. Our goal: 1,000 kg roasted monthly, proving that a bootstrapped Indian coffee brand can compete with the best.',
                        icon: '🚀',
                     },
                  ].map((item, i) => (
                     <div key={i} className={`relative flex flex-col md:flex-row items-start mb-16 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {/* Content */}
                        <div className={`w-full md:w-[calc(50%-40px)] pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                           <span className="text-gold text-sm font-bold block mb-2">{item.date}</span>
                           <h3 className="text-xl md:text-2xl text-cream font-serif mb-3">{item.title}</h3>
                           <p className="text-cream-dim text-sm leading-relaxed">{item.desc}</p>
                        </div>

                        {/* Center dot — desktop */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-espresso border-2 border-gold/50 items-center justify-center text-lg z-10">
                           {item.icon}
                        </div>

                        {/* Left dot — mobile */}
                        <div className="md:hidden absolute left-0 w-8 h-8 rounded-full bg-espresso border-2 border-gold/50 flex items-center justify-center text-sm z-10">
                           {item.icon}
                        </div>

                        {/* Empty space for alternating layout */}
                        <div className="hidden md:block w-[calc(50%-40px)]"></div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

      </div>
   );
};

export default About;
