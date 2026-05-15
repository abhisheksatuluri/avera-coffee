import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

const Footer: React.FC = () => {
  return (
    <footer className="bg-espresso border-t border-white/5 text-cream pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold tracking-widest text-gold mb-6">AVERA</h3>
            <p className="text-cream-dim text-sm leading-relaxed mb-4">
              Accessible luxury. Precision roasted in Hyderabad. <br />
              Crafted for those who refuse average.
            </p>
            <p className="text-cream-dim/60 text-xs tracking-wide">
              A venture of <span className="text-cream-dim">Aditya Food and Beverages Pvt. Ltd.</span>
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-sm uppercase tracking-widest text-gold mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-cream-dim hover:text-cream transition-colors text-sm">Shop Coffee</Link></li>
              <li><Link to="/subscription" className="text-cream-dim hover:text-cream transition-colors text-sm">The Club</Link></li>
              <li><Link to="/about" className="text-cream-dim hover:text-cream transition-colors text-sm">Our Story</Link></li>
              <li><Link to="/contact" className="text-cream-dim hover:text-cream transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div className="col-span-1">
            <h4 className="text-sm uppercase tracking-widest text-gold mb-6">Info</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-cream-dim hover:text-cream transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-cream-dim hover:text-cream transition-colors text-sm">Returns</a></li>
              <li><a href="#" className="text-cream-dim hover:text-cream transition-colors text-sm">Terms & Conditions</a></li>
              <li><a href="#" className="text-cream-dim hover:text-cream transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="text-sm uppercase tracking-widest text-gold mb-6">The Ritual</h4>
            <p className="text-cream-dim text-xs mb-4">Join our list for early access to limited roasts.</p>
            <div className="flex border-b border-cream-dim pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none outline-none text-cream w-full placeholder-cream-dim/50 text-sm"
              />
              <button className="text-gold uppercase text-xs tracking-widest hover:text-cream transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-xs text-cream-dim mb-4 md:mb-0">© {new Date().getFullYear()} Avera Specialty Coffee. Aditya Food and Beverages Pvt. Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-cream-dim hover:text-gold transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-cream-dim hover:text-gold transition-colors"><Facebook size={18} /></a>
            <a href="#" className="text-cream-dim hover:text-gold transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-cream-dim hover:text-gold transition-colors"><Mail size={18} /></a>
            <a href={getWhatsAppLink("Hi! I'd like to know more about Avera Coffee.")} target="_blank" rel="noopener noreferrer" className="text-cream-dim hover:text-gold transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;