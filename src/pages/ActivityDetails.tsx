import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Euro } from "lucide-react";
import { useState } from "react";

// Exemple de données (à remplacer par des données réelles)
const activityDetails = {
  "cours-de-tennis": {
    title: "Cours de Tennis",
    category: "Sport",
    description: "Le Tennis Club Marseille vous accueille dans un cadre exceptionnel pour apprendre ou perfectionner votre tennis. Nos courts sont entretenus quotidiennement et nos professeurs sont diplômés d'État.",
    imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
    location: {
      name: "Tennis Club Marseille",
      address: "82 Boulevard Michelet, 13008 Marseille"
    },
    courses: [
      { name: "Initiation", level: "Débutant", duration: "1h", maxParticipants: 6 },
      { name: "Perfectionnement", level: "Intermédiaire", duration: "1h30", maxParticipants: 4 },
      { name: "Compétition", level: "Avancé", duration: "2h", maxParticipants: 4 }
    ],
    schedule: {
      monday: "9h - 21h",
      tuesday: "9h - 21h",
      wednesday: "9h - 21h",
      thursday: "9h - 21h",
      friday: "9h - 21h",
      saturday: "9h - 18h",
      sunday: "9h - 12h"
    },
    pricing: {
      session: "25€ / séance",
      monthly: "80€ / mois",
      quarterly: "220€ / trimestre",
      yearly: "750€ / an",
      benefits: [
        "Accès aux courts",
        "Prêt de matériel pour débutants",
        "Participation aux tournois internes",
        "Accès aux vestiaires"
      ]
    }
  },
  "cours-de-piano": {
    title: "Cours de Piano",
    category: "Musique",
    description: "Le Conservatoire de Marseille propose des cours de piano pour tous les niveaux. Nos professeurs expérimentés vous accompagnent dans votre apprentissage musical avec passion et professionnalisme.",
    imageUrl: "https://images.unsplash.com/photo-1552422535-c45813c61732",
    location: {
      name: "Conservatoire National à Rayonnement Régional",
      address: "2 Place Auguste Carli, 13001 Marseille"
    },
    courses: [
      { name: "Éveil musical", level: "Débutant", duration: "45min", maxParticipants: 1 },
      { name: "Formation musicale", level: "Intermédiaire", duration: "1h", maxParticipants: 1 },
      { name: "Perfectionnement", level: "Avancé", duration: "1h30", maxParticipants: 1 }
    ],
    schedule: {
      monday: "10h - 20h",
      tuesday: "10h - 20h",
      wednesday: "9h - 21h",
      thursday: "10h - 20h",
      friday: "10h - 20h",
      saturday: "9h - 17h",
      sunday: "Fermé"
    },
    pricing: {
      session: "35€ / séance",
      monthly: "120€ / mois",
      quarterly: "330€ / trimestre",
      yearly: "1100€ / an",
      benefits: [
        "Cours individuels personnalisés",
        "Accès aux pianos d'étude",
        "Participation aux auditions",
        "Suivi pédagogique personnalisé",
        "Préparation aux examens"
      ]
    }
  },
  "cours-de-theatre": {
    title: "Cours de Théâtre",
    category: "Art",
    description: "Le Théâtre National de Marseille vous ouvre ses portes pour découvrir l'art dramatique. Des cours adaptés à tous les niveaux, dispensés par des comédiens professionnels dans un cadre historique exceptionnel.",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf",
    location: {
      name: "La Criée - Théâtre National de Marseille",
      address: "30 Quai de Rive Neuve, 13007 Marseille"
    },
    courses: [
      { name: "Découverte", level: "Débutant", duration: "2h", maxParticipants: 12 },
      { name: "Interprétation", level: "Intermédiaire", duration: "3h", maxParticipants: 10 },
      { name: "Master class", level: "Avancé", duration: "4h", maxParticipants: 8 }
    ],
    schedule: {
      monday: "14h - 22h",
      tuesday: "14h - 22h",
      wednesday: "14h - 22h",
      thursday: "14h - 22h",
      friday: "14h - 22h",
      saturday: "10h - 18h",
      sunday: "Fermé"
    },
    pricing: {
      session: "30€ / séance",
      monthly: "100€ / mois",
      quarterly: "270€ / trimestre",
      yearly: "900€ / an",
      benefits: [
        "Accès aux répétitions",
        "Participation aux spectacles de fin d'année",
        "Masterclass avec des artistes invités",
        "Accès à la bibliothèque théâtrale",
        "Réductions sur les spectacles du théâtre"
      ]
    }
  },
  "seance-de-yoga": {
    title: "Séance de Yoga",
    category: "Bien-être",
    description: "Le Studio Zen Marseille est un havre de paix dédié à la pratique du yoga. Notre studio lumineux de 150m² offre un cadre idéal pour votre pratique, avec des équipements haut de gamme et une équipe de professeurs certifiés et passionnés. Nous proposons différents styles de yoga pour répondre à tous les besoins et tous les niveaux.",
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
    location: {
      name: "Studio Zen Marseille",
      address: "45 Rue Paradis, 13006 Marseille"
    },
    courses: [
      { name: "Hatha Yoga", level: "Tous niveaux", duration: "1h", maxParticipants: 15, description: "Yoga traditionnel équilibrant corps et esprit" },
      { name: "Vinyasa Flow", level: "Intermédiaire", duration: "1h15", maxParticipants: 12, description: "Yoga dynamique synchronisé avec la respiration" },
      { name: "Yin Yoga", level: "Tous niveaux", duration: "1h30", maxParticipants: 15, description: "Yoga doux et méditatif" },
      { name: "Yoga Prénatal", level: "Spécialisé", duration: "1h", maxParticipants: 8, description: "Adapté aux futures mamans" }
    ],
    schedule: {
      monday: "7h - 21h",
      tuesday: "7h - 21h",
      wednesday: "7h - 21h",
      thursday: "7h - 21h",
      friday: "7h - 20h",
      saturday: "9h - 18h",
      sunday: "9h - 12h"
    },
    pricing: {
      session: "20€ / séance",
      monthly: "90€ / mois (accès illimité)",
      quarterly: "240€ / trimestre",
      yearly: "800€ / an",
      benefits: [
        "Accès illimité à tous les cours collectifs",
        "Prêt de tapis et accessoires de qualité",
        "Vestiaires spacieux avec douches",
        "Espace détente avec thés bio offerts",
        "Séance d'essai offerte",
        "Parking gratuit",
        "Réservation en ligne"
      ]
    }
  },
  "cours-de-peinture": {
    title: "Cours de Peinture",
    category: "Art",
    description: "L'Atelier des Artistes de Marseille est un espace créatif de 200m² baigné de lumière naturelle. Notre atelier accueille artistes débutants et confirmés dans une ambiance chaleureuse et inspirante. Nos professeurs, tous artistes professionnels, vous guident dans l'apprentissage de différentes techniques picturales.",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
    location: {
      name: "Atelier des Artistes",
      address: "15 Rue Sainte, 13001 Marseille"
    },
    courses: [
      { name: "Initiation Techniques Mixtes", level: "Débutant", duration: "2h", maxParticipants: 8, description: "Découverte des bases du dessin et de la peinture" },
      { name: "Peinture à l'Huile", level: "Intermédiaire", duration: "3h", maxParticipants: 6, description: "Techniques classiques de la peinture à l'huile" },
      { name: "Aquarelle", level: "Tous niveaux", duration: "2h", maxParticipants: 8, description: "Maîtrise des techniques de l'aquarelle" },
      { name: "Acrylique Contemporain", level: "Avancé", duration: "3h", maxParticipants: 6, description: "Exploration de l'art contemporain" }
    ],
    schedule: {
      monday: "10h - 19h",
      tuesday: "10h - 19h",
      wednesday: "10h - 19h",
      thursday: "10h - 19h",
      friday: "10h - 19h",
      saturday: "10h - 17h",
      sunday: "Fermé"
    },
    pricing: {
      session: "35€ / séance",
      monthly: "120€ / mois",
      quarterly: "330€ / trimestre",
      yearly: "1100€ / an",
      benefits: [
        "Matériel de base fourni",
        "Chevalet individuel",
        "Espace de stockage pour vos œuvres",
        "Exposition annuelle des travaux d'élèves",
        "Sorties culturelles organisées",
        "Accès à la bibliothèque d'art",
        "Participation aux workshops mensuels"
      ]
    }
  }
};

export const ActivityDetails = () => {
  const { activityId } = useParams();
  const activity = activityDetails[activityId as keyof typeof activityDetails];

  if (!activity) return <div>Activité non trouvée</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="aspect-[21/9] relative rounded-xl overflow-hidden mb-8">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{activity.title}</h1>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{activity.location.name}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="courses">Cours</TabsTrigger>
            <TabsTrigger value="schedule">Horaires</TabsTrigger>
            <TabsTrigger value="pricing">Tarifs</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">À propos du club</h2>
              <p className="text-gray-600">{activity.description}</p>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Localisation</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">{activity.location.name}</h4>
                      <p className="text-gray-600">{activity.location.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Nos cours</h2>
              <div className="grid gap-6">
                {activity.courses.map((course) => (
                  <div key={course.name} className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3">{course.name}</h3>
                    {course.description && (
                      <p className="text-gray-600 mb-4">{course.description}</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Niveau :</span>
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Durée :</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Participants max :</span>
                        <span>{course.maxParticipants}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Horaires d'ouverture</h2>
              <div className="grid gap-4">
                {Object.entries(activity.schedule).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center border-b py-2">
                    <span className="capitalize">{day}</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Tarifs</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Formules</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b py-2">
                      <span>À la séance</span>
                      <span className="font-semibold">{activity.pricing.session}</span>
                    </div>
                    <div className="flex justify-between items-center border-b py-2">
                      <span>Abonnement mensuel</span>
                      <span className="font-semibold">{activity.pricing.monthly}</span>
                    </div>
                    <div className="flex justify-between items-center border-b py-2">
                      <span>Abonnement trimestriel</span>
                      <span className="font-semibold">{activity.pricing.quarterly}</span>
                    </div>
                    <div className="flex justify-between items-center border-b py-2">
                      <span>Abonnement annuel</span>
                      <span className="font-semibold">{activity.pricing.yearly}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ce qui est inclus</h3>
                  <ul className="space-y-2">
                    {activity.pricing.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}; 