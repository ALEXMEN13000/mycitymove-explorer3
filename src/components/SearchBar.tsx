import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
      onSearch?.(searchParam);
    }
  }, [onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        navigate(`/activities?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder="Rechercher une activité à Marseille..."
        className="pl-10 h-12 rounded-full border-2 border-gray-200 focus:border-primary"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          if (onSearch) {
            onSearch(e.target.value);
          }
        }}
      />
    </form>
  );
};