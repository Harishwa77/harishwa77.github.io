
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Zap, CheckCircle, Send, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

interface InternResultsProps {
  data: any;
}

export function InternResults({ data }: InternResultsProps) {
  const { toast } = useToast();

  const handleApply = (startupName: string) => {
    toast({
      title: "Application Sent",
      description: `Your profile has been shared with the team at ${startupName}.`,
    });
  };

  // Mock data for Radar chart if not provided by AI
  const radarData = [
    { subject: 'Technical', A: 85, fullMark: 100 },
    { subject: 'Product', A: 65, fullMark: 100 },
    { subject: 'Finance', A: 45, fullMark: 100 },
    { subject: 'Growth', A: 75, fullMark: 100 },
    { subject: 'Strategy', A: 90, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="p-6 bg-card border-border/50 flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="font-headline font-semibold">Strength Analysis</h3>
          </div>
          <p className="text-sm font-body leading-relaxed">{data.internStrengthAnalysis}</p>
          <div className="mt-8 p-4 rounded-xl bg-secondary/30 border border-border/50">
             <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-primary" />
              <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-muted-foreground">Neural Capability Map</p>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {data.matchedStartups.map((match: any, i: number) => (
          <Card key={i} className="p-6 bg-secondary/20 border-border/50 relative overflow-hidden group hover:border-accent/50 transition-colors flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4">
               <div className="text-2xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors">#{i+1}</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-semibold truncate pr-8">{match.startupName}</h3>
              </div>
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] text-muted-foreground uppercase">Compatibility</span>
                  <span className="text-sm font-bold text-accent">{match.compatibilityScore}%</span>
                </div>
                <Progress value={match.compatibilityScore} className="h-1 bg-background" />
              </div>
              <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">Recommended Role</p>
                <p className="text-sm font-headline font-medium">{match.recommendedRole}</p>
              </div>
            </div>
            <Button 
              onClick={() => handleApply(match.startupName)}
              className="mt-6 w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 gap-2 font-headline font-bold text-xs uppercase"
              variant="outline"
            >
              <Send className="w-3 h-3" />
              Apply Now
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-card border-border/50">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="w-5 h-5 text-accent" />
          <h3 className="font-headline font-semibold">Skill Gap Optimization</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.skillGapSuggestions.map((suggestion: string, i: number) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg border border-border/50">
              <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
              <p className="text-sm font-body">{suggestion}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
