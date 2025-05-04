import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompletedChallenge, GlimmerCategory } from "@/lib/types";
import { categoryInfo, sampleCompletedChallenges, sampleUsers } from "@/lib/data";
import { Heart, MessageCircle, Share, Music, User, BookmarkIcon } from "lucide-react";

interface FeedViewProps {
  onProfileClick: (userId: string) => void;
}

export default function FeedView({ onProfileClick }: FeedViewProps) {
  const [activeTab, setActiveTab] = useState<"for-you" | "friends" | "popular">("for-you");
  const [activeCategory, setActiveCategory] = useState<GlimmerCategory | "all">("all");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  
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
      setIsVideoPlaying(true);
    }
  };
  
  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoPlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
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
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-black">
      {/* Top navigation bar */}
      <div className="z-10 bg-black px-4 pt-3 pb-1">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => {
            setActiveTab(value as "for-you" | "friends" | "popular");
            setCurrentVideoIndex(0);
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-transparent">
            <TabsTrigger 
              value="for-you" 
              className="text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:bg-transparent"
            >
              Per Te
            </TabsTrigger>
            <TabsTrigger 
              value="friends" 
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:bg-transparent"
            >
              Seguiti
            </TabsTrigger>
            <TabsTrigger 
              value="popular" 
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:bg-transparent"
            >
              LIVE
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="relative flex-grow overflow-hidden bg-black">
        {/* Video container */}
        <div className="absolute inset-0 touch-none">
          <div 
            className="h-full w-full"
            onClick={toggleVideoPlay}
            onTouchStart={(e) => {
              const touchStartY = e.touches[0].clientY;
              
              const handleTouchEnd = (endEvent: TouchEvent) => {
                const touchEndY = endEvent.changedTouches[0].clientY;
                const deltaY = touchEndY - touchStartY;
                
                if (Math.abs(deltaY) < 20) {
                  toggleVideoPlay();
                  return;
                }
                
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
            <img 
              src={currentVideo.mediaUrl} 
              alt="Video preview" 
              className="h-full w-full object-cover"
            />
            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black/40 p-4 text-white">▶️</div>
              </div>
            )}
          </div>
        </div>
        
        {/* TikTok-style overlay UI */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Video progress indicator */}
          <div className="flex w-full justify-center mt-2">
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

          <div className="absolute bottom-0 left-0 right-0 flex px-4 pb-24">
            {/* Left side - user info and description */}
            <div className="flex-grow">
              <div 
                className="mb-2 flex items-center gap-2 pointer-events-auto cursor-pointer"
                onClick={() => onProfileClick(user.id)}
              >
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="h-12 w-12 rounded-full border-2 border-white"
                />
                <span className="font-semibold text-white">@{user.username}</span>
                <Button 
                  size="sm" 
                  className="h-7 rounded-full bg-[#FE2C55] text-xs text-white hover:bg-[#FF365E] ml-2"
                >
                  Segui
                </Button>
              </div>
              
              <p className="mb-3 text-sm text-white max-w-[80%]">{currentVideo.description}</p>
              
              {/* Music info like TikTok */}
              <div className="flex items-center gap-2 mb-3 animate-marquee-slow pointer-events-auto">
                <Music size={16} className="text-white" />
                <div className="overflow-hidden whitespace-nowrap max-w-[180px]">
                  <p className="text-sm text-white animate-marquee-slow">
                    Suono originale - {user.username}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side - interaction buttons */}
            <div className="flex flex-col items-center gap-6 pointer-events-auto mr-1">
              <div className="flex cursor-pointer flex-col items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white mb-1">
                  <img 
                    src={user.avatar} 
                    alt="Avatar" 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FE2C55] text-white text-xs mb-2">+</div>
              </div>
              
              <div 
                className="flex cursor-pointer flex-col items-center"
                onClick={() => handleLike(currentVideo.id)}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isLiked ? "text-[#FE2C55]" : "text-white"}`}>
                  <Heart size={35} fill={isLiked ? "currentColor" : "none"} />
                </div>
                <span className="mt-1 text-xs text-white">
                  {currentVideo.likes + (isLiked ? 1 : 0)}
                </span>
              </div>
              
              <div className="flex cursor-pointer flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-white">
                  <MessageCircle size={35} />
                </div>
                <span className="mt-1 text-xs text-white">{currentVideo.comments}</span>
              </div>
              
              <div className="flex cursor-pointer flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-white">
                  <BookmarkIcon size={35} />
                </div>
                <span className="mt-1 text-xs text-white">Salva</span>
              </div>
              
              <div className="flex cursor-pointer flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-white">
                  <Share size={35} />
                </div>
                <span className="mt-1 text-xs text-white">Condividi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
