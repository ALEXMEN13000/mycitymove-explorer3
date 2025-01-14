import { Header } from "@/components/Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-2xl font-bold mb-8">Mon espace</h1>
        <p className="text-muted-foreground">
          Connectez-vous pour accéder à votre espace personnel.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;