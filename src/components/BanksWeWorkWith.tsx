import { Banknote, Building2, Landmark, PiggyBank, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from 'react';

const banks = [
  { name: "HDFC", icon: <Building2 className="h-6 w-6 text-blue-600" /> },
  { name: "Axis", icon: <PiggyBank className="h-6 w-6 text-blue-800" /> },
  { name: "ICICI", icon: <Banknote className="h-6 w-6 text-blue-400" /> },
  { name: "SBI", icon: <Landmark className="h-6 w-6 text-blue-700" /> },
  { name: "PNB", icon: <Building2 className="h-6 w-6 text-red-600" /> },
  { name: "BoB", icon: <PiggyBank className="h-6 w-6 text-yellow-600" /> },
  { name: "Kotak", icon: <Banknote className="h-6 w-6 text-purple-600" /> },
  { name: "IndusInd", icon: <Landmark className="h-6 w-6 text-blue-500" /> },
  { name: "IDFC", icon: <Building2 className="h-6 w-6 text-orange-600" /> },
  { name: "Yes Bank", icon: <PiggyBank className="h-6 w-6 text-green-600" /> },
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
                  <div className="p-1.5 bg-gray-50 rounded-full mb-2">
                    {bank.icon}
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
