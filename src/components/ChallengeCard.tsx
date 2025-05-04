
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Glimmer, GlimmerCategory } from "@/lib/types";
import { categoryInfo } from "@/lib/data";

interface ChallengeCardProps {
  glimmer: Glimmer;
  onSubmit: (data: {
    mediaType: "video" | "photo";
    description: string;
    category: GlimmerCategory;
    isPublic: boolean;
  }) => void;
  onCancel: () => void;
}

export default function ChallengeCard({
  glimmer,
  onSubmit,
  onCancel
}: ChallengeCardProps) {
  const [mediaType, setMediaType] = useState<"video" | "photo">("video");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<GlimmerCategory>(glimmer.category);
  const [isPublic, setIsPublic] = useState(true);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleMediaCapture = () => {
    // In a real app, this would trigger the device camera
    // For this demo, we'll just simulate it with a timer
    setIsCapturing(true);
    
    setTimeout(() => {
      // Mock photo/video capture result
      setMediaPreview("https://i.pravatar.cc/300?img=32");
      setIsCapturing(false);
    }, 1500);
  };

  const handleSubmit = () => {
    // In a real app, we would upload the media first
    onSubmit({
      mediaType,
      description,
      category,
      isPublic
    });
  };

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center bg-background p-4">
      <Card className="glimmerly-card w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="mb-2 text-xl font-bold text-glimmerly-purple">
            Completa il tuo Glimmer
          </h2>
          <p className="mb-6 text-sm text-gray-600">{glimmer.title}</p>

          {mediaPreview ? (
            <div className="mb-4 overflow-hidden rounded-lg">
              {mediaType === "video" ? (
                <div className="video-container flex items-center justify-center bg-black">
                  <img 
                    src={mediaPreview} 
                    alt="Video preview" 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute text-white">▶️ Video preview</div>
                </div>
              ) : (
                <img 
                  src={mediaPreview} 
                  alt="Photo preview" 
                  className="h-auto w-full rounded-lg"
                />
              )}
              
              <Button 
                onClick={() => setMediaPreview(null)} 
                variant="outline" 
                className="mt-2 w-full border-gray-300"
              >
                Riprova
              </Button>
            </div>
          ) : (
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 w-full">
                <RadioGroup 
                  value={mediaType} 
                  onValueChange={(value) => setMediaType(value as "video" | "photo")}
                  className="flex justify-center gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video">Video</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="photo" id="photo" />
                    <Label htmlFor="photo">Foto</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                onClick={handleMediaCapture} 
                className="glimmerly-button flex items-center gap-2"
                disabled={isCapturing}
              >
                {isCapturing ? (
                  "Registrando..."
                ) : (
                  <>
                    <span>{mediaType === "video" ? "Registra Video" : "Scatta Foto"}</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {mediaPreview && (
            <>
              <div className="mb-4">
                <Label htmlFor="description" className="mb-1 block text-sm">
                  Descrizione (opzionale)
                </Label>
                <Textarea 
                  id="description"
                  placeholder="Racconta la tua esperienza..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="glimmerly-input resize-none"
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm">Categoria</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(categoryInfo).map(([cat, info]) => (
                    <Button
                      key={cat}
                      type="button"
                      variant={category === cat ? "default" : "outline"}
                      className={category === cat 
                        ? "bg-glimmerly-gradient text-white" 
                        : "border-gray-300 text-gray-700"
                      }
                      onClick={() => setCategory(cat as GlimmerCategory)}
                    >
                      {info.emoji} {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-6 flex items-center justify-between">
                <Label htmlFor="public-toggle" className="cursor-pointer">
                  Condividi pubblicamente
                </Label>
                <Switch 
                  id="public-toggle"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  className="glimmerly-button flex-1"
                >
                  Pubblica
                </Button>
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  Annulla
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
