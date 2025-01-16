import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Trouvez votre prochaine activité à Marseille
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Des milliers d'activités sportives et culturelles vous attendent
          </p>
          <SearchBar />
        </div>
        <CategoryGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;