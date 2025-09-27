import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartChat: () => void;
}

const HeroSection = ({ onStartChat }: HeroSectionProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
          Grow Your Wealth Smarter
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Meet your AI financial companion that combines personalized advice with machine learning 
          market predictions. Get expert guidance on budgeting, investing, and strategic trading decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            onClick={onStartChat}
            className="gap-2 text-lg px-8 py-6 shadow-financial hover:shadow-glow transition-all duration-300"
          >
            Start Financial Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;