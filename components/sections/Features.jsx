"use client";

import { useEffect, useRef } from "react";
import Slider from "react-slick";

export default function Features({ headline, subhead, items }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const getBackgroundColor = (index) => {
    const colors = ["bg-primary", "bg-secondary", "bg-tertiary"];
    return colors[index % 3];
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    lazyLoad: "ondemand",
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <section
      id="features"
      className="w-full h-fit py-10 md:py-14 bg-gray-50 min-h-[300px]"
    >
      <div className="container px-4 2xl:px-0 flex flex-col lg:flex-row items-center gap-4 md:gap-8 xl:gap-12">
        {/* content */}
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
          {subhead && (
            <p className="text-lg md:text-xl text-gray-600">{subhead}</p>
          )}
        </div>
        {/* features carousel */}
        <div className="w-full lg:w-1/2 relative px-0 md:px-8 xl:px-12">
          <Slider ref={sliderRef} {...settings}>
            {items.map((it, idx) => (
              <div key={idx} className="px-4 my-5 cursor-pointer rounded-2xl">
                <div
                  className={`rounded-2xl border border-gray-200 p-8 md:p-10 ${getBackgroundColor(
                    idx
                  )} shadow-xs hover:shadow-lg hover:border-foreground/20 transition-all duration-300 min-h-[200px] flex flex-col justify-center items-center text-center`}
                >
                  <h3 className="text-xl md:text-2xl xl:text-3xl font-bold mb-4 text-foreground">
                    {it.title}
                  </h3>
                  <p className="text-foreground/80 text-lg font-medium">
                    {it.desc}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
