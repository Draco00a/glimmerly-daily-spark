
import { Home, Plus, User } from "lucide-react";
import { AppView } from "@/lib/types";

interface NavBarProps {
  activeView: AppView;
  onChangeView: (view: AppView) => void;
}

export default function NavBar({ activeView, onChangeView }: NavBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-around border-t bg-white shadow-lg">
      <button
        onClick={() => onChangeView("feed")}
        className={`flex flex-1 flex-col items-center py-2 ${
          activeView === "feed" ? "text-glimmerly-purple" : "text-gray-500"
        }`}
      >
        <Home size={24} />
        <span className="mt-1 text-xs">Per Te</span>
      </button>
      
      <button
        onClick={() => onChangeView("daily")}
        className="flex -translate-y-4 flex-col items-center rounded-full bg-glimmerly-gradient p-3 text-white shadow-lg"
      >
        <Plus size={24} />
        <span className="mt-1 text-xs">Glimmer</span>
      </button>
      
      <button
        onClick={() => onChangeView("profile")}
        className={`flex flex-1 flex-col items-center py-2 ${
          activeView === "profile" ? "text-glimmerly-purple" : "text-gray-500"
        }`}
      >
        <User size={24} />
        <span className="mt-1 text-xs">Profilo</span>
      </button>
    </div>
  );
}
