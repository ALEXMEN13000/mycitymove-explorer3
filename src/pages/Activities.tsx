import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ActivityCard } from "@/components/ActivityCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";

const activities = [
  {
    title: "Cours de Tennis",
    category: "Sport",
    subcategory: "Tennis",
    location: "Tennis Club Marseille",
    price: 25,
    level: "Débutant",
    time: "10:00",
    dayOfWeek: "Lundi",
    imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
  },
  {
    title: "Cours de Piano",
    category: "Musique",
    subcategory: "Piano",
    location: "Conservatoire de Marseille",
    price: 35,
    level: "Tous niveaux",
    time: "14:00",
    dayOfWeek: "Mardi",
    imageUrl: "https://images.unsplash.com/photo-1552422535-c45813c61732",
  },
  {
    title: "Séance de Yoga",
    category: "Bien-être",
    subcategory: "Yoga",
    location: "Studio Zen Marseille",
    price: 20,
    level: "Tous niveaux",
    time: "09:00",
    dayOfWeek: "Mercredi",
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
  },
  {
    title: "Cours de Théâtre",
    category: "Art",
    subcategory: "Théâtre",
    location: "Théâtre National de Marseille",
    price: 30,
    level: "Débutant",
    time: "16:00",
    dayOfWeek: "Jeudi",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf",
  },
];

const marseille_districts = [
  "1er arrondissement",
  "2ème arrondissement",
  "3ème arrondissement",
  "4ème arrondissement",
  "5ème arrondissement",
  "6ème arrondissement",
  "7ème arrondissement",
  "8ème arrondissement",
  "9ème arrondissement",
  "10ème arrondissement",
  "11ème arrondissement",
  "12ème arrondissement",
  "13ème arrondissement",
  "14ème arrondissement",
  "15ème arrondissement",
  "16ème arrondissement",
];

const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const Activities = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: "",
    level: "",
    maxPrice: 100,
    time: "",
    dayOfWeek: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const search = searchParams.get("search");

    if (search) {
      setSearchQuery(search);
    }
    if (category && subcategory) {
      console.log(`Filtering by category: ${category} and subcategory: ${subcategory}`);
    }
  }, [searchParams]);

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = !searchQuery || 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = !filters.location || activity.location === filters.location;
    const matchesLevel = !filters.level || activity.level === filters.level;
    const matchesPrice = activity.price <= filters.maxPrice;
    const matchesTime = !filters.time || activity.time === filters.time;
    const matchesDayOfWeek = !filters.dayOfWeek || activity.dayOfWeek === filters.dayOfWeek;
    
    const categoryFromUrl = searchParams.get("category");
    const subcategoryFromUrl = searchParams.get("subcategory");
    const matchesCategory = !categoryFromUrl || activity.category.toLowerCase() === categoryFromUrl.toLowerCase();
    const matchesSubcategory = !subcategoryFromUrl || activity.subcategory.toLowerCase() === subcategoryFromUrl.toLowerCase();

    return matchesSearch && matchesLocation && matchesLevel && matchesPrice && 
           matchesTime && matchesDayOfWeek && matchesCategory && matchesSubcategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div>
            <Label>Arrondissement</Label>
            <Select onValueChange={(value) => setFilters({ ...filters, location: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un arrondissement" />
              </SelectTrigger>
              <SelectContent>
                {marseille_districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Niveau</Label>
            <Select onValueChange={(value) => setFilters({ ...filters, level: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Débutant">Débutant</SelectItem>
                <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                <SelectItem value="Avancé">Avancé</SelectItem>
                <SelectItem value="Tous niveaux">Tous niveaux</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Jour de la semaine</Label>
            <Select onValueChange={(value) => setFilters({ ...filters, dayOfWeek: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un jour" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Prix maximum: {filters.maxPrice}€</Label>
            <Slider
              value={[filters.maxPrice]}
              onValueChange={([value]) => setFilters({ ...filters, maxPrice: value })}
              max={100}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Horaire</Label>
            <Select onValueChange={(value) => setFilters({ ...filters, time: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un horaire" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(activities.map((a) => a.time))).map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.title}
              title={activity.title}
              category={activity.category}
              location={activity.location}
              price={`${activity.price}€`}
              imageUrl={activity.imageUrl}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Activities;