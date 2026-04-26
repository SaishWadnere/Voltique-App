import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import imgBlack from '../../images/blackHeadphone.jpg';
import imgGrey from '../../images/greyHeadphone.png';
import imgRed from '../../images/redHeadphone.png';
import imgBlue from '../../images/blueHeadphone.png';

const heroColors = [
  { hex: '#1a1a1a', name: 'Black', image: imgBlack },
  { hex: '#6b6b6b', name: 'Grey', image: imgGrey },
  { hex: '#c0392b', name: 'Red', image: imgRed },
  { hex: '#2563EB', name: 'Blue', image: imgBlue },
];

export default function Hero() {
  const [activeColor, setActiveColor] = useState(heroColors[0]);
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white">
      <div className="container-main w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-1.5 bg-tertiary text-on-tertiary text-label-uppercase rounded-full mb-6">
              Voltique Series
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-[3.5rem] font-black leading-[0.95] tracking-[-0.04em] text-primary mb-6">
              Experience<br />
              Sound. Vision.<br />
              Power.
            </h1>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-md mb-8">
              Engineered with precision components and curated for the digital avant-garde. Elevate your everyday artifacts to a higher frequency.
            </p>
            <div className="flex gap-4">
              <Link
                to="/shop"
                className="btn-primary btn-primary-hover no-underline gap-2"
              >
                Shop Now
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="btn-secondary no-underline hover:bg-surface-low"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] aspect-[4/3] group">
              {heroColors.map((color) => (
                <img
                  key={color.name}
                  src={color.image}
                  alt={`Voltique Headphones ${color.name}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${activeColor.name === color.name
                      ? 'opacity-100 z-10'
                      : 'opacity-0 z-0'
                    }`}
                />
              ))}
            </div>
            {/* Color selector */}
            <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl px-5 py-3 flex items-center justify-between z-20">
              <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Select Finish</span>
              <div className="flex gap-3">
                {heroColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveColor(c)}
                    className={`w-7 h-7 rounded-full border-2 shadow-md transition-all ${activeColor.name === c.name
                        ? 'border-white scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-transparent'
                        : 'border-transparent hover:scale-110 hover:border-white/50'
                      }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={`Select ${c.name} finish`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
