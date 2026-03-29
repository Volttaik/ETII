"use client";

import { useRef, useState, useEffect } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  image: string;
  description: string;
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/shop-api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  // Group products by their actual category from the database
  const categoryMap = new Map<string, Product[]>();
  for (const product of products) {
    const cat = product.category || "Other";
    if (!categoryMap.has(cat)) categoryMap.set(cat, []);
    categoryMap.get(cat)!.push(product);
  }
  const categories = Array.from(categoryMap.entries());

  return (
    <section id="products" ref={ref} className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 mb-10"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Curated for you</p>
        <h2 className="font-display text-4xl sm:text-5xl font-light italic text-foreground">Featured Products</h2>
      </motion.div>

      <div className="flex flex-col gap-12">
        {categories.map(([cat, catProducts], catIdx) => (
          <CategoryRow
            key={cat}
            category={cat}
            products={catProducts}
            inView={inView}
            delay={catIdx * 0.15}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

type RowProps = {
  category: string;
  products: Product[];
  inView: boolean;
  delay: number;
  addToCart: (item: { id: number; name: string; price: number; image: string; category: string }) => void;
};

function CategoryRow({ category, products, inView, delay, addToCart }: RowProps) {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const half = Math.ceil(products.length / 2);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex items-center gap-4">
        <span className="font-display text-xl sm:text-2xl font-light italic">{category}</span>
        <div className="flex-1 h-px bg-border" />
        <a href="#" className="text-xs font-medium text-muted-foreground hover:text-foreground tracking-wide">View all</a>
      </div>
      <div className="flex flex-col gap-3">
        <ScrollRow
          products={products.slice(0, half)}
          liked={liked}
          onLike={(id) => setLiked(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; })}
          onAdd={(p) => { addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category }); toast(`${p.name} added to cart`); }}
        />
        {products.length > half && (
          <ScrollRow
            products={products.slice(half)}
            liked={liked}
            onLike={(id) => setLiked(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; })}
            onAdd={(p) => { addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category }); toast(`${p.name} added to cart`); }}
          />
        )}
      </div>
    </motion.div>
  );
}

type ScrollRowProps = {
  products: Product[];
  liked: Set<number>;
  onLike: (id: number) => void;
  onAdd: (p: Product) => void;
};

const BG_COLORS = ["bg-stone-200", "bg-neutral-800", "bg-stone-300", "bg-zinc-200", "bg-neutral-900", "bg-stone-400", "bg-neutral-200", "bg-zinc-700", "bg-stone-500", "bg-neutral-100"];

function ScrollRow({ products, liked, onLike, onAdd }: ScrollRowProps) {
  return (
    <div className="overflow-x-auto hide-scrollbar px-4 sm:px-6">
      <div className="flex gap-3" style={{ width: "max-content" }}>
        {products.map((p, i) => {
          const discountedPrice = p.discount > 0 ? p.price * (1 - p.discount / 100) : null;
          return (
            <div key={p.id} className="group relative bg-card rounded-xl overflow-hidden flex flex-col border border-border hover:shadow-md transition-all duration-300" style={{ width: "190px", flexShrink: 0 }}>
              <div className={`relative overflow-hidden ${p.image ? "" : BG_COLORS[i % BG_COLORS.length]}`} style={{ height: "210px" }}>
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
                )}
                {p.discount > 0 && (
                  <span className="absolute top-2 left-2 text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded z-10 bg-foreground text-background">
                    Sale
                  </span>
                )}
                <button
                  onClick={() => onLike(p.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Heart className={`w-3 h-3 ${liked.has(p.id) ? "fill-foreground" : ""} text-foreground`} />
                </button>
              </div>
              <div className="mx-2 mb-2 -mt-3 relative z-10 bg-card rounded-lg border border-border shadow-sm px-2.5 py-2 flex flex-col gap-1">
                <p className="text-[11px] font-semibold leading-tight line-clamp-2">{p.name}</p>
                <p className="text-[10px] text-muted-foreground">{p.category}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] font-bold">₦{((discountedPrice ?? p.price) / 100).toLocaleString("en-NG")}</span>
                  {discountedPrice && <span className="text-[10px] text-muted-foreground line-through">₦{(p.price / 100).toLocaleString("en-NG")}</span>}
                </div>
                <button
                  onClick={() => onAdd(p)}
                  className="mt-1.5 w-full flex items-center justify-center gap-1 bg-foreground text-background rounded-md py-1 text-[10px] font-semibold hover:bg-foreground/80 transition-colors"
                >
                  <ShoppingBag className="w-2.5 h-2.5" /> Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
