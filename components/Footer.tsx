import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

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
              <li><Link to="/subscription" className="text-cream-dim hover:text-cream transition-colors text-sm">Subscriptions</Link></li>
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
          <p className="text-xs text-cream-dim mb-4 md:mb-0">© {new Date().getFullYear()} Avera Specialty Coffee — Aditya Food and Beverages Pvt. Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-cream-dim hover:text-gold transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-cream-dim hover:text-gold transition-colors"><Facebook size={18} /></a>
            <a href="#" className="text-cream-dim hover:text-gold transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-cream-dim hover:text-gold transition-colors"><Mail size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;