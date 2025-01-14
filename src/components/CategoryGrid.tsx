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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-12">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Découvrez vos activités à CLUBCENTER
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explorez notre sélection d'activités variées et trouvez celle qui vous correspond. 
                Sport, musique, bien-être ou art, il y en a pour tous les goûts !
              </p>
            </div>
            <button
              onClick={() => navigate('/activities')}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <List className="h-5 w-5" />
              <span>Toutes les activités</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 group"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="p-4 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                  <category.icon className="h-10 w-10 text-primary" />
                </div>
                <span className="text-lg font-semibold text-gray-900">{category.name}</span>
              </button>
            ))}
          </div>

          <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  {selectedCategory?.name}
                </DialogTitle>
                <DialogDescription className="text-center text-lg">
                  Sélectionnez une activité pour découvrir les détails
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 pt-6">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Activités populaires</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] relative">
                  <img 
                    src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6" 
                    alt="Tennis"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                      Sport
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Cours de Tennis</h3>
                  <p className="text-gray-600 mb-4">Tennis Club Marseille</p>
                  <p className="text-xl font-semibold mb-6">À partir de 25€</p>
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
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                      Musique
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Cours de Piano</h3>
                  <p className="text-gray-600 mb-4">Conservatoire de Marseille</p>
                  <p className="text-xl font-semibold mb-6">35€ par heure</p>
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
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                      Art
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Cours de Théâtre</h3>
                  <p className="text-gray-600 mb-4">Théâtre National de Marseille</p>
                  <p className="text-xl font-semibold mb-6">30€ par séance</p>
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

      <footer className="bg-gray-900 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>contact@clubcenter.fr</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>123 rue des Sports, 75000 Paris</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Horaires</h3>
              <div className="space-y-2">
                <p>Lundi - Vendredi : 9h - 20h</p>
                <p>Samedi : 10h - 18h</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 CLUBCENTER. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};