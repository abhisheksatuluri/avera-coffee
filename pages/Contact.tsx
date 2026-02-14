import React from 'react';
import Section from '../components/Section';
import Button from '../components/Button';

const Contact: React.FC = () => {
   return (
      <div className="bg-obsidian min-h-screen pt-24 relative">
         {/* Subtle global texture */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <img
               src="/Floating Coffee Particles in Smoke.jpeg"
               alt=""
               className="w-full h-full object-cover opacity-[0.02]"
               loading="lazy"
            />
         </div>

         {/* Hero with texture background */}
         <div className="relative overflow-hidden mb-16 z-10">
            <img
               src="/Coffee Beans Texture Background.jpeg"
               alt="Coffee Beans Texture"
               className="absolute inset-0 w-full h-full object-cover opacity-20"
               loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/40 to-obsidian"></div>
            <div className="relative z-10 container mx-auto px-6 py-20 text-center">
               <h1 className="text-4xl md:text-5xl font-serif text-cream mb-4">Get in Touch</h1>
               <p className="text-cream-dim max-w-lg mx-auto">
                  Whether you have a question about brewing, need help with your subscription, or just want to talk coffee, we're here.
               </p>
            </div>
         </div>

         <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16 pb-24 relative z-10">
            <div className="w-full md:w-1/2">
               <div className="space-y-8">
                  <div>
                     <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-2">Visit The Roastery</h3>
                     <p className="text-cream text-sm">Plot 45, Jubilee Hills Road No. 10<br />Hyderabad, Telangana 500033</p>
                  </div>
                  <div>
                     <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-2">Email Us</h3>
                     <p className="text-cream text-sm">hello@averacoffee.com</p>
                  </div>
                  <div>
                     <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-2">Wholesale Inquiries</h3>
                     <p className="text-cream text-sm">partner@averacoffee.com</p>
                  </div>
               </div>

               {/* Ambient image */}
               <div className="mt-12 aspect-[16/9] overflow-hidden">
                  <img
                     src="/ORIGIN & CRAFT.jpeg"
                     alt="Origin and Craft"
                     className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                     loading="lazy"
                  />
               </div>
            </div>

            <div className="w-full md:w-1/2">
               <form className="bg-white/[0.02] border border-white/5 p-8 space-y-6 backdrop-blur-sm">
                  <div>
                     <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Name</label>
                     <input type="text" className="w-full bg-obsidian border border-white/10 p-3 text-cream focus:border-gold outline-none transition-colors" />
                  </div>
                  <div>
                     <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Email</label>
                     <input type="email" className="w-full bg-obsidian border border-white/10 p-3 text-cream focus:border-gold outline-none transition-colors" />
                  </div>
                  <div>
                     <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Message</label>
                     <textarea rows={5} className="w-full bg-obsidian border border-white/10 p-3 text-cream focus:border-gold outline-none transition-colors"></textarea>
                  </div>
                  <Button type="submit" variant="primary" className="w-full">Send Message</Button>
               </form>
            </div>
         </div>

         {/* Slow Pour Ritual image as ambient footer */}
         <Section className="py-0 h-[400px] w-full relative overflow-hidden z-10">
            <img
               src="/Slow Pour Ritual.jpeg"
               alt="Slow Pour Ritual"
               className="absolute inset-0 w-full h-full object-cover opacity-30"
               loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/80"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
               <p className="text-cream-dim font-serif text-xl tracking-widest uppercase">Hyderabad Roastery</p>
            </div>
         </Section>
      </div>
   );
};

export default Contact;