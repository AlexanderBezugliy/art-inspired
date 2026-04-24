"use client"

import { useState } from "react"
import { VideoCard } from "./video-card"
import { CustomCursor } from "./custom-cursor"

const projects = [
  {
    id: 1,
    title: "ALPINE PEAKS",
    subtitle: "Majestic Summits",
    category: "NATURE",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop",
    description: "Experience the breathtaking beauty of snow-capped mountains and pristine alpine air.",
    rating: 4.9,
    views: "12.5K",
    location: "Swiss Alps",
  },
  {
    id: 2,
    title: "ANCIENT WOODS",
    subtitle: "Deep Forest Spirit",
    category: "WILDLIFE",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop",
    description: "Lose yourself in the mystical atmosphere of centuries-old trees and golden sunlight.",
    rating: 4.8,
    views: "8.2K",
    location: "Pacific Northwest",
  },
  {
    id: 3,
    title: "OCEAN PULSE",
    subtitle: "Infinite Horizon",
    category: "COASTAL",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?q=80&w=1000&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop",
    description: "Capturing the raw power and serene tranquility of the world's vast blue oceans.",
    rating: 4.7,
    views: "15.1K",
    location: "Bora Bora",
  },
  {
    id: 4,
    title: "DESERT GLOW",
    subtitle: "Golden Hour Magic",
    category: "LANDSCAPE",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1000&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop",
    description: "The shifting sands and brilliant hues of the desert as the sun kisses the horizon.",
    rating: 4.9,
    views: "9.7K",
    location: "Sahara Desert",
  },
  {
    id: 5,
    title: "AURORA NIGHTS",
    subtitle: "Celestial Dance",
    category: "COSMOS",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1531366930499-41f53c175703?q=80&w=1000&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=80&w=1000&auto=format&fit=crop",
    description: "Witness the ethereal beauty of the northern lights dancing across the arctic sky.",
    rating: 5.0,
    views: "21.3K",
    location: "Iceland",
  },
]

export function WorksGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <>
      <CustomCursor isActive={hoveredId !== null} />
      <div className="container mx-auto px-6">
        <div className="flex gap-4 items-stretch">
          {projects.map((project) => (
            <VideoCard
              key={project.id}
              project={project}
              isHovered={hoveredId === project.id}
              onHoverChange={(hovered) => setHoveredId(hovered ? project.id : null)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
