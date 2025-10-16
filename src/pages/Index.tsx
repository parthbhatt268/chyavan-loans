import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import BanksWeWorkWith from "@/components/BanksWeWorkWith";
import ReferralBonus from "@/components/ReferralBonus";
import Questions from "@/components/Questions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <BanksWeWorkWith />
        <Expertise />
        <ReferralBonus />
        <Questions />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
};

export default Index;
