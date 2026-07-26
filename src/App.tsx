import "./stylesheets/App.css";
import "./stylesheets/Navbar.css";
import "./stylesheets/HeroSection.css";
import "./stylesheets/Problem.css";
import "./stylesheets/WhyWisemonie.css";
import "./stylesheets/Features.css";
import "./stylesheets/FundedWeek.css";
import "./stylesheets/HowItWorks.css";
import "./stylesheets/FAQ.css";
import "./stylesheets/Download.css";
import "./stylesheets/Footer.css";
import "./stylesheets/About.css";
import "./stylesheets/Responsiveness.css";
import "./stylesheets/PagesResponsiveness.css";

import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
// import Problem from "./components/Problem";
// import WhyWisemonie from "./components/WhyWisemonie";
import Features from "./components/Features";
import FundedWeek from "./components/FundedWeek";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Download from "./components/Download";
import Footer from "./components/Footer";

import About from "./pages/About";
import Contact from "./pages/Contact";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import { ChevronUpIcon } from "lucide-react";

function AppContent() {
  // Renamed to avoid shadowing the imported components
  const isHome = useMatch("/");
  const isAboutPage = useMatch("/about");
  const isContactPage = useMatch("/contact");
  const isTermsPage = useMatch("/terms-of-service");
  const isPrivacyPage = useMatch("/privacy");

  return (
    <>
      <a href="#header" className="goToTop">
        <ChevronUpIcon />
      </a>

      <header id="header" className={isHome ? "homeHeader" : ""}>
        <Navbar />
        {isHome && <HeroSection />}
      </header>

      <main
        id="Main"
        className={`
          ${isAboutPage ? "aboutPage" : ""} 
          ${isContactPage ? "contactPage" : ""}
          ${isTermsPage ? "termsPage" : ""}
          ${isPrivacyPage ? "privacyPage" : ""}
        `}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Features />
                <FundedWeek />
                <HowItWorks />
                <FAQ />
                <Download />
              </>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
