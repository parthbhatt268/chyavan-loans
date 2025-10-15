import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const referralSlabs = [
  { min: "1,00,000", max: "2,50,000", bonus: "500" },
  { min: "2,50,001", max: "5,00,000", bonus: "1,000" },
  { min: "5,00,001", max: "10,00,000", bonus: "2,000" },
  { min: "Above 10,00,000", max: "", bonus: "5,000" }
];

const ReferralBonus = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    loanType: "",
    bank: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.loanType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Referral Submitted!",
      description: "Thank you! We'll process your referral soon.",
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      loanType: "",
      bank: ""
    });
  };

  return (
    <section id="referral" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
              <Gift className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground font-poppins mb-4">
              Refer a friend
            </h2>
            <p className="text-xl text-muted-foreground">
              On loan disbursal, you earn up to ₹5,000
            </p>
          </div>

          {/* Referral Table */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                        Loan Amount Range
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-foreground">
                        Your Bonus
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralSlabs.map((slab, index) => (
                      <tr 
                        key={index}
                        className="border-t border-border hover:bg-secondary/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-foreground">
                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {slab.max 
                                ? `${slab.min} – ${slab.max}`
                                : slab.min
                              }
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center gap-1 text-primary font-bold text-lg">
                            <IndianRupee className="h-4 w-4" />
                            {slab.bonus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              * Paid within 7 days of disbursal. Terms & Conditions apply.
            </p>
          </div>

          {/* Referral Form */}
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-2xl font-bold text-foreground font-poppins mb-6">
                Refer Now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Referral Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Loan Type *
                    </label>
                    <Input
                      type="text"
                      value={formData.loanType}
                      onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                      placeholder="e.g., Home Loan"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bank (if any)
                    </label>
                    <Input
                      type="text"
                      value={formData.bank}
                      onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                      placeholder="Enter bank name"
                    />
                  </div>
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Submit Referral
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralBonus;
