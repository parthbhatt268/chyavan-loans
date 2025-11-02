import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Award, Building2, CheckCircle, TrendingUp } from "lucide-react";

const Hero = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '919930027408'; // Replace with your WhatsApp number
    const message = encodeURIComponent("Hi Chyavan, I'm interested in a free loan consultation. Can you help me with more information?");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground font-poppins leading-tight">
                Hi! I'm <span className="text-primary">Chyavan</span>.
                <br />
                <span className="text-2xl lg:text-3xl text-muted-foreground">
                  20+ years of expertise in all kinds of loans.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                I help you compare banks, secure the right loan, and get approvals faster.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={handleWhatsAppClick}
              >
                Book Free Consultation
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => scrollToSection("contact")}
              >
                Check free loan eligibility
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                No hidden fees
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                Bank-neutral advice
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                Fast turnaround
              </div>
            </div>
          </div>

          {/* Right Content - Avatar */}
          <div
            className="relative flex justify-center lg:justify-end animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary to-accent p-2">
                <div className="w-full h-full rounded-full bg-secondary overflow-hidden border-4 border-background">
                  <img 
                    src="/profile-photo.png" 
                    alt="Chyavan" 
                    className="w-full h-full object-cover object-center"
                    style={{
                      minWidth: '100%',
                      minHeight: '100%',
                      borderRadius: '9999px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Band */}
        <div
          className="mt-20 animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<Award className="h-8 w-8" />}
              value={20}
              suffix="+"
              label="Years experience"
            />
            <StatCard
              icon={<Building2 className="h-8 w-8" />}
              value={19}
              suffix="+"
              label="Banks partnered"
            />
            <StatCard
              icon={<TrendingUp className="h-8 w-8" />}
              value={1236}
              suffix="+"
              label="Loans approved"
            />
            <StatCard
              icon={<CheckCircle className="h-8 w-8" />}
              value={9}
              suffix="CR+"
              label="Loam Amount Disbisrust"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const StatCard = ({ icon, value, suffix, label }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50"
    >
      <div className="flex items-center gap-4">
        <div className="text-primary">{icon}</div>
        <div>
          <div className="text-3xl font-bold text-primary font-poppins">
            {count}
            {suffix}
          </div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
