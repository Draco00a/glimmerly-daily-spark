
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompletedChallenge, GlimmerCategory } from "@/lib/types";
import { categoryInfo, sampleCompletedChallenges, sampleUsers } from "@/lib/data";
import { Heart, MessageCircle, Share } from "lucide-react";

interface FeedViewProps {
  onProfileClick: (userId: string) => void;
}

export default function FeedView({ onProfileClick }: FeedViewProps) {
  const [activeTab, setActiveTab] = useState<"for-you" | "friends" | "popular">("for-you");
  const [activeCategory, setActiveCategory] = useState<GlimmerCategory | "all">("all");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  
  // Filter videos based on active category
  const filteredVideos = activeCategory === "all"
    ? sampleCompletedChallenges
    : sampleCompletedChallenges.filter(video => video.category === activeCategory);
  
  const currentVideo = filteredVideos[currentVideoIndex];
  
  const handleLike = (videoId: string) => {
    if (likedVideos.includes(videoId)) {
      setLikedVideos(likedVideos.filter(id => id !== videoId));
    } else {
      setLikedVideos([...likedVideos, videoId]);
    }
  };
  
  const handleNextVideo = () => {
    if (currentVideoIndex < filteredVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };
  
  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  if (!currentVideo) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p className="text-center text-gray-500">
          Nessun video disponibile per questa categoria
        </p>
      </div>
    );
  }
  
  const user = sampleUsers[currentVideo.userId];
  const isLiked = likedVideos.includes(currentVideo.id);
  
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="z-10 bg-background px-4 pt-2 shadow-sm">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => {
            setActiveTab(value as "for-you" | "friends" | "popular");
            setCurrentVideoIndex(0);
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="for-you">Per Te</TabsTrigger>
            <TabsTrigger value="friends">Amici</TabsTrigger>
            <TabsTrigger value="popular">Popolari</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="my-2 flex gap-2 overflow-x-auto pb-2">
          <Button
            size="sm"
            variant={activeCategory === "all" ? "default" : "outline"}
            className={`rounded-full ${activeCategory === "all" ? "bg-glimmerly-gradient" : "border-gray-300"}`}
            onClick={() => {
              setActiveCategory("all");
              setCurrentVideoIndex(0);
            }}
          >
            Tutti
          </Button>
          {(Object.entries(categoryInfo) as [GlimmerCategory, { emoji: string }][]).map(([category, info]) => (
            <Button
              key={category}
              size="sm"
              variant={activeCategory === category ? "default" : "outline"}
              className={`rounded-full ${activeCategory === category ? "bg-glimmerly-gradient" : "border-gray-300"}`}
              onClick={() => {
                setActiveCategory(category);
                setCurrentVideoIndex(0);
              }}
            >
              {info.emoji} {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="relative flex-grow overflow-hidden bg-black">
        <div 
          className="absolute inset-0 flex touch-none flex-col justify-between p-4"
          onTouchStart={(e) => {
            const touchStartY = e.touches[0].clientY;
            
            const handleTouchEnd = (endEvent: TouchEvent) => {
              const touchEndY = endEvent.changedTouches[0].clientY;
              const deltaY = touchEndY - touchStartY;
              
              if (deltaY > 50) {
                handlePrevVideo();
              } else if (deltaY < -50) {
                handleNextVideo();
              }
              
              document.removeEventListener('touchend', handleTouchEnd);
            };
            
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          {/* Video indicator */}
          <div className="flex w-full justify-center">
            <div className="flex gap-1">
              {filteredVideos.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1 w-6 rounded-full ${
                    index === currentVideoIndex ? "bg-white" : "bg-white/30"
                  }`} 
                />
              ))}
            </div>
          </div>

          <div className="flex">
            {/* Left side - user info and description */}
            <div className="flex-grow">
              <div 
                className="mb-2 flex items-center gap-2"
                onClick={() => onProfileClick(user.id)}
              >
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="h-10 w-10 rounded-full border-2 border-white"
                />
                <span className="font-medium text-white">{user.username}</span>
              </div>
              
              <p className="mb-1 text-sm text-white">{currentVideo.description}</p>
              
              <div className="mb-2 inline-block rounded-full bg-black/40 px-3 py-1 text-xs text-white">
                {categoryInfo[currentVideo.category].emoji} {currentVideo.category}
              </div>
            </div>
            
            {/* Right side - interaction buttons */}
            <div className="flex flex-col items-center gap-6">
              <div 
                className="flex cursor-pointer flex-col items-center"
                onClick={() => handleLike(currentVideo.id)}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-black/30 ${isLiked ? "text-glimmerly-pink" : "text-white"}`}>
                  <Heart fill={isLiked ? "currentColor" : "none"} />
                </div>
                <span className="mt-1 text-xs text-white">
                  {currentVideo.likes + (isLiked ? 1 : 0)}
                </span>
              </div>
              
              <div className="flex cursor-pointer flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white">
                  <MessageCircle />
                </div>
                <span className="mt-1 text-xs text-white">{currentVideo.comments}</span>
              </div>
              
              <div className="flex cursor-pointer flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white">
                  <Share />
                </div>
                <span className="mt-1 text-xs text-white">Condividi</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Video container */}
        <div className="video-container h-full w-full">
          <img 
            src={currentVideo.mediaUrl} 
            alt="Video preview" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/50 p-2 text-white">▶️</div>
          </div>
        </div>
      </div>
    </div>
  );
}
