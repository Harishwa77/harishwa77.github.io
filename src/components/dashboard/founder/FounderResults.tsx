"use client";

import { useState } from "react";
import { ScoreGrid } from "../ScoreGrid";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck, TriangleAlert, Lightbulb, TrendingUp, Globe, Loader2, ShieldCheck, Link2, MapPin, Navigation, Image as ImageIcon } from "lucide-react";
import { useFirestore, useUser, useAuth } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface FounderResultsProps {
  data: any;
  input: any;
}

export function FounderResults({ data, input }: FounderResultsProps) {
  const { user } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);

  // Clearbit Logo API is free for simple logo fetching via URL
  const companyDomain = input.companyUrl?.replace(/https?:\/\//, '').split('/')[0] || 'clearbit.com';
  const logoUrl = `https://logo.clearbit.com/${companyDomain}`;

  const handlePublish = async () => {
    if (!user) {
      initiateAnonymousSignIn(auth);
      toast({
        title: "Establishing Connection",
        description: "We are creating a secure session for you. Please click 'Register' again once connected.",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const startupData = {
        founderId: user.uid,
        name: `${input.industry || 'Unnamed'} Venture - ${Math.floor(Math.random() * 1000)}`,
        ideaDescription: data.improvedIdea || input.startupIdea,
        industry: input.industry || "General",
        targetMarket: input.targetMarket || "Global",
        region: input.region || "Online",
        initialBudget: parseFloat(input.budget?.replace(/[^0-9.]/g, '')) || 0,
        currentRevenue: 0,
        teamSize: parseInt(input.teamSize) || 1,
        createdAt: serverTimestamp(),
        companyUrl: input.companyUrl || "",
        logoUrl: logoUrl,
      };

      addDocumentNonBlocking(collection(db, "startups_for_investment"), startupData);
      
      toast({
        title: "Success: Startup Registered",
        description: "Your venture has been added to the investment pool.",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "Could not register your startup idea.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-xl bg-secondary/50 border border-border/50 overflow-hidden flex items-center justify-center">
            {input.companyUrl ? (
              <Image 
                src={logoUrl} 
                alt="Logo" 
                fill 
                className="object-contain p-2" 
                unoptimized
              />
            ) : (
              <ImageIcon className="w-6 h-6 text-muted-foreground opacity-20" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-headline font-bold text-foreground">Strategic Analysis Report</h2>
            <p className="text-sm text-muted-foreground font-body">Multivariate startup viability and execution assessment.</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Button 
            onClick={handlePublish} 
            disabled={isPublishing}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline font-bold uppercase tracking-wider text-xs gap-2 min-w-[220px] shadow-lg shadow-primary/20"
          >
            {isPublishing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : user ? (
              <Globe className="w-4 h-4" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            {user ? "Publish to Investment Pool" : "Connect & Register"}
          </Button>
        </div>
      </header>

      <ScoreGrid scores={data.scores} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="p-6 bg-card border-border/50 lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <CircleCheck className="w-5 h-5 text-accent" />
            <h3 className="font-headline font-semibold">Evaluation & Improved Concept</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-secondary/40 rounded border border-border/30">
              <p className="text-[10px] text-muted-foreground mb-1 font-headline uppercase tracking-wider font-bold">Original Evaluation</p>
              <p className="text-sm font-body text-foreground/90 leading-relaxed">{data.evaluation}</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 shadow-inner">
              <p className="text-[10px] text-primary mb-1 font-headline uppercase tracking-wider font-bold">Optimized Concept</p>
              <p className="text-sm font-body italic text-primary-foreground/90 leading-relaxed">"{data.improvedIdea}"</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-[#0B0E14] border-accent/20 lg:col-span-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -m-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Navigation className="w-32 h-32 text-accent" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-accent" />
            <h3 className="font-headline font-semibold">Geospatial Intelligence</h3>
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="bg-accent/20 p-2 rounded">
                <Globe className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-[10px] text-accent uppercase font-bold tracking-widest">Active Region</p>
                <p className="text-sm font-headline font-bold">{input.region || "Global Market"}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-background/40 border border-border/50">
              <p className="text-[11px] font-body leading-relaxed text-foreground/80">
                {data.geospatialStrategy}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border-border/50 space-y-4">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-accent" />
            <h3 className="font-headline font-semibold">Strategic APIs</h3>
          </div>
          <div className="space-y-3">
            {data.apiRecommendations?.map((api: any, i: number) => (
              <div key={i} className="flex flex-col gap-0.5">
                <p className="text-xs font-headline font-bold text-accent">{api.name}</p>
                <p className="text-[10px] text-muted-foreground">{api.benefit}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border/50 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3 className="font-headline font-semibold">Revenue Model</h3>
          </div>
          <p className="text-sm font-body leading-relaxed text-muted-foreground">{data.revenueModelOptimization}</p>
        </Card>

        <Card className="p-6 bg-card border-border/50 space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            <h3 className="font-headline font-semibold">Innovation Boosters</h3>
          </div>
          <ul className="space-y-2">
            {data.innovationSuggestions.map((suggestion: string, i: number) => (
              <li key={i} className="text-[12px] font-body text-muted-foreground border-l-2 border-accent/30 pl-3">
                {suggestion}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
