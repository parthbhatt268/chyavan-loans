import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-poppins mb-4">
              Chavan
            </h3>
            <p className="text-background/80 mb-4">
              Your trusted loan consultant with 20+ years of expertise in securing the right loans at the best rates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["home", "expertise", "referral", "questions", "contact"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-background/80 hover:text-background transition-colors capitalize"
                  >
                    {section === "referral" ? "Referral Bonus" : section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-background/80">
              <li>Personal Loans</li>
              <li>Home Loans</li>
              <li>Business Loans</li>
              <li>Loan Against Property</li>
              <li>Vehicle Finance</li>
              <li>Balance Transfers</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="mailto:chavan@loanservices.com" className="hover:text-background">
                  chavan@loanservices.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-background">
                  +91 98765 43210
                </a>
              </li>
              <li>Mumbai, Maharashtra</li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-background/80 hover:text-background transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/80 text-sm">
              © {currentYear} Chavan Loan Consultancy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-background/80">
              <a href="#" className="hover:text-background">Privacy Policy</a>
              <a href="#" className="hover:text-background">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
