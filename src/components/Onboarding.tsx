
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { categoryInfo } from "@/lib/data";
import { GlimmerCategory } from "@/lib/types";

interface OnboardingProps {
  onComplete: (categories: GlimmerCategory[]) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [selectedCategories, setSelectedCategories] = useState<GlimmerCategory[]>([]);

  const toggleCategory = (category: GlimmerCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleComplete = () => {
    if (selectedCategories.length > 0) {
      onComplete(selectedCategories);
    }
  };

  const categories = Object.entries(categoryInfo) as [GlimmerCategory, { title: string; description: string; emoji: string }][];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-white p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-glimmerly-purple">Benvenuto su Glimmerly!</h1>
        <p className="text-lg text-gray-700">
          Seleziona le categorie di sfide che ti interessano di più
        </p>
      </div>

      <div className="grid w-full max-w-md gap-4 md:grid-cols-2">
        {categories.map(([category, info]) => (
          <div
            key={category}
            className={`glimmerly-card animate-fade-in cursor-pointer p-4 ${
              selectedCategories.includes(category) 
                ? "border-2 border-glimmerly-purple bg-glimmerly-light" 
                : ""
            }`}
            onClick={() => toggleCategory(category)}
          >
            <div className="mb-2 text-3xl">{info.emoji}</div>
            <h3 className="mb-1 font-bold text-glimmerly-purple">{info.title}</h3>
            <p className="text-sm text-gray-600">{info.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 w-full max-w-md">
        <Button
          onClick={handleComplete}
          disabled={selectedCategories.length === 0}
          className="glimmerly-button w-full"
        >
          {selectedCategories.length === 0 
            ? "Seleziona almeno una categoria" 
            : `Continua con ${selectedCategories.length} ${selectedCategories.length === 1 ? "categoria" : "categorie"}`}
        </Button>

        {selectedCategories.length === 0 && (
          <p className="mt-2 text-center text-sm text-gray-500">
            Seleziona almeno una categoria per continuare
          </p>
        )}
      </div>
    </div>
  );
}
