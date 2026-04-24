"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Hls from "hls.js";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export const CTASection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsUrl = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let hls: Hls | null = null;
    if (isMounted && videoRef.current) {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS for Safari
        video.src = hlsUrl;
      }
    }
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [isMounted]);

  return (
    <section className="relative py-32 md:py-44 px-4 sm:px-6 lg:px-8 border-t border-border/30 overflow-hidden text-center flex flex-col items-center justify-center">
      {/* HLS Video Background */}
      {isMounted && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          suppressHydrationWarning
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/45 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Icon */}
        <motion.div 
          {...fadeUp(0.1)}
          className="relative flex items-center justify-center w-10 h-10 border-2 border-foreground/60 rounded-full mb-8"
        >
          <div className="w-5 h-5 border border-foreground/60 rounded-full" />
        </motion.div>

        <motion.h2
          {...fadeUp(0.2)}
          className="text-4xl md:text-6xl font-medium tracking-tight mb-6"
        >
          Start Your <span className="font-serif italic font-normal">Journey</span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.3)}
          className="text-muted-foreground text-lg max-w-xl mb-12"
        >
          Join thousands of thinkers and creators who are already part of the Mindloop community.
        </motion.p>

        <motion.div 
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-foreground text-background font-semibold rounded-lg px-8 py-3.5 min-w-[180px]"
          >
            Subscribe Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="liquid-glass rounded-lg px-8 py-3.5 min-w-[180px] font-semibold text-foreground"
          >
            Start Writing
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
