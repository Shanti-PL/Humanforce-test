/**
 * AB Test Tracking Utilities (Enhanced Logging)
 * For debugging and verifying AB test events
 */

const TEST_NAME = "hero_cta";
const sent = new Set();

/**
 * Records which variant the user sees
 * @param {string} variant - 'A' or 'B'
 */
export function trackVariantView(variant) {
  if (typeof window === "undefined") return;

  const key = `view:${TEST_NAME}:${variant}`;
  if (sent.has(key)) {
    console.log(
      `[AB Test] [DEBUG] Skipped duplicate view for variant ${variant}`
    );
    return;
  }
  sent.add(key);

  console.log("--------------------------------------------------");
  console.log(`[AB Test] Variant VIEW triggered`);
  console.log(`[AB Test] Test name: ${TEST_NAME}`);
  console.log(`[AB Test] Variant: ${variant}`);
  console.log(`[AB Test] Page path: ${window.location.pathname}`);
  console.log(`[AB Test] Document title: ${document.title}`);
  console.log("--------------------------------------------------");

  // Log simulated GA event
  console.log(`[AB Test] (Simulated) Sending GA4 event: ab_test_view`);

  // Optional GA event if gtag exists
  if (window.gtag) {
    window.gtag("event", "ab_test_view", {
      test_name: TEST_NAME,
      variant,
      page_path: window.location.pathname,
      page_title: document.title,
    });
    console.log(`[AB Test] [gtag] ab_test_view sent successfully ✅`);
  } else {
    console.log(`[AB Test] [WARN] gtag not detected – event simulated locally`);
  }
}

/**
 * Records CTA click events
 * @param {string} variant - 'A' or 'B'
 * @param {string} ctaLabel - CTA button text
 */
export function trackCTAClick(variant, ctaLabel) {
  if (typeof window === "undefined") return;

  console.log("--------------------------------------------------");
  console.log(`[AB Test] CTA CLICK triggered`);
  console.log(`[AB Test] Test name: ${TEST_NAME}`);
  console.log(`[AB Test] Variant: ${variant}`);
  console.log(`[AB Test] CTA Label: ${ctaLabel}`);
  console.log(`[AB Test] Page path: ${window.location.pathname}`);
  console.log(`[AB Test] Timestamp: ${new Date().toISOString()}`);
  console.log("--------------------------------------------------");

  // Simulated GA event
  console.log(`[AB Test] (Simulated) Sending GA4 event: ab_test_cta_click`);

  if (window.gtag) {
    window.gtag("event", "ab_test_cta_click", {
      test_name: TEST_NAME,
      variant,
      cta_label: ctaLabel,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
    console.log(`[AB Test] [gtag] ab_test_cta_click sent successfully ✅`);
  } else {
    console.log(`[AB Test] [WARN] gtag not detected – click tracked locally`);
  }
}

/**
 * Gets the current user's variant
 * @returns {string|null} 'A', 'B', or null
 */
export function getCurrentVariant() {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem("hero_ab_test_variant");
    console.log(`[AB Test] Current saved variant: ${v}`);
    return v;
  } catch (error) {
    console.error("[AB Test] Error getting current variant:", error);
    return null;
  }
}

/**
 * Resets AB test (for testing purposes)
 */
export function resetABTest() {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("hero_ab_test_variant");
    sent.clear();
    console.log("--------------------------------------------------");
    console.log(
      "[AB Test] ✅ Variant reset – reload page to see new assignment"
    );
    console.log("--------------------------------------------------");
  } catch (error) {
    console.error("[AB Test] Error resetting AB test:", error);
  }
}
