"use client";

import { useEffect, useState } from "react";
import Hero_A from "./sections/Hero_A";
import Hero_B from "./sections/Hero_B";
import { trackVariantView } from "@/lib/abTestTracking";

export default function ABTestHero(props) {
  const [variant, setVariant] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Confirm we're running on the client-side
    setIsClient(true);

    // Check if variant is already stored in localStorage
    const savedVariant = localStorage.getItem("hero_ab_test_variant");

    if (savedVariant) {
      console.log(`[AB Test] Using saved Hero variant ${savedVariant}`);
      setVariant(savedVariant);
      trackVariantView(savedVariant);
    } else {
      // Randomly assign A or B variant
      const randomVariant = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("hero_ab_test_variant", randomVariant);
      setVariant(randomVariant);

      console.log(`[AB Test] User assigned to Hero variant ${randomVariant}`);
      trackVariantView(randomVariant);
    }
  }, []);

  // ✅ Avoid Hydration Mismatch
  // Return stable placeholder during SSR
  if (!isClient || !variant) {
    console.log("[AB Test] Waiting for client-side variant assignment...");
    return (
      <div data-placeholder="hero" className="min-h-[420px] md:min-h-[560px]" />
    );
  }

  // ✅ Dynamically render Hero component based on variant
  const HeroComponent = variant === "A" ? Hero_A : Hero_B;
  console.log(`[AB Test] Rendering Hero ${variant}`);

  return <HeroComponent {...props} />;
}

// Helper function exposed to console for testing
if (typeof window !== "undefined") {
  window.resetABTest = () => {
    localStorage.removeItem("hero_ab_test_variant");
    console.log("✅ AB Test reset! Reload the page to see a new variant.");
  };
}
