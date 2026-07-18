"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ProjectImage } from "@/lib/projects";

// Premium reveal: the frame wipes open (clip-path) while the image inside
// eases back from a slight zoom - the "expensive" look on scroll-in.
export function RevealImage({
  image,
  alt,
  sizes = "(max-width: 768px) 90vw, 80vw",
  priority = false,
  className = "",
}: {
  image: ProjectImage;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        <Image
          src={image.src}
          alt={alt}
          width={image.w}
          height={image.h}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </motion.div>
    </motion.div>
  );
}
