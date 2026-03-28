"use client";

import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-20">
      <div className="relative bg-foreground rounded-3xl overflow-hidden px-8 py-14 sm:px-16 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 border border-background/10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 right-16 w-40 h-40 border border-background/10 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative z-10">
          <p className="text-background/60 text-xs font-semibold tracking-widest uppercase mb-3">Limited Time</p>
          <h2 className="text-3xl sm:text-4xl font-black text-background tracking-tight leading-tight">
            Summer Sale is Live.
            <br />
            Up to 50% Off.
          </h2>
          <p className="text-background/60 mt-3 text-sm">Don&apos;t miss out — sale ends July 31st.</p>
        </div>

        <div className="relative z-10 flex-shrink-0">
          <button className="inline-flex items-center gap-2 bg-background text-foreground border border-background px-8 py-3 rounded-full font-semibold hover:bg-background/90 transition-colors group">
            Shop Sale
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
