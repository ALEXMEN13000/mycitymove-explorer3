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
  {
    title: "Cours de Natation",
    category: "Sport",
    subcategory: "Natation",
    location: "Piscine Municipale Marseille",
    price: 15,
    level: "Débutant",
    time: "17:00",
    dayOfWeek: "Lundi",
    imageUrl: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50",
  },
  {
    title: "Cours de Guitare",
    category: "Musique",
    subcategory: "Guitare",
    location: "École de Musique Marseille",
    price: 30,
    level: "Intermédiaire",
    time: "18:00",
    dayOfWeek: "Mardi",
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1",
  },
  {
    title: "Cours de Danse Classique",
    category: "Danse",
    subcategory: "Classique",
    location: "Studio de Danse Marseille",
    price: 28,
    level: "Débutant",
    time: "15:00",
    dayOfWeek: "Mercredi",
    imageUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434",
  },
  {
    title: "Atelier Peinture",
    category: "Art",
    subcategory: "Peinture",
    location: "Atelier des Arts Marseille",
    price: 40,
    level: "Tous niveaux",
    time: "14:00",
    dayOfWeek: "Samedi",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
  },
  {
    title: "Cours de Boxe",
    category: "Sport",
    subcategory: "Boxe",
    location: "Club de Boxe Marseille",
    price: 22,
    level: "Débutant",
    time: "19:00",
    dayOfWeek: "Vendredi",
    imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed",
  },
  {
    title: "Méditation Guidée",
    category: "Bien-être",
    subcategory: "Méditation",
    location: "Centre Mindfulness Marseille",
    price: 15,
    level: "Tous niveaux",
    time: "08:00",
    dayOfWeek: "Dimanche",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  },
  {
    title: "Cours de Football",
    category: "Sport",
    subcategory: "Football",
    location: "Stade Vélodrome",
    price: 18,
    level: "Tous niveaux",
    time: "16:00",
    dayOfWeek: "Mercredi",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
  },
  {
    title: "Atelier Photographie",
    category: "Art",
    subcategory: "Photographie",
    location: "Studio Photo Marseille",
    price: 45,
    level: "Intermédiaire",
    time: "10:00",
    dayOfWeek: "Samedi",
    imageUrl: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
  },
  {
    title: "Cours de Violon",
    category: "Musique",
    subcategory: "Violon",
    location: "Conservatoire de Marseille",
    price: 40,
    level: "Débutant",
    time: "16:30",
    dayOfWeek: "Jeudi",
    imageUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec",
  },
  {
    title: "Pilates",
    category: "Bien-être",
    subcategory: "Pilates",
    location: "Centre Fitness Marseille",
    price: 25,
    level: "Tous niveaux",
    time: "12:00",
    dayOfWeek: "Mardi",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
  },
  {
    title: "Cours de Basketball",
    category: "Sport",
    subcategory: "Basketball",
    location: "Palais des Sports Marseille",
    price: 20,
    level: "Débutant",
    time: "17:30",
    dayOfWeek: "Vendredi",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
  }
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

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/cours\s+de\s+/g, 'cours ')
    .replace(/séance\s+de\s+/g, 'séance ')
    .replace(/atelier\s+de\s+/g, 'atelier ')
    .replace(/\s+de\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

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

  const matchesSearchTerms = (activity: any, searchTerms: string[]) => {
    const activityText = normalizeText(`${activity.title} ${activity.category} ${activity.subcategory} ${activity.location}`);
    
    const hasPrefix = searchTerms.some(term => ["cours", "séance", "atelier"].includes(term));
    if (hasPrefix) {
      const activityType = searchTerms.find(term => !["cours", "séance", "atelier"].includes(term));
      if (activityType) {
        return normalizeText(activity.title).includes(activityType) ||
               normalizeText(activity.subcategory).includes(activityType);
      }
    }
    
    return searchTerms.every(term => activityText.includes(term));
  };

  const filteredActivities = activities.filter((activity) => {
    const searchTerms = searchQuery.toLowerCase()
      .split(' ')
      .filter(term => term !== 'de' && term.length > 0);
    
    const matchesSearch = !searchQuery || matchesSearchTerms(activity, searchTerms);

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