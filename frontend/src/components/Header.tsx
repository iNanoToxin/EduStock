import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, BarChart3, TrendingUp } from "lucide-react";

interface HeaderProps {
  activeView: "home" | "chat" | "dashboard";
  setActiveView: (view: "home" | "chat" | "dashboard") => void;
}

const Header = ({ activeView, setActiveView }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary shadow-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EduStock</h1>
              <p className="text-sm text-muted-foreground">Your AI Financial Goat</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Button
              variant={activeView === "home" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("home")}
              className="gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Home
            </Button>
            <Button
              variant={activeView === "chat" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("chat")}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              AI Chat
            </Button>
            <Button
              variant={activeView === "dashboard" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("dashboard")}
              className="gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;