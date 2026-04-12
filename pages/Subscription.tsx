import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { Check, Mail, Coffee, Users } from 'lucide-react';
import { submitLead } from '../utils/leadCapture';
import { getWhatsAppLink } from '../utils/whatsapp';

const Subscription: React.FC = () => {
   const videoRef = useRef<HTMLVideoElement>(null);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [submitted, setSubmitted] = useState(false);
   const [submitting, setSubmitting] = useState(false);

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current.play().catch(() => { });
      }
   }, []);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !email || !phone) return;
      setSubmitting(true);
      await submitLead({ name, email, phone, source: 'subscription' });
      setSubmitted(true);
      setSubmitting(false);
   };

   return (
      <div className="bg-obsidian min-h-screen pt-20">
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
               <h1 className="text-3xl md:text-6xl font-serif text-cream mb-6">Join The Avera Club</h1>
               <p className="text-cream-dim max-w-xl mx-auto text-base md:text-lg">
                  Be the first to discover new roasts, exclusive lots, and member-only offerings. Your morning ritual, elevated.
               </p>
            </div>
         </div>

         {/* Steps */}
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
                     <div className="text-gold mb-4 flex justify-center"><Coffee size={32} strokeWidth={1} /></div>
                     <div className="text-4xl text-white/20 font-serif mb-4">01</div>
                     <h3 className="text-xl text-cream font-serif mb-4">Take The Quiz</h3>
                     <p className="text-sm text-cream-dim">Discover your perfect blend with our 60-second taste quiz.</p>
                  </div>
                  <div className="text-center p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300">
                     <div className="text-gold mb-4 flex justify-center"><Users size={32} strokeWidth={1} /></div>
                     <div className="text-4xl text-white/20 font-serif mb-4">02</div>
                     <h3 className="text-xl text-cream font-serif mb-4">Join The Club</h3>
                     <p className="text-sm text-cream-dim">Get updates on new roasts, exclusive lots, and member benefits.</p>
                  </div>
                  <div className="text-center p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300">
                     <div className="text-gold mb-4 flex justify-center"><Mail size={32} strokeWidth={1} /></div>
                     <div className="text-4xl text-white/20 font-serif mb-4">03</div>
                     <h3 className="text-xl text-cream font-serif mb-4">Order via WhatsApp</h3>
                     <p className="text-sm text-cream-dim">Place orders directly on WhatsApp. Fresh roasted and shipped to you.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Image Block */}
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
                     <a href="/#taste-quiz" className="bg-gold text-obsidian font-bold py-3 px-8 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors inline-block">Find Your Blend</a>
                  </div>
               </div>
            </Section>
         </div>

         {/* Club Benefits + Lead Capture Form */}
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
                  <h2 className="text-center text-3xl font-serif text-cream mb-6">What You Get</h2>
                  <p className="text-center text-cream-dim mb-16 max-w-xl mx-auto">Join a community of coffee enthusiasts who demand the finest.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
                     {[
                        'Early access to limited and seasonal roasts',
                        'Personalized blend recommendations',
                        'Direct ordering via WhatsApp',
                        'Priority roasting slots',
                        'Exclusive Estate Reserve lots',
                        'Member-only pricing and offers',
                     ].map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 border border-white/5 bg-white/[0.02]">
                           <Check size={18} className="text-gold flex-shrink-0" />
                           <span className="text-cream text-sm">{benefit}</span>
                        </div>
                     ))}
                  </div>

                  {/* Lead Capture Form */}
                  <div className="max-w-md mx-auto">
                     {submitted ? (
                        <div className="text-center p-8 border border-gold/30 bg-gold/5">
                           <div className="text-gold text-4xl mb-4">✓</div>
                           <h3 className="text-xl font-serif text-cream mb-2">Welcome to the Club</h3>
                           <p className="text-cream-dim text-sm mb-6">We'll be in touch with exclusive updates and offers.</p>
                           <a
                              href={getWhatsAppLink("Hi! I just joined the Avera Club. I'd love to place my first order!")}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-gold text-obsidian font-bold py-3 px-6 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors"
                           >
                              Order on WhatsApp
                           </a>
                        </div>
                     ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                           <input
                              type="text"
                              placeholder="Your Name"
                              value={name}
                              onChange={e => setName(e.target.value)}
                              required
                              className="w-full bg-obsidian border border-white/10 p-4 text-cream placeholder-cream-dim/50 text-sm focus:border-gold focus:outline-none transition-colors"
                           />
                           <input
                              type="email"
                              placeholder="Email Address"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              required
                              className="w-full bg-obsidian border border-white/10 p-4 text-cream placeholder-cream-dim/50 text-sm focus:border-gold focus:outline-none transition-colors"
                           />
                           <input
                              type="tel"
                              placeholder="Phone Number"
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              required
                              className="w-full bg-obsidian border border-white/10 p-4 text-cream placeholder-cream-dim/50 text-sm focus:border-gold focus:outline-none transition-colors"
                           />
                           <button
                              type="submit"
                              disabled={submitting}
                              className="w-full bg-gold text-obsidian font-bold py-4 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors disabled:opacity-50"
                           >
                              {submitting ? 'Joining...' : 'Join The Avera Club'}
                           </button>
                        </form>
                     )}
                  </div>
               </div>
            </Section>
         </div>
      </div>
   );
};

export default Subscription;
