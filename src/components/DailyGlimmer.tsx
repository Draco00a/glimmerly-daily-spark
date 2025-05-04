
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Glimmer } from "@/lib/types";
import { categoryInfo } from "@/lib/data";

interface DailyGlimmerProps {
  glimmer: Glimmer;
  onComplete: () => void;
  onSkip: () => void;
  remainingSkips: number;
  timeRemaining: string;
}

export default function DailyGlimmer({
  glimmer,
  onComplete,
  onSkip,
  remainingSkips,
  timeRemaining
}: DailyGlimmerProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const categoryData = categoryInfo[glimmer.category];

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <div className="mb-4 w-full max-w-md text-center">
        <h1 className="mb-1 text-2xl font-bold text-glimmerly-purple">Il tuo Glimmer giornaliero</h1>
        <p className="text-sm text-gray-600">Tempo rimanente: {timeRemaining}</p>
      </div>

      <Card className={`glimmerly-card w-full max-w-md ${isRevealed ? "animate-scale-in" : ""}`}>
        <CardContent className="p-6">
          {isRevealed ? (
            <div className="text-center">
              <div className="mb-3 flex items-center justify-center">
                <span className="mr-2 rounded-full bg-glimmerly-light px-3 py-1 text-sm font-medium text-glimmerly-purple">
                  {categoryData.emoji} {glimmer.category}
                </span>
                <span className="flex">
                  {Array(glimmer.difficultyLevel || 1).fill(0).map((_, i) => (
                    <span key={i} className="text-glimmerly-gold">★</span>
                  ))}
                  {Array(3 - (glimmer.difficultyLevel || 1)).fill(0).map((_, i) => (
                    <span key={i} className="text-gray-300">★</span>
                  ))}
                </span>
              </div>
              <h2 className="mb-4 text-xl font-bold text-glimmerly-purple">{glimmer.title}</h2>
              <p className="mb-6 text-gray-700">{glimmer.description}</p>
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={onComplete} 
                  className="glimmerly-button flex items-center justify-center gap-2 bg-glimmerly-gradient"
                >
                  <span>Completa questa sfida</span>
                </Button>
                <Button 
                  onClick={onSkip}
                  variant="outline" 
                  disabled={remainingSkips === 0}
                  className="border-gray-300 text-gray-700"
                >
                  {remainingSkips > 0
                    ? `Salta (${remainingSkips} salta${remainingSkips === 1 ? "" : "ti"} rimanent${remainingSkips === 1 ? "e" : "i"})`
                    : "Nessun salto disponibile"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="mb-4 text-4xl">✨</div>
              <h2 className="mb-2 text-xl font-bold text-glimmerly-purple">Glimmer pronto!</h2>
              <p className="mb-6 text-gray-700">Tocca per rivelare la sfida di oggi</p>
              <Button 
                onClick={() => setIsRevealed(true)} 
                className="glimmerly-button"
              >
                Rivela il Glimmer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
