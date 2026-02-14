import React, { useEffect, useRef } from 'react';
import Section from '../components/Section';

const About: React.FC = () => {
   const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current.play().catch(() => { });
      }
   }, []);

   return (
      <div className="w-full bg-obsidian pt-16">
         {/* Hero */}
         <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
            <video
               ref={videoRef}
               autoPlay
               loop
               muted
               playsInline
               preload="auto"
               className="absolute inset-0 w-full h-full object-cover"
            >
               <source src="/ORIGIN STORY.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 md:p-20 z-10">
               <h1 className="text-4xl md:text-7xl font-serif text-cream mb-4">Our Craft</h1>
               <p className="text-lg md:text-xl text-cream-dim max-w-lg">Born in Hyderabad. Rooted in the Hills.</p>
            </div>
         </div>

         {/* Quote — with subtle texture */}
         <div className="relative overflow-hidden">
            <img
               src="/Floating Coffee Particles in Smoke.jpeg"
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
               loading="lazy"
            />
            <div className="absolute inset-0 bg-obsidian/95"></div>
            <Section className="container mx-auto px-6 max-w-4xl text-center relative z-10">
               <p className="text-2xl md:text-3xl font-serif text-cream leading-relaxed">
                  "We started Avera with a simple, rebellious idea: <span className="text-gold">Coffee should be treated like fresh produce, not a pantry staple.</span>"
               </p>
            </Section>
         </div>

         {/* Roasting Section */}
         <div className="relative overflow-hidden">
            <img
               src="/Coffee Beans Texture Background.jpeg"
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-[0.05]"
               loading="lazy"
            />
            <div className="absolute inset-0 bg-espresso/95"></div>
            <Section className="relative z-10 py-24">
               <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                  <div className="w-full md:w-1/2">
                     <img
                        src="/Roasting Fire Ritual.jpeg"
                        alt="Roasting Process"
                        className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        loading="lazy"
                     />
                  </div>
                  <div className="w-full md:w-1/2">
                     <h2 className="text-3xl font-serif text-cream mb-6">The Hyderabad Roast</h2>
                     <p className="text-cream-dim leading-relaxed mb-6">
                        In a city known for its history and taste, we are building a new legacy. Our roastery in Jubilee Hills is a sanctuary of precision.
                     </p>
                     <p className="text-cream-dim leading-relaxed">
                        We use state-of-the-art drum roasters hooked up to software that tracks the roast curve in real-time. But technology only guides us; taste defines us. Every batch is cupped and scored before it leaves our doors.
                     </p>
                  </div>
               </div>
            </Section>
         </div>

         {/* Origin & Craft Section */}
         <Section className="bg-obsidian py-24">
            <div className="container mx-auto px-6">
               <h2 className="text-center text-3xl font-serif text-cream mb-16">Origin & Craft</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative aspect-[4/3] overflow-hidden group">
                     <img
                        src="/Farmer Silhouette.jpeg"
                        alt="Farmer at Dawn"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                     <p className="absolute bottom-6 left-6 text-cream font-serif text-xl">The Farmer's Dawn</p>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden group">
                     <img
                        src="/Hand Holding Coffee Cherries.jpeg"
                        alt="Hand Holding Coffee Cherries"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                     <p className="absolute bottom-6 left-6 text-cream font-serif text-xl">From Cherry to Cup</p>
                  </div>
               </div>
            </div>
         </Section>

         {/* Timeline — with texture */}
         <div className="relative overflow-hidden">
            <img
               src="/Roasting Fire Ritual.jpeg"
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
               loading="lazy"
            />
            <div className="absolute inset-0 bg-obsidian/95"></div>
            <Section className="container mx-auto px-6 py-24 relative z-10">
               <h2 className="text-center text-3xl font-serif text-cream mb-16">The Journey</h2>
               <div className="relative border-l border-white/10 ml-4 md:ml-1/2 space-y-16">
                  <div className="relative pl-8 md:ml-12">
                     <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold"></span>
                     <span className="text-gold font-bold block mb-2">2020</span>
                     <h3 className="text-xl text-cream font-serif mb-2">The Inception</h3>
                     <p className="text-cream-dim max-w-md">Founded by two friends obsessed with the perfect pour-over.</p>
                  </div>
                  <div className="relative pl-8 md:ml-12">
                     <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold"></span>
                     <span className="text-gold font-bold block mb-2">2021</span>
                     <h3 className="text-xl text-cream font-serif mb-2">Direct Trade</h3>
                     <p className="text-cream-dim max-w-md">Partnered with 5 estates in Coorg and Chikmagalur for exclusive lots.</p>
                  </div>
                  <div className="relative pl-8 md:ml-12">
                     <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold"></span>
                     <span className="text-gold font-bold block mb-2">2023</span>
                     <h3 className="text-xl text-cream font-serif mb-2">The Roastery</h3>
                     <p className="text-cream-dim max-w-md">Opened our flagship roastery and experience center in Hyderabad.</p>
                  </div>
               </div>
            </Section>
         </div>
      </div>
   );
};

export default About;