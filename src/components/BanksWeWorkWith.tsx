import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from 'react';

const banks = [
  { name: "HDFC", logo: "/src/asset/hdfc.png" },
  { name: "Axis", logo: "/src/asset/axis.jpg" },
  { name: "ICICI", logo: "/src/asset/icic.png" },
  { name: "SBI", logo: "/src/asset/sbi.png" },
  { name: "PNB", logo: "/src/asset/pnb.png" },
  { name: "BoB", logo: "/src/asset/bob.png" },
  { name: "Kotak", logo: "/src/asset/kotak-mahindra-bank.png" },
  { name: "IndusInd", logo: "/src/asset/indusl.jpg" },
  { name: "IDFC", logo: "/src/asset/idfc.png" },
  { name: "Yes Bank", logo: "/src/asset/yesbank.png" },
  { name: "Bajaj", logo: "/src/asset/bajaj-finser.png" },
  { name: "Incred Finance", logo: "/src/asset/incred.jpg" },
  { name: "Aditya Birla Finance", logo: "/src/asset/adityab.jpg" },
  { name: "SMFG/Fulleton", logo: "/src/asset/smfg.png" },
  { name: "Tata Capital", logo: "/src/asset/tatac.png" },
  { name: "Piramal Finance", logo: "/src/asset/piramalf.png" },
  { name: "Poonawalla Finance", logo: "/src/asset/poonaw.jpg" },
  { name: "ShreeRam Finance", logo: "/src/asset/shriram.jpg" },
];

// Duplicate the banks array to create a seamless loop
const duplicatedBanks = [...banks, ...banks, ...banks, ...banks, ...banks];
const CARD_WIDTH = 136; // 128px (w-32) + 8px (gap-8)

const BanksWeWorkWith = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const animationRef = useRef<number>();

  // Auto-scroll animation
  const animate = (timestamp: number) => {
    if (!isPaused && !isDragging) {
      setPosition(prev => {
        const newPos = prev - 0.6; // Increased speed (was 0.3)
        return newPos <= -CARD_WIDTH * banks.length ? 0 : newPos;
      });
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  // Set up animation loop
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging]);

  // Touch/mouse event handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const moveX = clientX - startX;
    setPosition(prev => prev + moveX);
    setStartX(clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Resume auto-scroll after a delay
    setTimeout(() => setIsPaused(false), 2000);
  };

  const scrollBy = (direction: 'left' | 'right') => {
    const amount = direction === 'left' ? -CARD_WIDTH * 3 : CARD_WIDTH * 3;
    setPosition(prev => prev + amount);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => !isDragging && setIsPaused(false);

  return (
    <section
      className="py-12 bg-gray-50 overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Banks We Work With</h2>
          <p className="text-gray-600">
            We have strong partnerships with India's leading banks
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-4">
          {/* Navigation Arrows */}
          <button
            onClick={() => scrollBy('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 focus:outline-none"
            aria-label="Previous banks"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={() => scrollBy('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 focus:outline-none"
            aria-label="Next banks"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          <div className="relative w-full overflow-visible">
            <div
              ref={sliderRef}
              className="flex items-center gap-8 w-max transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${position}px)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
            >
              {duplicatedBanks.map((bank, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center w-32 h-24 cursor-grab active:cursor-grabbing select-none"
                >
                  <div className="p-1.5 bg-gray-50 rounded-full mb-2 flex items-center justify-center h-10 w-10">
                    <img
                      src={bank.logo}
                      alt={`${bank.name} logo`}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{bank.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BanksWeWorkWith;
