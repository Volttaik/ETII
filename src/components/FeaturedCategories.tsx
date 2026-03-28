"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

type Category = {
  id: number;
  name: string;
  image: string;
};

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/shop-api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || categories.length === 0) return null;

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Browse by</p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Categories</h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.id}
            href="#products"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative rounded-2xl overflow-hidden min-h-[180px] hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
          >
            {cat.image ? (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                <Tag className="w-10 h-10 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-black text-xl tracking-tight text-white drop-shadow">{cat.name}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
