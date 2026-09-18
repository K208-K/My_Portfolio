import React from "react";
import Hero from "@/components/home/Hero";
import QuickProfile from "@/components/home/QuickProfile";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CurrentlyBuilding from "@/components/home/CurrentlyBuilding";
import AIWidget from "@/components/home/AIWidget";
import TerminalPreview from "@/components/home/TerminalPreview";
import ResumeCards from "@/components/home/ResumeCards";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import Footer from "@/components/global/Footer";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center w-full min-h-screen text-neutral-100">
      {/* WhatsApp Fixed Button - Home Page Only */}
      <WhatsAppButton />
      {/* 1. Hero */}
      <Hero />

      {/* 2. Quick Profile Overview */}
      <QuickProfile />

      {/* 3. Featured Projects (featured: true) */}
      <FeaturedProjects />

      {/* 4. Currently Building (status: In Progress) */}
      <CurrentlyBuilding />

      {/* 5. Interactive AI Assistant Widget ("Ask About Karrim") */}
      <AIWidget />

      {/* 6. Terminal Interactive Preview */}
      <TerminalPreview />

      {/* 7. Resume & CV Cards */}
      <ResumeCards />

      {/* Footer - Home Page Only */}
      <Footer />
    </main>
  );
}
