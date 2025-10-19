import { trackCTAClick, getCurrentVariant } from "@/lib/abTestTracking";
import Image from "next/image";

const scrollToSection = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    const offsetTop = target.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
};

export default function Hero({
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  imageUrl,
  imageAlt,
}) {
  return (
    <section
      id="hero"
      className="w-full h-fit py-12 md:py-24 bg-primary rounded-b-[40px] md:rounded-b-[120px]"
    >
      <div className="container px-4 2xl:px-0 flex flex-col lg:flex-row lg:items-stretch gap-8">
        {/* content */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold">
            {headline}
          </h1>
          {subhead && <p className="mt-4 text-lg text-gray-600">{subhead}</p>}

          <div className="mt-8 flex gap-4">
            {primaryCta && (
              <a
                href={primaryCta.href}
                onClick={(e) => {
                  scrollToSection(e, primaryCta.href);
                  trackCTAClick(getCurrentVariant(), primaryCta.label);
                }}
                className="px-6 py-3 bg-secondary text-foreground font-semibold rounded-lg transition-all border-2 border-foreground hover:bg-white animate-jittery"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                onClick={(e) => scrollToSection(e, secondaryCta.href)}
                className="px-6 py-3 bg-tertiary text-foreground font-semibold rounded-lg transition-all border-2 border-foreground hover:bg-white"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>

        {/* image */}
        {imageUrl && (
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={1200}
              height={600}
              priority
              sizes="(max-width: 768px) 100vw, 760px"
              className="mt-8 rounded-lg h-full w-auto max-h-[400px]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
