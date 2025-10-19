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
  const [finalSrc, setFinalSrc] = useState(src);

  useEffect(() => {
    if (!src) return;

    // Only check jpg/jpeg/png extensions
    const m = src.match(/\.(jpg|jpeg|png)$/i);
    if (!m) {
      setFinalSrc(src);
      return;
    }

    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    // Check if webp version exists
    fetch(webpSrc, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setFinalSrc(webpSrc);
        } else {
          setFinalSrc(src);
        }
      })
      .catch(() => {
        setFinalSrc(src);
      });
  }, [src]);

  const fetchPriority = loading === "eager" ? "high" : "low";

  return (
    <img
      src={finalSrc}
      alt={alt}
      loading={loading}
      fetchpriority={fetchPriority}
      className={className}
      {...rest}
    />
  );
}
