"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingBag, Search, X, ChevronDown, User, LogOut, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const links = ["New In", "Women", "Men", "Accessories", "Sale"];

export default function Navbar() {
  const { cartCount, setCartOpen } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5 select-none">
            <img src="/etii-logo-nobg.png" alt="ETII" className="h-10 w-auto object-contain" />
            <span className="font-display text-2xl font-bold tracking-tight text-foreground leading-none" style={{ letterSpacing: "-0.02em" }}>
              ETII
            </span>
          </a>

          {/* Desktop Nav with dropdown */}
          <div className="hidden md:flex items-center gap-1 relative" ref={menuRef}>
            {links.slice(0, 3).map((l) => (
              <a key={l} href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-secondary">
                {l}
              </a>
            ))}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-secondary"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    {links.slice(3).map((l) => (
                      <a key={l} href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                        {l}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-4 h-4" />
            </button>

            {user ? (
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-secondary transition-colors" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <User className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full right-0 mt-2 w-52 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-xs font-semibold text-foreground truncate">{user.fullName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={async () => { await logout(); setUserMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={() => router.push("/login")} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition-colors hidden sm:flex">
                Sign in
              </button>
            )}

            <button className="p-2 rounded-full hover:bg-secondary transition-colors relative" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button — sits with other icons on the right */}
            <div className="relative md:hidden" ref={menuRef}>
              <button
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <a href="/" className="block px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors border-b border-border/40" onClick={() => setMenuOpen(false)}>
                      Home
                    </a>
                    {user ? (
                      <button
                        onClick={async () => { await logout(); setMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign out
                      </button>
                    ) : (
                      <>
                        <a href="/login" className="block px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors border-b border-border/40" onClick={() => setMenuOpen(false)}>
                          Login
                        </a>
                        <a href="/register" className="block px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                          Register
                        </a>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-3 max-w-2xl mx-auto flex items-center gap-3">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input autoFocus type="text" placeholder="Search for products..." className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm py-1" />
                <button onClick={() => setSearchOpen(false)}><X className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
