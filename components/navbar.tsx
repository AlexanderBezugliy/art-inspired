"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import NavMenu from "@/components/ui/menu-hover-effects";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 0);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group z-50">
            <div className="relative flex items-center justify-center w-8 h-8 border-2 border-foreground/40 rounded-full transition-all duration-300 group-hover:border-accent">
              <div className="w-3.5 h-3.5 border border-foreground/40 rounded-full transition-all duration-300 group-hover:bg-accent/20 group-hover:border-accent" />
            </div>
            <span className="text-xl font-bold tracking-tight">PICTURE.</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {["Home", "About", "Services", "Team", "Portfolio", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative inline-block group px-3 py-2"
              >
                <span className="
                  relative z-10 block uppercase text-muted-foreground/80
                  font-sans font-medium transition-colors duration-300
                  group-hover:text-accent
                  text-sm py-2 px-3
                ">
                  {item}
                </span>
                <span className="
                  absolute inset-0 border-2 border-transparent
                  rounded-lg transform scale-95 opacity-0
                  transition-all duration-300
                  group-hover:scale-100 group-hover:opacity-100
                  group-hover:border-accent/50
                " />
                <span className="
                  absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent
                  transition-all duration-300 origin-center
                  group-hover:w-full
                " />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-accent hover:bg-accent/10 transition-all duration-200 ring-1 ring-white/5 hover:ring-accent/30"
              >
                <Icon size={18} />
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden z-50 p-2 text-foreground/80 hover:text-accent transition-colors duration-200"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background"
          >
            <NavMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};