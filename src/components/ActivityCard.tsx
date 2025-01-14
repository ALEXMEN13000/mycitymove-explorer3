import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ActivityCardProps {
  id?: string;
  title: string;
  category: string;
  location: string;
  price: string;
  imageUrl: string;
}

export const ActivityCard = ({ id, title, category, location, price, imageUrl }: ActivityCardProps) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    const urlId = title.toLowerCase()
      .replace(/séance de /g, 'seance-de-')
      .replace(/cours de /g, 'cours-de-')
      .replace(/ /g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    navigate(`/activity/${urlId}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
        />
        <Badge className="absolute top-3 right-3 bg-accent">{category}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="font-medium mt-2">{price}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleDetailsClick}>
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
};