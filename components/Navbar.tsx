import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  hideLogoOnHome?: boolean;
}

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-obsidian/95 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex md:grid md:grid-cols-3 items-center justify-between">

        {/* Left Nav (Desktop only) */}
        <div className="hidden md:flex items-center justify-start gap-8">
          <Link to="/shop" className="text-sm uppercase tracking-widest text-cream-dim hover:text-gold transition-colors duration-300">Shop</Link>
          <Link to="/about" className="text-sm uppercase tracking-widest text-cream-dim hover:text-gold transition-colors duration-300">Our Craft</Link>
        </div>

        {/* Center Logo/Brand (Desktop only — mobile uses hero brand morph) */}
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
        <div className="md:hidden">
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

          <div className="flex items-center gap-6">
            <Link to="/shop" className="text-cream hover:text-gold transition-colors relative group">
              <ShoppingBag strokeWidth={1.5} size={20} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber rounded-full"></span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-cream hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X strokeWidth={1.5} size={24} /> : <Menu strokeWidth={1.5} size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-obsidian z-[60] flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: '#0B0B0D' }}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-2xl font-serif text-cream hover:text-gold transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;