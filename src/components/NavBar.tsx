
import { Home, Plus, User, Search } from "lucide-react";
import { AppView } from "@/lib/types";

interface NavBarProps {
  activeView: AppView;
  onChangeView: (view: AppView) => void;
}

export default function NavBar({ activeView, onChangeView }: NavBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-around border-t border-gray-800 bg-black">
      <button
        onClick={() => onChangeView("feed")}
        className={`flex flex-1 flex-col items-center py-2 ${
          activeView === "feed" ? "text-white" : "text-gray-500"
        }`}
      >
        <Home size={24} />
        <span className="mt-1 text-xs">Home</span>
      </button>
      
      <button
        onClick={() => onChangeView("friends")}
        className={`flex flex-1 flex-col items-center py-2 ${
          activeView === "friends" ? "text-white" : "text-gray-500"
        }`}
      >
        <Search size={24} />
        <span className="mt-1 text-xs">Scopri</span>
      </button>
      
      <button
        onClick={() => onChangeView("daily")}
        className="flex flex-col items-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-black">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-[#25F4EE] to-[#FE2C55]">
            <Plus size={20} className="text-white" />
          </div>
        </div>
      </button>
      
      <button
        onClick={() => onChangeView("profile")}
        className={`flex flex-1 flex-col items-center py-2 ${
          activeView === "profile" ? "text-white" : "text-gray-500"
        }`}
      >
        <User size={24} />
        <span className="mt-1 text-xs">Profilo</span>
      </button>
    </div>
  );
}
