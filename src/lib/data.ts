
import { CompletedChallenge, Glimmer, GlimmerCategory, User } from "./types";

// Sample glimmers for each category
export const glimmers: Glimmer[] = [
  // Social Glimmers
  {
    id: "s1",
    title: "Talk to a stranger",
    description: "Approach someone you don't know and start a conversation. Share what you learned!",
    category: "Social",
    difficultyLevel: 3
  },
  {
    id: "s2",
    title: "Voice note to a friend",
    description: "Send a sincere voice note to a friend expressing why you appreciate them.",
    category: "Social",
    difficultyLevel: 1
  },
  {
    id: "s3",
    title: "Deep question",
    description: "Ask someone a profound question and share their answer (with their permission).",
    category: "Social",
    difficultyLevel: 2
  },
  
  // Learning Glimmers
  {
    id: "l1",
    title: "15-second teacher",
    description: "Watch an educational video and explain what you learned in 15 seconds.",
    category: "Learning",
    difficultyLevel: 2
  },
  {
    id: "l2",
    title: "Science fact",
    description: "Research and share a weird scientific fact that most people don't know.",
    category: "Learning",
    difficultyLevel: 1
  },
  {
    id: "l3",
    title: "Language explorer",
    description: "Learn to say 'hello' in 5 different languages and demonstrate them.",
    category: "Learning",
    difficultyLevel: 2
  },
  
  // Body Glimmers
  {
    id: "b1",
    title: "Unusual squats",
    description: "Do 10 squats in an unusual location. The more unexpected, the better!",
    category: "Body",
    difficultyLevel: 1
  },
  {
    id: "b2",
    title: "Morning stretch",
    description: "Film your morning stretch routine in front of a mirror.",
    category: "Body",
    difficultyLevel: 1
  },
  {
    id: "b3",
    title: "Animal mimicry",
    description: "Imitate today's animal (choose your favorite) for 10 seconds.",
    category: "Body",
    difficultyLevel: 2
  },
  
  // Self Glimmers
  {
    id: "se1",
    title: "Life achievements",
    description: "List 3 accomplishments from your life that you're proud of.",
    category: "Self",
    difficultyLevel: 2
  },
  {
    id: "se2",
    title: "Self-love letter",
    description: "Write and read aloud one thing you love about yourself.",
    category: "Self",
    difficultyLevel: 2
  },
  {
    id: "se3",
    title: "Favorite space",
    description: "Show your favorite corner of your home and explain why it matters to you.",
    category: "Self",
    difficultyLevel: 1
  },
  
  // Wild Glimmers
  {
    id: "w1",
    title: "Pineapple dance",
    description: "Create and perform the 'pineapple dance' - be as creative as possible!",
    category: "Wild",
    difficultyLevel: 3
  },
  {
    id: "w2",
    title: "Object faces",
    description: "Transform everyday objects into a face - the funnier, the better!",
    category: "Wild",
    difficultyLevel: 1
  },
  {
    id: "w3",
    title: "Motivational shout",
    description: "Shout (gracefully) a motivational mantra from a balcony or open space.",
    category: "Wild",
    difficultyLevel: 3
  }
];

// Mock current user
export const currentUser: User = {
  id: "u1",
  username: "glimmerUser",
  avatar: "https://i.pravatar.cc/150?img=32",
  bio: "Living life one Glimmer at a time ✨",
  followers: 142,
  following: 87,
  totalLikes: 1254,
  completedGlimmers: 42,
  selectedCategories: [] // To be filled during onboarding
};

// Sample completed challenges
export const sampleCompletedChallenges: CompletedChallenge[] = [
  {
    id: "cc1",
    userId: "u2",
    glimmerId: "w1",
    mediaType: "video",
    mediaUrl: "https://i.pravatar.cc/300?img=28", // This would be a video URL in reality
    description: "I never thought I'd be dancing like a pineapple in public! 🍍",
    category: "Wild",
    isPublic: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 73,
    comments: 12
  },
  {
    id: "cc2",
    userId: "u3",
    glimmerId: "s1",
    mediaType: "video",
    mediaUrl: "https://i.pravatar.cc/300?img=25", // This would be a video URL in reality
    description: "Met someone new today. We talked about our favorite books!",
    category: "Social",
    isPublic: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    likes: 42,
    comments: 7
  },
  {
    id: "cc3",
    userId: "u4",
    glimmerId: "b2",
    mediaType: "video",
    mediaUrl: "https://i.pravatar.cc/300?img=23", // This would be a video URL in reality
    description: "Morning stretches really help me start the day right!",
    category: "Body",
    isPublic: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
    likes: 31,
    comments: 4
  },
  {
    id: "cc4",
    userId: "u5",
    glimmerId: "l2",
    mediaType: "video",
    mediaUrl: "https://i.pravatar.cc/300?img=5", // This would be a video URL in reality
    description: "Did you know octopuses have 3 hearts?! Marine biology is wild!",
    category: "Learning",
    isPublic: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
    likes: 89,
    comments: 15
  },
  {
    id: "cc5",
    userId: "u6",
    glimmerId: "se3",
    mediaType: "video", 
    mediaUrl: "https://i.pravatar.cc/300?img=9", // This would be a video URL in reality
    description: "My reading nook - where I escape from the world every night.",
    category: "Self",
    isPublic: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 14), // 14 hours ago
    likes: 56,
    comments: 9
  }
];

// Mock users for the feed
export const sampleUsers: Record<string, User> = {
  "u2": {
    id: "u2",
    username: "dancingQueen",
    avatar: "https://i.pravatar.cc/150?img=28",
    followers: 354,
    following: 127,
    totalLikes: 3254,
    completedGlimmers: 78,
    selectedCategories: ["Wild", "Body", "Social"]
  },
  "u3": {
    id: "u3",
    username: "bookworm",
    avatar: "https://i.pravatar.cc/150?img=25",
    followers: 142,
    following: 90,
    totalLikes: 1587,
    completedGlimmers: 65,
    selectedCategories: ["Social", "Learning", "Self"]
  },
  "u4": {
    id: "u4",
    username: "yogamaster",
    avatar: "https://i.pravatar.cc/150?img=23",
    followers: 726,
    following: 103,
    totalLikes: 8543,
    completedGlimmers: 182,
    selectedCategories: ["Body", "Self"]
  },
  "u5": {
    id: "u5",
    username: "scienceGeek",
    avatar: "https://i.pravatar.cc/150?img=5",
    followers: 289,
    following: 76,
    totalLikes: 4271,
    completedGlimmers: 96,
    selectedCategories: ["Learning", "Social"]
  },
  "u6": {
    id: "u6",
    username: "bookNookLover",
    avatar: "https://i.pravatar.cc/150?img=9",
    followers: 183,
    following: 201,
    totalLikes: 2756,
    completedGlimmers: 72,
    selectedCategories: ["Self", "Learning"]
  }
};

// Get random glimmer
export function getRandomGlimmer(categories: GlimmerCategory[]): Glimmer {
  if (categories.length === 0) {
    const randomIndex = Math.floor(Math.random() * glimmers.length);
    return glimmers[randomIndex];
  }
  
  const filteredGlimmers = glimmers.filter(g => categories.includes(g.category));
  const randomIndex = Math.floor(Math.random() * filteredGlimmers.length);
  return filteredGlimmers.length > 0 ? filteredGlimmers[randomIndex] : glimmers[0];
}

// Category information
export const categoryInfo: Record<GlimmerCategory, { title: string; description: string; emoji: string }> = {
  "Social": {
    title: "Social Glimmers",
    description: "Connect with others and build meaningful relationships",
    emoji: "👥"
  },
  "Learning": {
    title: "Learning Glimmers",
    description: "Expand your knowledge and learn something new",
    emoji: "🧠"
  },
  "Body": {
    title: "Body Glimmers",
    description: "Move your body and improve physical wellbeing",
    emoji: "💪"
  },
  "Self": {
    title: "Self Glimmers",
    description: "Foster self-awareness and personal growth",
    emoji: "🌱"
  },
  "Wild": {
    title: "Wild Glimmers",
    description: "Get creative, be bold, and have fun",
    emoji: "🎭"
  }
}
