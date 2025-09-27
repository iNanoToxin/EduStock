import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Zap, AlertTriangle, Target } from "lucide-react";

const FinancialDashboard = () => {
  const portfolioData = [
    { symbol: "AAPL", change: 2.5, value: 150.25, prediction: "BUY" },
    { symbol: "GOOGL", change: -1.2, value: 2350.80, prediction: "HOLD" },
    { symbol: "TSLA", change: 5.8, value: 890.45, prediction: "BUY" },
    { symbol: "MSFT", change: 1.1, value: 305.60, prediction: "BUY" }
  ];

  const insights = [
    {
      type: "opportunity",
      title: "AI Prediction Alert",
      description: "Our ML model suggests strong bullish sentiment for tech stocks in the next 24-48 hours",
      confidence: 87
    },
    {
      type: "warning",
      title: "Market Volatility",
      description: "Increased volatility detected in energy sector. Consider rebalancing portfolio",
      confidence: 72
    },
    {
      type: "info",
      title: "Diversification Tip",
      description: "Your portfolio could benefit from 15% allocation to emerging markets",
      confidence: 94
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Financial Dashboard</h2>
        <p className="text-muted-foreground">AI-powered insights and portfolio analysis</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Insights */}
        <Card className="p-6 shadow-financial">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary shadow-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">AI Market Insights</h3>
              <p className="text-sm text-muted-foreground">Real-time ML predictions & analysis</p>
            </div>
          </div>

          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    insight.type === 'opportunity' ? 'bg-success' :
                    insight.type === 'warning' ? 'bg-warning' : 'bg-primary'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{insight.title}</h4>
                      <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Portfolio Predictions */}
        <Card className="p-6 shadow-financial">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">ML Predictions</h3>
              <p className="text-sm text-muted-foreground">Next-day return forecasts</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <AlertTriangle className="w-4 h-4" />
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {portfolioData.map((stock, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary text-white text-sm font-bold flex items-center justify-center shadow-glow">
                    {stock.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">${stock.value}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-1 ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">{stock.change >= 0 ? '+' : ''}{stock.change}%</span>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stock.prediction === 'BUY' ? 'bg-success/20 text-success' :
                    stock.prediction === 'HOLD' ? 'bg-warning/20 text-warning' :
                    'bg-destructive/20 text-destructive'
                  }`}>
                    {stock.prediction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Coming Soon */}
      <Card className="mt-8 p-8 text-center shadow-card border-dashed border-2 border-primary/20">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl shadow-glow mx-auto mb-4 flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Advanced Analytics Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            Real-time market data, sentiment analysis, and topological feature predictions will be available once connected to our backend services.
          </p>
          <Button className="gap-2 shadow-financial">
            <Zap className="w-4 h-4" />
            Enable Full Features
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FinancialDashboard;