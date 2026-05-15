import React, { useState } from 'react';
import { Coffee } from 'lucide-react';

const BREW_METHODS = [
  {
    id: 'pourover',
    name: 'Pour Over',
    icon: '☕',
    time: '3-4 min',
    difficulty: 'Intermediate',
    grind: 'Medium',
    ratio: '1:16',
    temp: '92-96°C (200°F)',
    bestFor: ['Arabica Washed', 'Arabica Natural', 'Red Honey Sun-Dried'],
    steps: [
      'Heat water to 92-96°C. Rinse paper filter with hot water and discard.',
      'Add 15g medium-ground coffee to the dripper.',
      'Start timer. Pour 30ml water in circles to bloom. Wait 30 seconds.',
      'Slowly pour remaining 210ml in concentric circles over 2-3 minutes.',
      'Total brew time should be 3-4 minutes. Serve immediately.',
    ],
    tip: 'The bloom releases CO2 trapped during roasting. A vigorous bloom means your coffee is fresh.',
  },
  {
    id: 'frenchpress',
    name: 'French Press',
    icon: '🫖',
    time: '4 min',
    difficulty: 'Beginner',
    grind: 'Coarse',
    ratio: '1:15',
    temp: '93°C (200°F)',
    bestFor: ['Arabica Natural', 'Black Honey Sun-Dried', 'Fermented Whiskey'],
    steps: [
      'Heat water to 93°C. Preheat the French Press with hot water.',
      'Add 18g coarsely ground coffee.',
      'Pour 270ml hot water. Stir once gently.',
      'Place lid on (don\'t press). Steep for exactly 4 minutes.',
      'Press plunger slowly and evenly. Pour immediately — don\'t let it sit.',
    ],
    tip: 'French Press preserves the natural oils that paper filters absorb, giving you a fuller body — ideal for our Natural and Honey processed coffees.',
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    icon: '🔬',
    time: '2 min',
    difficulty: 'Beginner',
    grind: 'Medium-Fine',
    ratio: '1:12',
    temp: '85-90°C',
    bestFor: ['Arabica Washed', 'Red Honey Sun-Dried'],
    steps: [
      'Set up AeroPress in inverted position. Add 17g medium-fine coffee.',
      'Pour 200ml water at 85-90°C.',
      'Stir 3 times. Cap with rinsed filter.',
      'Wait 1 minute. Flip onto mug and press gently for 30 seconds.',
      'Dilute with 30-50ml hot water if desired.',
    ],
    tip: 'The inverted method prevents drip-through, giving you full control over brew time. Lower temperature brings out sweetness in our honey-processed beans.',
  },
  {
    id: 'espresso',
    name: 'Espresso',
    icon: '☕',
    time: '25-30 sec',
    difficulty: 'Advanced',
    grind: 'Fine',
    ratio: '1:2',
    temp: '93°C',
    bestFor: ['Fine Robusta', 'Fermented Whiskey', 'Black Honey Sun-Dried'],
    steps: [
      'Grind 18g coffee to a fine, consistent grind (like table salt).',
      'Distribute evenly in the portafilter. Tamp firmly and level.',
      'Lock portafilter and start extraction immediately.',
      'Target 36g output in 25-30 seconds.',
      'The shot should start thin and blonde, thicken to a dark stream, and stop before it goes watery.',
    ],
    tip: 'Our Fine Robusta was specifically developed for espresso — the high body and crema production cuts beautifully through milk.',
  },
  {
    id: 'coldbrew',
    name: 'Cold Brew',
    icon: '🧊',
    time: '12-18 hours',
    difficulty: 'Beginner',
    grind: 'Extra Coarse',
    ratio: '1:8',
    temp: 'Cold / Room Temp',
    bestFor: ['Arabica Natural', 'Fine Robusta', 'Red Honey Sun-Dried'],
    steps: [
      'Grind 100g coffee extra coarse (like raw sugar).',
      'Combine with 800ml room temperature or cold filtered water.',
      'Stir to ensure all grounds are wet. Cover.',
      'Refrigerate for 12-18 hours (don\'t go over 24).',
      'Strain through a fine mesh filter or cheesecloth. Dilute 1:1 with water or milk.',
    ],
    tip: 'Cold brew extracts sweetness and body without acidity or bitterness. Our Natural process coffees shine here — the blueberry and chocolate notes are amplified.',
  },
  {
    id: 'southindian',
    name: 'South Indian Filter',
    icon: '🫗',
    time: '10-15 min',
    difficulty: 'Beginner',
    grind: 'Fine',
    ratio: '1:10',
    temp: 'Boiling',
    bestFor: ['Fine Robusta', 'Arabica Washed'],
    steps: [
      'Add 20g fine-ground coffee to the upper chamber of the filter.',
      'Press down gently with the pressing disc.',
      'Pour 200ml boiling water over the pressing disc.',
      'Cover and wait 10-15 minutes for the decoction to drip through.',
      'Mix 2 tablespoons of decoction with hot milk and sugar to taste.',
    ],
    tip: 'The traditional South Indian filter creates a concentrated decoction that pairs perfectly with hot milk. Our Fine Robusta gives you that authentic, strong kaapi experience.',
  },
];

const BrewGuide: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState('pourover');
  const method = BREW_METHODS.find(m => m.id === activeMethod) || BREW_METHODS[0];

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden mb-16">
        <img
          src="/Coffee Beans Texture Background.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/40 to-obsidian"></div>
        <div className="relative z-10 container mx-auto px-6 py-16 md:py-20 text-center">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-4">The Avera Guide</span>
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-4 drop-shadow-2xl">Brewing Guides</h1>
          <p className="text-cream max-w-lg mx-auto text-sm md:text-base drop-shadow-lg">
            Master every brew method. From your first pour-over to the perfect espresso — we'll walk you through it.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        {/* Method Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {BREW_METHODS.map(m => (
            <button
              key={m.id}
              onClick={() => setActiveMethod(m.id)}
              className={`px-5 py-3 text-sm border transition-all duration-200 ${
                activeMethod === m.id
                  ? 'border-gold text-gold bg-gold/10'
                  : 'border-white/10 text-cream-dim hover:border-white/30 hover:text-cream'
              }`}
            >
              <span className="mr-2">{m.icon}</span>
              {m.name}
            </button>
          ))}
        </div>

        {/* Active Method Detail */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-5xl mb-4 block">{method.icon}</span>
            <h2 className="text-3xl md:text-4xl font-serif text-cream mb-2">{method.name}</h2>
            <p className="text-cream-dim text-sm">{method.difficulty} &bull; {method.time}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="p-4 border border-white/5 bg-white/[0.02] text-center">
              <p className="text-[10px] uppercase tracking-widest text-gold mb-1">Grind</p>
              <p className="text-cream text-sm font-medium">{method.grind}</p>
            </div>
            <div className="p-4 border border-white/5 bg-white/[0.02] text-center">
              <p className="text-[10px] uppercase tracking-widest text-gold mb-1">Ratio</p>
              <p className="text-cream text-sm font-medium">{method.ratio}</p>
            </div>
            <div className="p-4 border border-white/5 bg-white/[0.02] text-center">
              <p className="text-[10px] uppercase tracking-widest text-gold mb-1">Temperature</p>
              <p className="text-cream text-sm font-medium">{method.temp}</p>
            </div>
            <div className="p-4 border border-white/5 bg-white/[0.02] text-center">
              <p className="text-[10px] uppercase tracking-widest text-gold mb-1">Time</p>
              <p className="text-cream text-sm font-medium">{method.time}</p>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-12">
            <h3 className="text-xs uppercase tracking-widest text-gold mb-6 font-bold">Step by Step</h3>
            <div className="space-y-6">
              {method.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 border border-gold/30 flex items-center justify-center text-gold text-sm font-serif">
                    {i + 1}
                  </div>
                  <p className="text-cream-dim text-sm leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="p-6 border border-gold/20 bg-gold/5 mb-12">
            <div className="flex items-start gap-3">
              <Coffee size={20} className="text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-widest text-gold mb-2 font-bold">Avera Tip</p>
                <p className="text-cream text-sm leading-relaxed">{method.tip}</p>
              </div>
            </div>
          </div>

          {/* Best With */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gold mb-4 font-bold">Best With</h3>
            <div className="flex flex-wrap gap-3">
              {method.bestFor.map(blend => (
                <span key={blend} className="px-4 py-2 border border-white/10 text-cream text-sm hover:border-gold/50 hover:text-gold transition-colors cursor-default">
                  {blend}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrewGuide;
