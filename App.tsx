import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Subscription from './pages/Subscription';
import Contact from './pages/Contact';
import BrewGuide from './pages/BrewGuide';
import ChatBot from './components/ChatBot';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  // We need current location to determine if we are on home
  // Since App is inside Router, we can't use useLocation here directly unless we move Navbar inside a wrapper
  // Or we can just inspect window.location.hash or move the logic to a layout component.
  // Actually, easiest is to create a Layout component or just move Navbar inside Router properly (it is already inside).
  // Wait, in the existing code App returns HashRouter > div > Navbar. So we can't use useLocation in App component directly.
  // We need to create a wrapper or move Navbar inside a component that uses useLocation.

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-obsidian text-cream font-sans antialiased selection:bg-gold selection:text-obsidian">
        <AppContent />
      </div>
    </HashRouter>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar hideLogoOnHome={isHome} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/brew-guide" element={<BrewGuide />} />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
};

export default App;