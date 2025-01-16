import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, Dumbbell, Music, Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const categories = [
  {
    name: "Sport",
    icon: Dumbbell,
    subcategories: ["Tennis", "Football", "Basketball", "Natation", "Course à pied", "Autre"],
  },
  {
    name: "Musique",
    icon: Music,
    subcategories: ["Piano", "Guitare", "Chant", "Batterie", "Violon", "Autre"],
  },
  {
    name: "Bien-être",
    icon: Heart,
    subcategories: ["Yoga", "Méditation", "Sophrologie", "Massage", "Relaxation", "Autre"],
  },
  {
    name: "Art",
    icon: Palette,
    subcategories: ["Peinture", "Photographie", "Dessin", "Cuisine", "Théâtre", "Autre"],
  },
];

export const CategoryGrid = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);

  const handleCategoryClick = (category: typeof categories[0]) => {
    setSelectedCategory(category);
  };

  const handleSubcategoryClick = (subcategory: string) => {
    navigate(`/activities?category=${selectedCategory?.name}&subcategory=${subcategory}`);
    setSelectedCategory(null);
  };

  const handleDetailsClick = (title: string) => {
    const urlId = title.toLowerCase()
      .replace(/séance de/g, 'seance-de')
      .replace(/cours de/g, 'cours-de')
      .replace(/ /g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    navigate(`/activity/${urlId}`);
  };

  return (
    <div className="flex flex-col">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 sm:mb-12">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Découvrez vos activités à CLUBCENTER
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl">
                Explorez notre sélection d'activités variées et trouvez celle qui vous correspond. 
                Sport, musique, bien-être ou art, il y en a pour tous les goûts !
              </p>
            </div>
            <button
              onClick={() => navigate('/activities')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              <List className="h-5 w-5" />
              <span>Toutes les activités</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 group"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="p-4 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                  <category.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-gray-900">{category.name}</span>
              </button>
            ))}
          </div>

          <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
            <DialogContent className="sm:max-w-lg mx-4">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
                  {selectedCategory?.name}
                </DialogTitle>
                <DialogDescription className="text-center text-base sm:text-lg">
                  Sélectionnez une activité pour découvrir les détails
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6">
                {selectedCategory?.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    className="p-4 bg-white border-2 border-primary/10 text-primary rounded-lg hover:bg-primary/5 transition-all duration-200 text-left font-medium hover:border-primary/30"
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Activités populaires</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] relative">
                  <img 
                    src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6" 
                    alt="Tennis"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                      Sport
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Cours de Tennis</h3>
                  <p className="text-gray-600 mb-4">Tennis Club Marseille</p>
                  <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">À partir de 25€</p>
                  <button 
                    className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => handleDetailsClick("Cours de Tennis")}
                  >
                    Voir les détails
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] relative">
                  <img 
                    src="https://images.unsplash.com/photo-1552422535-c45813c61732" 
                    alt="Piano"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                      Musique
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Cours de Piano</h3>
                  <p className="text-gray-600 mb-4">Conservatoire de Marseille</p>
                  <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">35€ par heure</p>
                  <button 
                    className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => handleDetailsClick("Cours de Piano")}
                  >
                    Voir les détails
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] relative">
                  <img 
                    src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf" 
                    alt="Théâtre"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                      Art
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Cours de Théâtre</h3>
                  <p className="text-gray-600 mb-4">Théâtre National de Marseille</p>
                  <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">30€ par séance</p>
                  <button 
                    className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => handleDetailsClick("Cours de Théâtre")}
                  >
                    Voir les détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};