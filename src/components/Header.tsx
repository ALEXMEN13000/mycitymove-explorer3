import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; // This will be replaced with actual auth state later

  return (
    <header className="fixed top-0 left-0 right-0 bg-accent shadow-lg z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => navigate("/")} 
          className="text-2xl font-bold text-white hover:text-blue-200 transition-colors tracking-wider"
        >
          CLUBCENTER
        </button>
        {isAuthenticated ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-blue-800/50"
            onClick={() => navigate("/dashboard")}
          >
            <UserCircle className="h-6 w-6" />
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="text-white hover:bg-blue-800/50 font-medium px-6"
            >
              Connexion
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/register")}
              className="text-white border-2 border-white hover:bg-blue-800/50 hover:border-blue-200 font-semibold px-6"
            >
              Inscription
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};