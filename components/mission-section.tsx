"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WordReveal = ({ text, progress, start, end, highlightWords = [] }: { 
  text: string, 
  progress: any, 
  start: number, 
  end: number,
  highlightWords?: string[]
}) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-0">
      {words.map((word, i) => {
        const wordStart = start + (i / words.length) * (end - start);
        const wordEnd = start + ((i + 1) / words.length) * (end - start);
        const opacity = useTransform(progress, [wordStart, wordEnd], [0.15, 1]);
        
        const isHighlighted = highlightWords.includes(word.toLowerCase().replace(/[—,.]/g, ""));
        const color = useTransform(
          progress, 
          [wordStart, wordEnd], 
          ["hsl(var(--hero-subtitle))", isHighlighted ? "hsl(var(--foreground))" : "hsl(var(--hero-subtitle))"]
        );

        return (
          <motion.span
            key={i}
            style={{ opacity, color }}
            className="inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

export const MissionSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section ref={containerRef} className="pt-0 pb-32 md:pb-44 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Large Looping Video */}
        <div className="w-full max-w-[800px] aspect-square mb-20 overflow-hidden">
          {isMounted && (
            <video
              autoPlay
              muted
              loop
              playsInline
              suppressHydrationWarning
              className="w-full h-full object-cover scale-110"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
                type="video/mp4"
              />
            </video>
          )}
        </div>

        {/* Scroll Reveal Text */}
        <div className="text-center space-y-16">
          <div className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] leading-[1.3]">
            <WordReveal
              text="We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having."
              progress={scrollYProgress}
              start={0.2}
              end={0.5}
              highlightWords={["curiosity", "meets", "clarity"]}
            />
          </div>

          <div className="text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4]">
            <WordReveal
              text="A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved."
              progress={scrollYProgress}
              start={0.5}
              end={0.8}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
