import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />

      <Services />
      <Projects />
      <Contact />
      <CallToAction />
    </div>
  );
}
