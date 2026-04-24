"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const features = [
  {
    title: "Curated Feed",
    description: "Hand-picked content that matches your interests and sparks curiosity every single day."
  },
  {
    title: "Writer Tools",
    description: "Professional-grade editing and distribution tools designed for creators who value depth."
  },
  {
    title: "Community",
    description: "Connect with a like-minded community of readers and writers in meaningful discussions."
  },
  {
    title: "Distribution",
    description: "Reach your audience where they are with seamless multi-channel content delivery."
  }
];

export const SolutionSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-32 md:py-44 px-4 sm:px-6 lg:px-8 border-t border-border/30">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp(0.1)} className="mb-16">
          <span className="text-xs tracking-[3px] uppercase text-muted-foreground mb-4 block">
            SOLUTION
          </span>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
            The platform for <span className="font-serif italic font-normal">meaningful</span> content
          </h2>
        </motion.div>

        {/* Video Banner */}
        <motion.div 
          {...fadeUp(0.2)}
          className="relative w-full aspect-[3/1] mb-24 overflow-hidden rounded-2xl"
        >
          {isMounted && (
            <video
              autoPlay
              muted
              loop
              playsInline
              suppressHydrationWarning
              className="w-full h-full object-cover"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
                type="video/mp4"
              />
            </video>
          )}
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...fadeUp(0.3 + i * 0.1)}
              className="space-y-4"
            >
              <h3 className="font-semibold text-base">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
