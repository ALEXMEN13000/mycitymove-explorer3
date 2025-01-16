import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#15202b] text-white mt-auto w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:contact@clubcenter.fr" className="hover:text-blue-200">
                  contact@clubcenter.fr
                </a>
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

          {/* Horaires */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horaires</h3>
            <div className="space-y-2">
              <p>Lundi - Vendredi : 9h - 20h</p>
              <p>Samedi : 10h - 18h</p>
              <p>Dimanche : Fermé</p>
            </div>
          </div>

          {/* Suivez-nous */}
          <div>
            <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-200">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
          <p>© 2024 CLUBCENTER. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}; 