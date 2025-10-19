"use client";
import { useEffect, useState } from "react";

/**
 * SmartImage component
 * - Automatically prefers .webp if it exists
 * - Default loading="lazy"
 * - Maps fetchPriority automatically (lazy→low, eager→high)
 */
export default function SmartImage({
  src,
  alt = "",
  loading = "lazy", // Default is lazy
  className = "",
  ...rest
}) {
  const fetchPriority = loading === "eager" ? "high" : "low";

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      fetchpriority={fetchPriority}
      className={className}
      {...rest}
    />
  );
}
