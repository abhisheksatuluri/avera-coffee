import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_STEPS, QUIZ_BLEND_MAP, PRODUCTS } from '../constants';
import { QuizAnswer } from '../types';
import { submitLead } from '../utils/leadCapture';
import { getWhatsAppLink } from '../utils/whatsapp';

const slideVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -80, opacity: 0 },
};

const TasteQuiz: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = QUIZ_STEPS.length;
  const progress = started ? ((currentStep + 1) / (totalSteps + 1)) * 100 : 0;

  const getRecommendedProduct = () => {
    const flavor = answers['flavor'] || 'chocolate';
    const experience = answers['experience'] || 'casual';
    const productId = QUIZ_BLEND_MAP[flavor]?.[experience] || '1';
    return PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  };

  const handleOptionSelect = (stepId: string, value: string) => {
    const updated = { ...answers, [stepId]: value };
    setAnswers(updated);

    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setShowLeadForm(true);
      }
    }, 400);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSubmitting(true);
    const product = getRecommendedProduct();
    await submitLead({
      name,
      email,
      phone,
      recommendedBlend: product.name,
      quizAnswers: answers,
      source: 'quiz',
    });
    setSubmitting(false);
    setShowResult(true);
  };

  // INTRO SCREEN
  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto py-12"
      >
        <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-4">Personalized For You</span>
        <h2 className="text-3xl md:text-5xl font-serif text-cream mb-6 leading-tight">
          Discover Your <br /><span className="text-gold italic">Perfect Blend</span>
        </h2>
        <p className="text-cream-dim text-base md:text-lg mb-10 max-w-lg mx-auto">
          Answer three simple questions about your taste and lifestyle. We'll match you to the Avera blend that's made for you.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="bg-gold text-obsidian font-bold py-4 px-10 text-sm uppercase tracking-widest hover:bg-gold/90 transition-all duration-300 hover:scale-105"
        >
          Take The Quiz
        </button>
        <p className="text-cream-dim/50 text-xs mt-6 uppercase tracking-wider">60 seconds • 3 questions</p>
      </motion.div>
    );
  }

  // RESULT SCREEN
  if (showResult) {
    const product = getRecommendedProduct();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto py-8"
      >
        <div className="text-center mb-10">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-4">Your Perfect Match</span>
          <h2 className="text-3xl md:text-5xl font-serif text-cream mb-4">
            The <span className="text-gold italic">{product.name}</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/5] overflow-hidden bg-espresso">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <p className="text-amber text-xs uppercase tracking-widest mb-2">{product.origin} • {product.roastLevel} Roast</p>
              <p className="text-cream-dim leading-relaxed">{product.description}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-cream mb-3">Tasting Notes</p>
              <div className="flex gap-2 flex-wrap">
                {product.tastingNotes.map(note => (
                  <span key={note} className="px-3 py-1 border border-gold/30 text-gold text-xs">{note}</span>
                ))}
              </div>
            </div>
            <p className="text-2xl text-gold font-medium">₹{product.price * 100}</p>
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={getWhatsAppLink(`Hi! I took the Avera Taste Quiz and my recommended blend is ${product.name}. I'd like to order it!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gold text-obsidian font-bold py-4 text-center text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order on WhatsApp
              </a>
              <a
                href="#/shop"
                className="w-full border border-white/20 text-cream font-bold py-4 text-center text-sm uppercase tracking-widest hover:border-gold hover:text-gold transition-colors"
              >
                Explore All Blends
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // LEAD CAPTURE FORM
  if (showLeadForm) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto py-12 text-center"
      >
        {/* Progress bar */}
        <div className="w-full h-0.5 bg-white/10 mb-12">
          <div className="h-full bg-gold transition-all duration-500" style={{ width: '100%' }} />
        </div>

        <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-4">Almost There</span>
        <h3 className="text-2xl md:text-3xl font-serif text-cream mb-3">Let's Personalize Your Match</h3>
        <p className="text-cream-dim text-sm mb-10">Share your details and we'll reveal your perfect blend.</p>

        <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full bg-obsidian border border-white/10 p-4 text-cream placeholder-cream-dim/50 text-sm focus:border-gold focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-obsidian border border-white/10 p-4 text-cream placeholder-cream-dim/50 text-sm focus:border-gold focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream-dim mb-2">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              className="w-full bg-obsidian border border-white/10 p-4 text-cream placeholder-cream-dim/50 text-sm focus:border-gold focus:outline-none transition-colors"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold text-obsidian font-bold py-4 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors mt-6 disabled:opacity-50"
          >
            {submitting ? 'Revealing...' : 'Reveal My Blend'}
          </button>
        </form>
      </motion.div>
    );
  }

  // QUIZ STEPS
  const step = QUIZ_STEPS[currentStep];

  return (
    <div className="max-w-2xl mx-auto py-12">
      {/* Progress bar */}
      <div className="w-full h-0.5 bg-white/10 mb-12">
        <div
          className="h-full bg-gold transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="text-center"
        >
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">
            Question {currentStep + 1} of {totalSteps}
          </p>
          <h3 className="text-2xl md:text-4xl font-serif text-cream mb-3">{step.question}</h3>
          <p className="text-cream-dim text-sm mb-10">{step.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {step.options.map(option => {
              const isSelected = answers[step.id] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(step.id, option.value)}
                  className={`p-6 border text-left transition-all duration-300 group hover:border-gold/50 hover:bg-gold/5 ${
                    isSelected
                      ? 'border-gold bg-gold/10 scale-[0.98]'
                      : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <span className="text-2xl mb-3 block">{option.icon}</span>
                  <span className={`text-sm font-medium block ${isSelected ? 'text-gold' : 'text-cream group-hover:text-gold'} transition-colors`}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TasteQuiz;
