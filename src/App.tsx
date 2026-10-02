import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Social from "./components/Social";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import ServiceWindow from "./components/ServiceWindow";
import Calculator from "./components/Calculator";
import RateTable from "./components/RateTable";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 font-body text-fog antialiased">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="grid-bg absolute inset-x-0 top-0 h-[1100px]" />
        <div
          className="anim-breathe absolute -top-44 right-[-12%] h-[560px] w-[560px] rounded-full bg-emerald/[0.09] blur-[130px]"
          style={{ ["--o" as string]: "0.7" }}
        />
        <div
          className="anim-breathe absolute left-[-16%] top-[36%] h-[480px] w-[480px] rounded-full bg-jade/[0.14] blur-[120px]"
          style={{ ["--o" as string]: "0.55", animationDelay: "5s" }}
        />
        <div
          className="anim-breathe absolute bottom-[-12%] right-[14%] h-[430px] w-[430px] rounded-full bg-emerald/[0.06] blur-[110px]"
          style={{ ["--o" as string]: "0.5", animationDelay: "9s" }}
        />
      </div>
      <div className="noise" aria-hidden="true" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-emerald focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <Ticker />
        <Social />
        <HowItWorks />
        <Features />
        <ServiceWindow />
        <Calculator />
        <RateTable />
        <Benefits />
        <Testimonials />
        <Faq />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
