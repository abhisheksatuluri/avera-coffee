import React, { useState } from 'react';
import { submitLead } from '../utils/leadCapture';
import { getWhatsAppLink } from '../utils/whatsapp';

const Contact: React.FC = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [message, setMessage] = useState('');
   const [submitted, setSubmitted] = useState(false);
   const [submitting, setSubmitting] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !email || !phone) return;
      setSubmitting(true);
      await submitLead({ name, email, phone, source: 'contact' });
      setSubmitted(true);
      setSubmitting(false);
   };

   return (
      <div className="bg-obsidian min-h-screen pt-20 relative">
         {/* Subtle global texture */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <img
               src="/Floating Coffee Particles in Smoke.webp"
               alt=""
               className="w-full h-full object-cover opacity-[0.02]"
               loading="lazy"
            />
         </div>

         {/* Hero with texture background */}
         <div className="relative overflow-hidden mb-12 md:mb-16 z-10">
            <img
               src="/Coffee Beans Texture Background.webp"
               alt="Coffee Beans Texture"
               className="absolute inset-0 w-full h-full object-cover opacity-20"
               loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/40 to-obsidian"></div>
            <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
               <h1 className="text-3xl md:text-5xl font-serif text-cream mb-4">Get in Touch</h1>
               <p className="text-cream-dim max-w-lg mx-auto text-sm md:text-base">
                  Whether you have a question about our roasts, want a personalized recommendation, or just want to talk coffee — we're here.
               </p>
            </div>
         </div>

         <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16 pb-24 relative z-10">
            <div className="w-full md:w-1/2">
               <div className="space-y-8">
                  <div>
                     <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-2">Email Us</h3>
                     <p className="text-cream text-sm">info@averacoffee.com</p>
                  </div>
                  <div>
                     <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-2">Wholesale Inquiries</h3>
                     <p className="text-cream text-sm">partner@averacoffee.com</p>
                  </div>
                  <div>
                     <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-2">Order on WhatsApp</h3>
                     <a
                        href={getWhatsAppLink("Hi! I'd like to know more about Avera Coffee.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cream hover:text-gold transition-colors text-sm"
                     >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Message us on WhatsApp
                     </a>
                  </div>
               </div>

               {/* Ambient image */}
               <div className="mt-12 aspect-[16/9] overflow-hidden">
                  <img
                     src="/ORIGIN & CRAFT.webp"
                     alt="Origin and Craft"
                     className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                     loading="lazy"
                  />
               </div>
            </div>

            <div className="w-full md:w-1/2">
               {submitted ? (
                  <div className="bg-white/[0.02] border border-gold/30 p-8 text-center backdrop-blur-sm">
                     <div className="text-gold text-4xl mb-4">✓</div>
                     <h3 className="text-xl font-serif text-cream mb-2">Message Received</h3>
                     <p className="text-cream-dim text-sm mb-6">We'll get back to you shortly. In the meantime, feel free to reach us on WhatsApp for a faster response.</p>
                     <a
                        href={getWhatsAppLink("Hi! I just reached out via the contact form. Looking forward to hearing from you!")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gold text-obsidian font-bold py-3 px-6 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors"
                     >
                        Chat on WhatsApp
                     </a>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/5 p-8 space-y-6 backdrop-blur-sm">
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Name</label>
                        <input
                           type="text"
                           value={name}
                           onChange={e => setName(e.target.value)}
                           required
                           className="w-full bg-obsidian border border-white/10 p-3 text-cream focus:border-gold outline-none transition-colors"
                        />
                     </div>
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Email</label>
                        <input
                           type="email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           required
                           className="w-full bg-obsidian border border-white/10 p-3 text-cream focus:border-gold outline-none transition-colors"
                        />
                     </div>
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Phone</label>
                        <input
                           type="tel"
                           value={phone}
                           onChange={e => setPhone(e.target.value)}
                           required
                           className="w-full bg-obsidian border border-white/10 p-3 text-cream focus:border-gold outline-none transition-colors"
                        />
                     </div>
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Message</label>
                        <textarea
                           rows={5}
                           value={message}
                           onChange={e => setMessage(e.target.value)}
                           className="w-full bg-obsidian border border-white/10 p-3 text-cream focus:border-gold outline-none transition-colors"
                        ></textarea>
                     </div>
                     <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-gold text-obsidian font-bold py-3 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors disabled:opacity-50"
                     >
                        {submitting ? 'Sending...' : 'Send Message'}
                     </button>
                  </form>
               )}
            </div>
         </div>
      </div>
   );
};

export default Contact;
