import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const clubLoginSchema = z.object({
  email: z.string().email("Email professionnel invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type ClubLoginForm = z.infer<typeof clubLoginSchema>;

const ClubLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClubLoginForm>({
    resolver: zodResolver(clubLoginSchema),
  });

  const onSubmit = async (data: ClubLoginForm) => {
    try {
      // TODO: Implémenter l'appel API de connexion club
      console.log("Tentative de connexion club avec:", data);
      
      // Simulation d'une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Connexion réussie !");
      navigate("/club-dashboard"); // Redirection vers le dashboard club
    } catch (error) {
      toast.error("Erreur lors de la connexion. Veuillez réessayer.");
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
                Connexion Club
              </CardTitle>
              <CardDescription className="text-center">
                Espace réservé aux clubs partenaires
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
              <div className="space-y-2 text-sm text-center text-gray-600">
                <p>
                  Pas encore de compte club ?{" "}
                  <a href="/club-register" className="text-primary hover:underline">
                    Inscrire mon club
                  </a>
                </p>
                <p>
                  <a href="/login" className="text-primary hover:underline">
                    Connexion membre
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

export default ClubLogin; 