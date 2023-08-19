import Image from "next/image";

import img from "../../public/img/add-task.png";
import FeatureCard, { FeatureType } from "./feature-card";

const FEATURES = [
  {
    title: "Task Archiving",
    icon: "checkBox",
    description:
      "Keep your workspace organized by archiving completed tasks. Maintain a clutter-free environment while preserving a comprehensive record of project history.",
  },
  {
    title: "Dark Mode",
    icon: "manage",
    description:
      "Seamlessly switch to a sleek dark interface, reducing eye strain during late hours and enhancing focus. Enjoy an immersive user experience that's easy on the eyes.",
  },
] as const;

function Features2() {
  return (
    <section className="container">
      <div className="w-4/5 mx-auto mt-20">
        <Image
          alt="Task page"
          src={img}
          quality={100}
          draggable={false}
          className="border rounded-2xl shadow-md select-none"
        />
        <div className="grid grid-cols-2 gap-6 my-10">
          {FEATURES.map((feature: FeatureType) => (
            <FeatureCard {...feature} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features2;
