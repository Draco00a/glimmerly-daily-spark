
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
            <TabsTrigger value="for-you" className="text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:bg-transparent">Per Te</TabsTrigger>
            <TabsTrigger value="friends" className="text-gray-300 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:bg-transparent">Amici</TabsTrigger>
            <TabsTrigger value="popular" className="text-gray-300 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:bg-transparent">Popolari</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="my-2 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            size="sm"
            variant={activeCategory === "all" ? "default" : "outline"}
            className={`rounded-full text-xs py-1 px-3 ${activeCategory === "all" ? "bg-white text-black hover:bg-gray-200" : "border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800"}`}
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
              className={`rounded-full text-xs py-1 px-3 ${activeCategory === category ? "bg-white text-black hover:bg-gray-200" : "border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800"}`}
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
                  className="h-7 rounded-full bg-red-500 text-xs text-white hover:bg-red-600 ml-2"
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
              
              <div className="mb-4 inline-block rounded-full bg-black/40 px-3 py-1 text-xs text-white">
                {categoryInfo[currentVideo.category].emoji} {currentVideo.category}
              </div>
            </div>
            
            {/* Right side - interaction buttons */}
            <div className="flex flex-col items-center gap-5 pointer-events-auto">
              <div 
                className="flex cursor-pointer flex-col items-center"
                onClick={() => handleLike(currentVideo.id)}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-black/40 ${isLiked ? "text-red-500" : "text-white"}`}>
                  <Heart size={28} fill={isLiked ? "currentColor" : "none"} />
                </div>
                <span className="mt-1 text-xs text-white">
                  {currentVideo.likes + (isLiked ? 1 : 0)}
                </span>
              </div>
              
              <div className="flex cursor-pointer flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white">
                  <MessageCircle size={28} />
                </div>
                <span className="mt-1 text-xs text-white">{currentVideo.comments}</span>
              </div>
              
              <div className="flex cursor-pointer flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white">
                  <BookmarkIcon size={28} />
                </div>
                <span className="mt-1 text-xs text-white">Salva</span>
              </div>
              
              <div className="flex cursor-pointer flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white">
                  <Share size={28} />
                </div>
                <span className="mt-1 text-xs text-white">Condividi</span>
              </div>
              
              <div className="flex cursor-pointer flex-col items-center mt-2">
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                  <img 
                    src={user.avatar} 
                    alt="Avatar" 
                    className="h-full w-full object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
