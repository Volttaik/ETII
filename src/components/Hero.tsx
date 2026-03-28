"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-16 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-8 pb-12 flex flex-col gap-6">

        {/* Row 1: Poetic text — above the image */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display italic font-light text-foreground leading-tight tracking-tight"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
        >
          Find what fits you.
        </motion.p>

        {/* Row 2: Image + WELCOME TO / ETII side by side */}
        <div className="flex flex-row items-center gap-5 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex-shrink-0 w-[180px] sm:w-[220px] lg:w-[280px]"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
              <img
                src="https://images.fillout.com/orgid-635770/flowpublicid-w9xbmrnqsm/widgetid-default/7ezf3fbthNxD4VLMWgtHsc/pasted-image-1774728237030.jpg"
                alt="ETII Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col"
          >
            <span className="block text-[11px] sm:text-sm font-medium text-muted-foreground tracking-[0.2em] uppercase mb-1">
              Welcome to
            </span>
            <span
              className="font-display block font-bold leading-none text-foreground"
              style={{ fontSize: "clamp(3.5rem, 14vw, 7rem)", letterSpacing: "-0.03em" }}
            >
              ETII
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              style={{ originX: 0 }}
              className="h-px bg-foreground mt-3 w-10"
            />
          </motion.h1>
        </div>

        {/* Row 3: Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#products"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-foreground/80 transition-colors group"
          >
            Shop Now
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#categories"
            className="inline-flex items-center gap-2 border border-border px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-secondary transition-colors"
          >
            Explore
          </a>
        </motion.div>

      </div>
    </section>
  );
}
