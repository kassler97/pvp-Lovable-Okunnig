import cap from "@/assets/cap.jpg";
import tshirt from "@/assets/tshirt.jpg";
import pants from "@/assets/pants.jpg";
import shoes from "@/assets/shoes.jpg";
import hoodie from "@/assets/hoodie.jpg";

export type Category = "Kepsar" | "T-shirts" | "Byxor" | "Skor" | "Hoodies";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "One Size" | "39" | "40" | "41" | "42" | "43" | "44" | "45";
export type Material = "Bomull" | "Fleece" | "Denim" | "Läder" | "Mesh" | "Polyester";
export type Color = "Svart" | "Vit" | "Grå" | "Beige" | "Röd" | "Blå";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  sizes: Size[];
  materials: Material[];
  colors: Color[];
  isNew?: boolean;
}

export const categories: Category[] = ["Kepsar", "T-shirts", "Byxor", "Skor", "Hoodies"];
export const allSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "39", "40", "41", "42", "43", "44", "45"];
export const allMaterials: Material[] = ["Bomull", "Fleece", "Denim", "Läder", "Mesh", "Polyester"];
export const allColors: Color[] = ["Svart", "Vit", "Grå", "Beige", "Röd", "Blå"];

export const products: Product[] = [
  { id: "h1", name: "Shadow Heavyweight Hoodie", category: "Hoodies", price: 899, image: hoodie, isNew: true, sizes: ["S", "M", "L", "XL"], materials: ["Fleece", "Bomull"], colors: ["Svart"] },
  { id: "h2", name: "Core Logo Hoodie", category: "Hoodies", price: 799, image: hoodie, sizes: ["S", "M", "L", "XL", "XXL"], materials: ["Bomull"], colors: ["Grå", "Svart"] },
  { id: "t1", name: "Essential Box Tee", category: "T-shirts", price: 399, image: tshirt, isNew: true, sizes: ["XS", "S", "M", "L", "XL"], materials: ["Bomull"], colors: ["Vit", "Svart"] },
  { id: "t2", name: "Oversized Black Tee", category: "T-shirts", price: 449, image: tshirt, sizes: ["S", "M", "L", "XL"], materials: ["Bomull"], colors: ["Svart"] },
  { id: "c1", name: "PVP Crown Cap", category: "Kepsar", price: 349, image: cap, sizes: ["One Size"], materials: ["Bomull"], colors: ["Svart", "Beige"] },
  { id: "c2", name: "Low Profile Cap", category: "Kepsar", price: 299, image: cap, isNew: true, sizes: ["One Size"], materials: ["Bomull", "Mesh"], colors: ["Svart", "Vit"] },
  { id: "p1", name: "Tactical Cargo Pants", category: "Byxor", price: 1199, image: pants, sizes: ["S", "M", "L", "XL"], materials: ["Bomull", "Polyester"], colors: ["Svart", "Beige"] },
  { id: "p2", name: "Slim Fit Trousers", category: "Byxor", price: 999, image: pants, sizes: ["S", "M", "L", "XL"], materials: ["Denim"], colors: ["Blå", "Svart"] },
  { id: "s1", name: "Phantom Runners", category: "Skor", price: 1599, image: shoes, isNew: true, sizes: ["40", "41", "42", "43", "44", "45"], materials: ["Mesh", "Läder"], colors: ["Svart", "Vit"] },
  { id: "s2", name: "Street Low", category: "Skor", price: 1399, image: shoes, sizes: ["39", "40", "41", "42", "43", "44"], materials: ["Läder"], colors: ["Vit", "Röd"] },
];

export const news = [
  {
    id: "n1",
    tag: "DROP",
    title: "FW26 Collection — Out Now",
    excerpt: "Vår mörkaste kollektion hittills. Heavyweight fleece, tekniska tyger och en helt ny silhuett.",
    date: "2 maj 2026",
  },
  {
    id: "n2",
    tag: "EVENT",
    title: "Pop-up Store i Stockholm",
    excerpt: "Möt teamet och se hela kollektionen IRL. 14–16 maj på Södermalm.",
    date: "28 apr 2026",
  },
  {
    id: "n3",
    tag: "STORY",
    title: "Bakom Phantom Runners",
    excerpt: "Två års utveckling. Läs hur vår första sneaker blev verklighet.",
    date: "20 apr 2026",
  },
];
