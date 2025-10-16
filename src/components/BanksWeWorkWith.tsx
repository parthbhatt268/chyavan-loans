import { Banknote, Building2, Landmark, PiggyBank } from "lucide-react";
import { useEffect, useRef } from 'react';

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
const duplicatedBanks = [...banks, ...banks, ...banks];

const BanksWeWorkWith = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId: number;
    let position = 0;
    const speed = 0.5; // Adjust speed here (lower is slower)
    
    const animate = () => {
      position -= speed;
      if (position <= -slider.scrollWidth / 3) {
        position = 0;
      }
      slider.style.transform = `translateX(${position}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Banks We Work With</h2>
          <p className="text-gray-600">
            We have strong partnerships with India's leading banks
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-4">
          <div 
            ref={sliderRef}
            className="flex items-center gap-8 w-max"
          >
            {duplicatedBanks.map((bank, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center w-32 h-24"
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
    </section>
  );
};

export default BanksWeWorkWith;
