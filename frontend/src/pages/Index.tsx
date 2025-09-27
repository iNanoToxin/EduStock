import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";
import FinancialDashboard from "@/components/FinancialDashboard";

const Index = () => {
  const [activeView, setActiveView] = useState<"home" | "chat" | "dashboard">("home");

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      {activeView === "home" && <HeroSection onStartChat={() => setActiveView("chat")} />}
      {activeView === "chat" && <ChatInterface />}
      {activeView === "dashboard" && <FinancialDashboard />}
    </div>
  );
};

export default Index;