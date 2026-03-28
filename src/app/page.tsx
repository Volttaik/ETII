"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import ProductGrid from "@/components/ProductGrid";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedCategories />
      <ProductGrid />
      <Banner />
      <Footer />
      <Toaster />
    </div>
  );
}
