
export type GlimmerCategory = 
  | "Social" 
  | "Learning" 
  | "Body" 
  | "Self" 
  | "Wild";

export interface Glimmer {
  id: string;
  title: string;
  description: string;
  category: GlimmerCategory;
  difficultyLevel?: 1 | 2 | 3;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  totalLikes: number;
  completedGlimmers: number;
  selectedCategories: GlimmerCategory[];
}

export interface CompletedChallenge {
  id: string;
  userId: string;
  glimmerId: string;
  mediaType: "video" | "photo";
  mediaUrl: string;
  description?: string;
  category: GlimmerCategory;
  isPublic: boolean;
  timestamp: Date;
  likes: number;
  comments: number;
}

export type AppView = 
  | "onboarding" 
  | "daily" 
  | "feed" 
  | "challenge" 
  | "profile";

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: Date;
}
