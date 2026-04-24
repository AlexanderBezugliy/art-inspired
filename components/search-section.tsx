"use client";

import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const platforms = [
  {
    name: "ChatGPT",
    icon: "/icon-chatgpt.png",
    description: "The pioneer of conversational AI, transforming how we interact with information and creativity.",
    fallback: "https://api.dicebear.com/7.x/shapes/svg?seed=chatgpt"
  },
  {
    name: "Perplexity",
    icon: "/icon-perplexity.png",
    description: "A new era of search that provides direct answers with citations, prioritizing accuracy and depth.",
    fallback: "https://api.dicebear.com/7.x/shapes/svg?seed=perplexity"
  },
  {
    name: "Google AI",
    icon: "/icon-google.png",
    description: "Integrating generative AI into the world's most powerful search engine for a smarter experience.",
    fallback: "https://api.dicebear.com/7.x/shapes/svg?seed=google"
  }
];

export const SearchSection = () => {
  return (
    <section className="pt-52 md:pt-64 pb-6 md:pb-9 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.h2
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] leading-tight mb-8"
        >
          Search has <span className="font-serif italic font-normal">changed.</span> Have you?
        </motion.h2>

        <motion.p
          {...fadeUp(0.2)}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-24 leading-relaxed"
        >
          The way we find information is evolving. We no longer just search; we converse, we explore, and we discover depth in ways previously impossible.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              {...fadeUp(0.3 + i * 0.1)}
              className="flex flex-col items-center"
            >
              <div className="w-[200px] h-[200px] flex items-center justify-center mb-6">
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = platform.fallback;
                  }}
                />
              </div>
              <h3 className="font-semibold text-base mb-2">{platform.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {platform.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp(0.6)}
          className="text-muted-foreground text-sm italic"
        >
          If you don't answer the questions, someone else will.
        </motion.p>
      </div>
    </section>
  );
};
