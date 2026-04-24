"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4">
      {/* Background Video */}
      {isMounted && (
        <video
          autoPlay
          muted
          loop
          playsInline
          suppressHydrationWarning
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 pt-28 md:pt-32 flex flex-col items-center max-w-5xl">
        {/* Avatar Row */}
        {/* <motion.div 
          {...fadeUp(0.1)}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden"
              >
                <img
                  src={`/avatar-${i}.png`}
                  alt={`User ${i}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`;
                  }}
                />
              </div>
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            7,000+ people already subscribed
          </span>
        </motion.div> */}

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] leading-[1.1] mb-6"
        >
          Get <span className="font-serif italic font-normal">Inspired</span> <br />with Us
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-lg md:text-xl text-hero-subtitle max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join our feed for meaningful updates, news around technology and a
          shared journey toward depth and direction.
        </motion.p>

        {/* Email Form */}
        {/* <motion.div
          {...fadeUp(0.4)}
          className="liquid-glass rounded-full p-2 w-full max-w-lg flex items-center gap-2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent border-none outline-none px-6 text-foreground placeholder:text-muted-foreground/50"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-foreground text-background font-bold rounded-full px-8 py-3 text-sm tracking-wider"
          >
            SUBSCRIBE
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};
