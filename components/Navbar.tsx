import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

interface NavbarProps {
  hideLogoOnHome?: boolean;
}

const NAVBAR_HEIGHT = 64; // px. consistent mobile navbar reference

const Navbar: React.FC<NavbarProps> = ({ hideLogoOnHome = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <>
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
              className={`flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 ${hideLogoOnHome && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <img src="/Logo.webp" alt="Avera" className="h-10 w-10 rounded-full shadow-md object-cover" />
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
              className={`flex items-center gap-2 hover:opacity-80 transition-opacity duration-300 ${hideLogoOnHome && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <img src="/Logo.webp" alt="Avera" className="h-8 w-8 rounded-full shadow-md object-cover" />
              <span className="text-lg font-serif font-bold tracking-widest text-cream leading-none">AVERA</span>
            </Link>
          </div>

          {/* Right Nav (Desktop) + Icons */}
          <div className="flex items-center justify-end gap-8">
            <div className="hidden md:flex items-center gap-8">
              <Link to="/subscription" className="text-sm uppercase tracking-widest text-cream-dim hover:text-gold transition-colors duration-300">The Club</Link>
              <Link to="/contact" className="text-sm uppercase tracking-widest text-cream-dim hover:text-gold transition-colors duration-300">Contact</Link>
            </div>

            <div className="hidden md:block w-px h-6 bg-white/10 mx-2"></div>

            <div className="flex items-center gap-4">
              <a
                href={getWhatsAppLink("Hi! I'd like to know more about Avera Coffee.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream hover:text-gold transition-colors relative group flex items-center justify-center w-11 h-11"
                aria-label="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

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
      </nav>

      {/* Mobile Menu Overlay - rendered OUTSIDE nav to avoid height constraint */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#0B0B0D', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px' }}
        >
          <button
            style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10000 }}
            className="text-cream hover:text-gold transition-colors flex items-center justify-center w-12 h-12"
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
      )}
    </>
  );
};

export { NAVBAR_HEIGHT };
export default Navbar;