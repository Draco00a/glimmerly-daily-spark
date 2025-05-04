
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CompletedChallenge } from "@/lib/types";
import { sampleCompletedChallenges } from "@/lib/data";

interface ProfileViewProps {
  user: User;
  isCurrentUser?: boolean;
  onBack: () => void;
}

export default function ProfileView({ user, isCurrentUser = false, onBack }: ProfileViewProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "videos" | "photos">("all");
  
  // Filter challenges based on user and media type
  const userChallenges = sampleCompletedChallenges.filter(
    challenge => challenge.userId === user.id
  );
  
  const filteredChallenges = activeTab === "all" 
    ? userChallenges 
    : userChallenges.filter(
        challenge => activeTab === "videos" 
          ? challenge.mediaType === "video" 
          : challenge.mediaType === "photo"
      );

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Profile header */}
      <div className="bg-glimmerly-gradient p-4 pb-16">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            ← Indietro
          </Button>
          
          {!isCurrentUser && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFollowing(!isFollowing)}
              className={isFollowing 
                ? "border-white bg-white text-glimmerly-purple" 
                : "border-white bg-transparent text-white hover:bg-white/20"
              }
            >
              {isFollowing ? "Segui già" : "Segui"}
            </Button>
          )}
        </div>
      </div>
      
      {/* Profile info */}
      <div className="relative -mt-12 px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white">
            <img
              src={user.avatar}
              alt={user.username}
              className="h-full w-full object-cover"
            />
          </div>
          
          <h2 className="mb-1 text-xl font-bold text-glimmerly-purple">
            {user.username}
          </h2>
          
          {user.bio && (
            <p className="mb-4 max-w-xs text-center text-sm text-gray-600">{user.bio}</p>
          )}
          
          <div className="mb-6 flex gap-6 text-center">
            <div>
              <p className="font-bold text-glimmerly-purple">{user.followers}</p>
              <p className="text-xs text-gray-500">Follower</p>
            </div>
            <div>
              <p className="font-bold text-glimmerly-purple">{user.following}</p>
              <p className="text-xs text-gray-500">Seguiti</p>
            </div>
            <div>
              <p className="font-bold text-glimmerly-purple">{user.totalLikes}</p>
              <p className="text-xs text-gray-500">Mi piace</p>
            </div>
            <div>
              <p className="font-bold text-glimmerly-purple">{user.completedGlimmers}</p>
              <p className="text-xs text-gray-500">Glimmers</p>
            </div>
          </div>
          
          {isCurrentUser && (
            <Button
              variant="outline"
              size="sm"
              className="mb-4 border-gray-300"
            >
              Modifica profilo
            </Button>
          )}
        </div>
        
        {/* Content tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "videos" | "photos")}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tutti</TabsTrigger>
            <TabsTrigger value="videos">Video</TabsTrigger>
            <TabsTrigger value="photos">Foto</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-2">
            {filteredChallenges.length > 0 ? (
              <div className="grid grid-cols-3 gap-1">
                {filteredChallenges.map((challenge) => (
                  <div 
                    key={challenge.id} 
                    className="aspect-square overflow-hidden"
                  >
                    <img
                      src={challenge.mediaUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    {challenge.mediaType === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-black/50 p-1 text-xs text-white">▶️</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                <p>Nessun {activeTab === "all" ? "contenuto" : activeTab === "videos" ? "video" : "foto"} disponibile</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
