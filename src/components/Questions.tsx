import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What documents do I need to apply for a loan?",
    answer: "Generally, you'll need ID proof, address proof, income proof (salary slips/ITR), and bank statements. Specific requirements vary by loan type and lender."
  },
  {
    question: "How long does loan approval take?",
    answer: "For personal loans, approval can happen within 24-48 hours. Home and business loans typically take 7-15 days depending on documentation and verification."
  },
  {
    question: "Can I get a loan with a low credit score?",
    answer: "Yes, but options may be limited with higher interest rates. We work with multiple lenders to find the best possible solution for your situation."
  },
  {
    question: "What is the benefit of a balance transfer?",
    answer: "Balance transfers can reduce your interest rate, lower your EMI, and save significant money over the loan tenure. We handle the entire process for you."
  },
  {
    question: "Do you charge any fees for your consultancy?",
    answer: "Our consultancy is completely free for you. "
  },
  {
    question: "Which banks do you work with?",
    answer: "We partner with 14+ leading banks and finance institutions including HDFC, ICICI, SBI, Axis, Bajaj Finance, Aditya Birla Finance, SMFG, Incred Finance etc . This allows us to compare and get you the best rates."
  }
];

const Questions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    question: ""
  });
  const { toast } = useToast();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contact || !formData.question) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Question Submitted!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      contact: "",
      question: ""
    });
  };

  return (
    <section id="questions" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground font-poppins mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common queries
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={cn(
                    "w-full px-6 py-5 flex items-start justify-between gap-4 text-left",
                    "hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  )}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-foreground flex-1">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-primary transition-transform duration-300 flex-shrink-0 mt-1",
                      openIndex === index && "transform rotate-180"
                    )}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
