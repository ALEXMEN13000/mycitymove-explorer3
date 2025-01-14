import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const clubRegisterSchema = z.object({
  clubName: z.string().min(2, "Le nom du club doit contenir au moins 2 caractères"),
  address: z.string().min(10, "Veuillez entrer une adresse complète"),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide"),
  email: z.string().email("Email professionnel invalide"),
  description: z.string().min(50, "La description doit contenir au moins 50 caractères"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ClubRegisterForm = z.infer<typeof clubRegisterSchema>;

const ClubRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClubRegisterForm>({
    resolver: zodResolver(clubRegisterSchema),
  });

  const onSubmit = async (data: ClubRegisterForm) => {
    try {
      // TODO: Implémenter l'appel API d'inscription club
      console.log("Tentative d'inscription club avec:", data);
      
      // Simulation d'une requête API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate("/club-login");
    } catch (error) {
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-primary">
                Inscription Club
              </CardTitle>
              <CardDescription className="text-center">
                Inscrivez votre club sur notre plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clubName">Nom du club</Label>
                  <Input
                    id="clubName"
                    type="text"
                    placeholder="Club Sportif Example"
                    {...register("clubName")}
                    aria-invalid={!!errors.clubName}
                  />
                  {errors.clubName && (
                    <p className="text-sm text-red-500">{errors.clubName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 rue Example, Ville"
                    {...register("address")}
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+33 1 23 45 67 89"
                    {...register("phone")}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="club@exemple.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description du club</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez votre club, ses activités, ses installations..."
                    className="min-h-[100px]"
                    {...register("description")}
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Inscription en cours..." : "Inscrire mon club"}
                </Button>
              </form>
              <div className="space-y-2 text-sm text-center text-gray-600">
                <p>
                  Déjà un compte club ?{" "}
                  <a href="/club-login" className="text-primary hover:underline">
                    Se connecter
                  </a>
                </p>
                <p>
                  <a href="/register" className="text-primary hover:underline">
                    Inscription membre
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ClubRegister; 