"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const navLinks = ["Home", "How It Works", "Philosophy", "Use Cases"];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-8 h-8 border-2 border-foreground/40 rounded-full transition-all duration-300 group-hover:border-primary">
            <div className="w-3.5 h-3.5 border border-foreground/40 rounded-full transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">Mindloop</span>
        </Link>

        {/* Center: Nav links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-muted-foreground/80 hover:text-foreground transition-all duration-200 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center gap-4">
          {[Instagram, Linkedin, Twitter].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-white/5 transition-all duration-200 ring-1 ring-white/5"
            >
              <Icon size={18} />
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};
