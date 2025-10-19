export const runtime = "edge";

import { loadContent } from "@/lib/loadContent";
import Header from "@/components/sections/Header";
import ABTestHero from "@/components/ABTestHero";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default async function Home() {
  const cms = await loadContent("landing");
  const general = await loadContent("general");

  return (
    <>
      <Header navigation={general.navigation} brand={general.brand} />
      <main className="w-full h-fit pt-20">
        <ABTestHero {...cms.hero} />
        <Features {...cms.features} />
        <Testimonials {...cms.testimonials} />
        <Contact {...cms.contact} contact={general.contact} />
      </main>
      <Footer {...general} />
    </>
  );
}
