
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Onboarding from "@/components/Onboarding";
import DailyGlimmer from "@/components/DailyGlimmer";
import ChallengeCard from "@/components/ChallengeCard";
import FeedView from "@/components/FeedView";
import ProfileView from "@/components/ProfileView";
import NavBar from "@/components/NavBar";
import { AppView, GlimmerCategory, User } from "@/lib/types";
import { currentUser, getRandomGlimmer, sampleUsers } from "@/lib/data";

// Calculate time remaining for daily challenge
function getTimeRemaining(): string {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  
  const diff = endOfDay.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeView, setActiveView] = useState<AppView>("onboarding");
  const [selectedCategories, setSelectedCategories] = useState<GlimmerCategory[]>([]);
  const [dailyGlimmer, setDailyGlimmer] = useState(getRandomGlimmer([]));
  const [remainingSkips, setRemainingSkips] = useState(1);
  const [viewingUser, setViewingUser] = useState<User>(currentUser);

  // Initialize user preferences
  useEffect(() => {
    // In a real app, we would fetch these from local storage or a backend
    const savedOnboarding = localStorage.getItem("glimmerly-onboarding");
    const savedCategories = localStorage.getItem("glimmerly-categories");
    
    if (savedOnboarding === "completed" && savedCategories) {
      const categories = JSON.parse(savedCategories) as GlimmerCategory[];
      setSelectedCategories(categories);
      setHasCompletedOnboarding(true);
      setActiveView("daily");
      setDailyGlimmer(getRandomGlimmer(categories));
    }
  }, []);

  const handleCompleteOnboarding = (categories: GlimmerCategory[]) => {
    setSelectedCategories(categories);
    setHasCompletedOnboarding(true);
    setActiveView("daily");
    setDailyGlimmer(getRandomGlimmer(categories));
    
    // Save preferences
    localStorage.setItem("glimmerly-onboarding", "completed");
    localStorage.setItem("glimmerly-categories", JSON.stringify(categories));
    
    toast.success("Benvenuto su Glimmerly!");
  };

  const handleSkipChallenge = () => {
    if (remainingSkips > 0) {
      const newGlimmer = getRandomGlimmer(selectedCategories);
      setDailyGlimmer(newGlimmer);
      setRemainingSkips(remainingSkips - 1);
      toast("Hai saltato questa sfida");
    }
  };

  const handleCompleteChallenge = () => {
    setActiveView("challenge");
  };

  const handleSubmitChallenge = () => {
    toast.success("Sfida completata con successo!");
    setActiveView("feed");
    
    // In a real app, we would update user stats and send to backend
  };

  const handleViewProfile = (userId: string) => {
    setViewingUser(userId === currentUser.id ? currentUser : sampleUsers[userId]);
    setActiveView("profile");
  };

  // Render content based on active view
  const renderContent = () => {
    if (!hasCompletedOnboarding) {
      return <Onboarding onComplete={handleCompleteOnboarding} />;
    }

    switch (activeView) {
      case "daily":
        return (
          <DailyGlimmer
            glimmer={dailyGlimmer}
            onComplete={handleCompleteChallenge}
            onSkip={handleSkipChallenge}
            remainingSkips={remainingSkips}
            timeRemaining={getTimeRemaining()}
          />
        );
      case "challenge":
        return (
          <ChallengeCard
            glimmer={dailyGlimmer}
            onSubmit={handleSubmitChallenge}
            onCancel={() => setActiveView("daily")}
          />
        );
      case "feed":
        return <FeedView onProfileClick={handleViewProfile} />;
      case "profile":
        return (
          <ProfileView
            user={viewingUser}
            isCurrentUser={viewingUser.id === currentUser.id}
            onBack={() => setActiveView("feed")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
      
      {hasCompletedOnboarding && activeView !== "challenge" && (
        <NavBar activeView={activeView} onChangeView={setActiveView} />
      )}
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
