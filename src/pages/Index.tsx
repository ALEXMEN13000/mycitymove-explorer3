import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Découvrez les meilleures activités à Marseille
        </h1>
        <div className="mb-12">
          <SearchBar />
        </div>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <CategoryGrid />
        </section>
      </main>
    </div>
  );
};

export default Index;