import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product";

dotenv.config();

const categoryData: Record<string, { brands: string[]; images: string[]; names: string[] }> = {
  "Mobiles & Accessories": {
    brands: ["Samsung", "Apple", "OnePlus", "Xiaomi", "Realme"],
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
    ],
    names: ["Smartphone", "Phone Case", "Screen Protector", "Charger", "Power Bank"],
  },
  "Electronics": {
    brands: ["Sony", "LG", "Logitech", "Samsung", "Anker"],
    images: [
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=600&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
    ],
    names: ["Headphones", "Monitor", "Speaker", "Webcam", "Router"],
  },
  "Fashion": {
    brands: ["Nike", "Adidas", "Puma", "Levis", "Zara"],
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    ],
    names: ["T-Shirt", "Sneakers", "Jacket", "Jeans", "Cap"],
  },
  "Home & Kitchen": {
    brands: ["Prestige", "Philips", "IKEA", "Milton", "Bajaj"],
    images: [
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    ],
    names: ["Mixer Grinder", "Cookware Set", "Table Lamp", "Storage Box", "Electric Kettle"],
  },
  "Watches": {
    brands: ["Fossil", "Titan", "Casio", "Fastrack", "Apple"],
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
    ],
    names: ["Analog Watch", "Smart Watch", "Digital Watch", "Chronograph Watch", "Sports Watch"],
  },
  "Sports & Outdoors": {
    brands: ["Nivia", "Cosco", "Yonex", "Wilson", "Decathlon"],
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80",
    ],
    names: ["Football", "Badminton Racket", "Yoga Mat", "Dumbbell Set", "Cricket Bat"],
  },
};

const products: any[] = [];

Object.entries(categoryData).forEach(([category, data]) => {
  for (let i = 0; i < 20; i++) {
    const brand = data.brands[i % data.brands.length]!;
    const nameBase = data.names[i % data.names.length]!;
    const image = data.images[i % data.images.length]!;
    const price = Math.floor(Math.random() * 15000) + 499;
    const stock = Math.floor(Math.random() * 50) + 10;

    products.push({
      name: `${brand} ${nameBase} ${i + 1}`,
      description: `High quality ${nameBase.toLowerCase()} from ${brand}, perfect for everyday use.`,
      price,
      category,
      brand,
      stock,
      image,
    });
  }
});

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB Connected");

    await Product.deleteMany({});
    console.log("Old products cleared");

    await Product.insertMany(products);
    console.log(`${products.length} products inserted successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();