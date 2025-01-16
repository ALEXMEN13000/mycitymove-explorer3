import { Button } from "@/components/ui/button";
import { UserCircle, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = false; // This will be replaced with actual auth state later

  return (
    <header className="fixed top-0 left-0 right-0 bg-accent shadow-lg z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => navigate("/")} 
          className="text-xl sm:text-2xl font-bold text-white hover:text-blue-200 transition-colors tracking-wider"
        >
          CLUBCENTER
        </button>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-white hover:text-blue-200 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop navigation */}
        <div className="hidden sm:block">
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
                variant="ghost"
                onClick={() => navigate("/register")}
                className="text-white hover:bg-blue-800/50 font-medium px-6 border-2 border-white hover:border-blue-200"
              >
                Inscription
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-accent border-t border-blue-800/50">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/dashboard");
                  setIsMenuOpen(false);
                }}
                className="text-white hover:bg-blue-800/50 font-medium w-full justify-start"
              >
                <UserCircle className="h-5 w-5 mr-2" />
                Mon compte
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:bg-blue-800/50 font-medium w-full justify-start"
                >
                  Connexion
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:bg-blue-800/50 font-medium w-full justify-start border-2 border-white hover:border-blue-200"
                >
                  Inscription
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};