import coffeeTable from "@/assets/coffee_table.JPG";
import shoeRack from "@/assets/shoe_rack.JPG";
import tvStand from "@/assets/tv_stand.JPG";
import closet from "@/assets/closet.JPG";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: CategorySlug;
  description: string;
};

export type CategorySlug = "tv-stands" | "closets" | "shoe-racks" | "coffee-tables";

export const categories: { slug: CategorySlug; name: string; tagline: string; image: string }[] = [
  { slug: "coffee-tables", name: "Coffee Tables", tagline: "Statement centerpieces for your living space", image: coffeeTable },
  { slug: "tv-stands", name: "TV Stands", tagline: "Modern entertainment units crafted to last", image: tvStand },
  { slug: "closets", name: "Closets", tagline: "Smart storage with elegant proportions", image: closet },
  { slug: "shoe-racks", name: "Shoe Racks", tagline: "Organized entryways, beautifully designed", image: shoeRack },
];

export const products: Product[] = [
  {
    id: "ct-001",
    name: "Rosewood Lounge Coffee Table",
    price: 5999,
    image: coffeeTable,
    category: "coffee-tables",
    description: "Hand-finished rosewood-tone coffee table with open storage shelf and tapered legs. A warm centerpiece for any living room.",
  },
  {
    id: "tv-001",
    name: "Onyx Modular TV Stand",
    price: 8500,
    image: tvStand,
    category: "tv-stands",
    description: "Sculptural matte-black TV unit with stepped open shelving — equal parts media console and display piece.",
  },
  {
    id: "cl-001",
    name: "Bomax Open Wardrobe Closet",
    price: 12500,
    image: closet,
    category: "closets",
    description: "Espresso-finish wardrobe with hanging space, open cubbies and two drawers. Smart storage for modern bedrooms.",
  },
  {
    id: "sr-001",
    name: "5-Tier Slatted Shoe Rack",
    price: 4500,
    image: shoeRack,
    category: "shoe-racks",
    description: "Spacious 5-tier shoe rack with bottom drawer. Keeps your entryway organized without sacrificing style.",
  },
];

export const getProductsByCategory = (slug: CategorySlug) =>
  products.filter((p) => p.category === slug);

export const getCategory = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug);

export const formatKES = (n: number) =>
  `KES ${n.toLocaleString("en-KE")}`;
