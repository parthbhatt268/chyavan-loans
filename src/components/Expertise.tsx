import { useState } from "react";
import { ChevronDown, Home, User, Briefcase, Building, Car, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpertiseItem {
  title: string;
  icon: React.ElementType;
  description: string;
}

const expertiseItems: ExpertiseItem[] = [
  {
    title: "Personal Loans",
    icon: User,
    description: "Unsecured funds for urgent needs like medical, education, or travel. Quick approvals & minimal paperwork."
  },
  {
    title: "Home Loans",
    icon: Home,
    description: "Financing for purchase, construction, or balance transfer to lower interest. Flexible tenures with competitive rates from leading banks."
  },
  {
    title: "Business Loans",
    icon: Briefcase,
    description: "Working capital and term loans tailored for MSMEs. Streamlined documentation and structured repayments to match cash flows."
  },
  {
    title: "Loan Against Property",
    icon: Building,
    description: "Raise higher amounts at lower rates by pledging residential or commercial property. Ideal for expansion, consolidation, or personal needs."
  },
  {
    title: "Vehicle/Equipment Finance",
    icon: Car,
    description: "Affordable finance for cars, commercial vehicles, or machinery. Preserve cash flow while upgrading assets for growth."
  },
  {
    title: "Top-ups & Balance Transfers",
    icon: RefreshCw,
    description: "Reduce EMIs by shifting to better rates and add top-up funding if needed. We handle eligibility checks and paperwork end-to-end."
  }
];

const Expertise = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="expertise" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground font-poppins mb-4">
            Expert in these loan categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Right loan. Right bank. Right now.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {expertiseItems.map((item, index) => (
            <ExpertiseCard
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggleAccordion(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExpertiseCardProps {
  item: ExpertiseItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const ExpertiseCard = ({ item, isOpen, onToggle, index }: ExpertiseCardProps) => {
  const Icon = item.icon;
  
  return (
    <div 
      className="animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        onClick={onToggle}
        className={cn(
          "w-full bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen 
            ? "border-primary shadow-xl" 
            : "border-border hover:border-primary/50"
        )}
        aria-expanded={isOpen}
        aria-controls={`expertise-content-${index}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 text-left flex-1">
            <div className={cn(
              "p-3 rounded-xl transition-colors",
              isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
            )}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground font-poppins mb-1">
                {item.title}
              </h3>
            </div>
          </div>
          <ChevronDown 
            className={cn(
              "h-5 w-5 text-primary transition-transform duration-300 flex-shrink-0 mt-1",
              isOpen && "transform rotate-180"
            )}
          />
        </div>

        {/* Expandable Content */}
        <div
          id={`expertise-content-${index}`}
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isOpen 
              ? "grid-rows-[1fr] opacity-100 mt-4" 
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <p className="text-muted-foreground text-left leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Expertise;
