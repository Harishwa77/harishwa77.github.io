"use client";

import { ScoreGrid } from "../ScoreGrid";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShieldAlert, TrendingUp, BarChart4, Gavel, HandCoins, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface InvestorResultsProps {
  data: any;
}

export function InvestorResults({ data }: InvestorResultsProps) {
  const { toast } = useToast();

  const getRecommendationColor = (rec: string) => {
    const r = rec.toLowerCase();
    if (r.includes("invest")) return "bg-green-500/10 text-green-500 border-green-500/20";
    if (r.includes("avoid")) return "bg-destructive/10 text-destructive border-destructive/20";
    return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
  };

  const handleInvest = () => {
    toast({
      title: "Investment Committed",
      description: "Your investment interest has been logged for this startup.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-headline font-bold text-foreground">Investment Attractiveness Memo</h2>
        <div className="flex items-center gap-3">
          <Badge className={getRecommendationColor(data.recommendation)}>
            Recommendation: {data.recommendation}
          </Badge>
          <Button onClick={handleInvest} className="bg-accent hover:bg-accent/90 text-accent-foreground font-headline font-bold uppercase tracking-wider text-xs h-8">
            <HandCoins className="w-4 h-4 mr-2" />
            Invest Now
          </Button>
        </div>
      </div>

      <ScoreGrid scores={data.scores} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border-border/50 space-y-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <BarChart4 className="w-5 h-5 text-accent" />
            <h3 className="font-headline font-semibold">Growth & Return Potential</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-secondary/50 rounded-xl border border-border/50 text-center">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">Year 1</p>
                <p className="text-sm font-bold text-foreground">{data.growthProjection['1_year']}</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-xl border border-border/50 text-center">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">Year 3</p>
                <p className="text-sm font-bold text-foreground">{data.growthProjection['3_year']}</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-xl border border-border/50 text-center">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">Year 5</p>
                <p className="text-sm font-bold text-foreground">{data.growthProjection['5_year']}</p>
              </div>
            </div>
            
            <div className="p-5 bg-accent/5 border border-accent/10 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-headline font-bold">Estimated ROI</span>
                <span className="text-2xl font-bold text-accent">{data.estimatedROI}</span>
              </div>
              <Progress value={75} className="h-2 bg-background" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border/50 space-y-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <h3 className="font-headline font-semibold">Pool Saturation</h3>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
            <p className="text-xs font-body leading-relaxed text-muted-foreground italic">
              {data.poolSaturationAnalysis || "Evaluating against standard market benchmarks."}
            </p>
          </div>
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-destructive/5 rounded-xl border border-destructive/20">
              <p className="text-[10px] text-destructive uppercase mb-2 font-bold tracking-widest">Stability Risk</p>
              <p className="text-lg font-bold text-foreground">{data.recessionSurvivalProbability}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border/50">
          <h3 className="font-headline font-semibold mb-4 flex items-center gap-2">
            <Gavel className="w-5 h-5 text-accent" />
            Investment Summary
          </h3>
          <p className="text-sm font-body leading-relaxed text-foreground/90 bg-secondary/10 p-4 rounded-xl border border-border/30">
            {data.investmentSummary}
          </p>
        </Card>

        <Card className="p-6 bg-[#1A1111] border-destructive/20">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-destructive" />
            <h3 className="font-headline font-semibold text-destructive">Major Risk Factors</h3>
          </div>
          <ul className="space-y-2">
            {data.majorRisks.map((risk: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs font-body text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5" />
                {risk}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
