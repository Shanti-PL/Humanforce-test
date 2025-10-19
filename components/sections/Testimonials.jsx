"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Testimonials({ headline, subhead, items }) {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测屏幕大小
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const initialDisplayCount = isMobile ? 2 : 4;
  const displayedItems = showAll ? items : items.slice(0, initialDisplayCount);
  const hasMore = items.length > initialDisplayCount;

  return (
    <section
      id="testimonials"
      className="py-10 md:py-14 bg-[#F5F5F5] min-h-[300px]"
    >
      <div className="container px-4 2xl:px-0 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-center text-black">
          {headline}
        </h2>
        {subhead && <p className="mt-4 text-lg text-gray-600">{subhead}</p>}
        <div className="w-full mt-6 md:mt-10 grid gap-6 md:grid-cols-2">
          {displayedItems.map((it, idx) => (
            <blockquote
              key={idx}
              className="rounded-2xl bg-white px-4 xl:px-6 shadow-sm"
            >
              <div className="w-full h-full flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-2 md:gap-3">
                {/* content */}
                <div className="w-full sm:w-[60%] xl:w-3/4 py-4 flex flex-col justify-center">
                  <p className="text-gray-900 text-lg xl:text-xl font-semibold leading-[1.2]">
                    “{it.quote}”
                  </p>
                  <footer className="mt-3 text-sm text-gray-600">
                    — {it.author}
                  </footer>
                </div>
                {/* image */}
                <div className="flex-1 flex items-end justify-center sm:justify-end pt-2 md:pt-5">
                  <Image
                    src={it.image}
                    alt={it.author}
                    width={160}
                    height={160}
                    sizes="(max-width: 768px) 100vw, 160px"
                    className="w-full md:w-auto h-auto md:h-full max-h-[120px] xl:max-h-[140px] object-contain"
                  />
                </div>
              </div>
            </blockquote>
          ))}
        </div>

        {/* View More Button */}
        {hasMore && !showAll && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="border-2 border-black cursor-pointer px-8 py-3 bg-primary hover:bg-primary/90 text-foreground font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              View More
            </button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(false)}
              className="cursor-pointer border-2 border-black px-8 py-3 bg-gray-200 hover:bg-gray-300 text-foreground font-semibold rounded-lg transition-all"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
