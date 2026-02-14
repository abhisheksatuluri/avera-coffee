import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  hideLogoOnHome?: boolean;
}

const NAVBAR_HEIGHT = 64; // px — consistent mobile navbar reference

const Navbar: React.FC<NavbarProps> = ({ hideLogoOnHome = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleCustomScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsScrolled(customEvent.detail > 50);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('avera-scroll', handleCustomScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('avera-scroll', handleCustomScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-obsidian/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="container mx-auto px-4 md:px-6 flex md:grid md:grid-cols-3 items-center justify-between h-full">

        {/* Left Nav (Desktop only) */}
        <div className="hidden md:flex items-center justify-start gap-8">
          <Link to="/shop" className="text-sm uppercase tracking-widest text-cream-dim hover:text-gold transition-colors duration-300">Shop</Link>
          <Link to="/about" className="text-sm uppercase tracking-widest text-cream-dim hover:text-gold transition-colors duration-300">Our Craft</Link>
        </div>

        {/* Center Logo/Brand (Desktop only) */}
        <div className="hidden md:flex justify-center">
          <Link
            to="/"
            className={`flex items-center gap-3 hover:opacity-80 transition-opacity ${hideLogoOnHome ? 'opacity-0 pointer-events-none duration-700' : 'opacity-100 duration-300'}`}
            aria-hidden={hideLogoOnHome}
          >
            <img src="/Logo.jpeg" alt="Avera" className="h-10 w-10 rounded-full shadow-md object-cover" />
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-widest text-cream leading-none">AVERA</span>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold font-medium">Specialty Coffee</span>
            </div>
          </Link>
        </div>

        {/* Mobile: Logo on left */}
        <div className="md:hidden flex items-center">
          <Link
            to="/"
            className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${hideLogoOnHome ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <img src="/Logo.jpeg" alt="Avera" className="h-8 w-8 rounded-full shadow-md object-cover" />
            <span className="text-lg font-serif font-bold tracking-widest text-cream leading-none">AVERA</span>
          </Link>
        </div>

        {/* Right Nav (Desktop) + Icons */}
        <div className="flex items-center justify-end gap-8">
          <div className="hidden md:flex items-center gap-8">
            <Link to="/subscription" className="text-sm uppercase tracking-widest text-cream-dim hover:text-gold transition-colors duration-300">Subscription</Link>
            <Link to="/contact" className="text-sm uppercase tracking-widest text-cream-dim hover:text-gold transition-colors duration-300">Contact</Link>
          </div>

          {/* Divider (Desktop only) */}
          <div className="hidden md:block w-px h-6 bg-white/10 mx-2"></div>

          <div className="flex items-center gap-4">
            <Link to="/shop" className="text-cream hover:text-gold transition-colors relative group flex items-center justify-center w-11 h-11">
              <ShoppingBag strokeWidth={1.5} size={20} className="group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber rounded-full"></span>
            </Link>

            {/* Mobile Menu Toggle — 44px minimum touch target */}
            <button
              className="md:hidden text-cream hover:text-gold transition-colors flex items-center justify-center w-11 h-11"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X strokeWidth={1.5} size={24} /> : <Menu strokeWidth={1.5} size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay — above everything, fully opaque */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center space-y-10 transition-transform duration-500 ease-in-out md:hidden bg-[#0B0B0D] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close button at top-right of overlay */}
        <button
          className="absolute top-4 right-4 text-cream hover:text-gold transition-colors flex items-center justify-center w-11 h-11"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X strokeWidth={1.5} size={28} />
        </button>

        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-2xl font-serif text-cream hover:text-gold transition-colors tracking-wide"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export { NAVBAR_HEIGHT };
export default Navbar;