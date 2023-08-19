import Image from "next/image";

import img from "../../public/img/task-page.png";
import FeatureCard, { FeatureType } from "./feature-card";

const FEATURES = [
  {
    title: "Streamlined Task Assignment",
    icon: "checkBox",
    description:
      "Seamlessly create and assign tasks to team members. Empower collaboration and boost productivity by keeping everyone aligned on tasks and goals.",
  },
  {
    title: "Dynamic Task Status Updates",
    icon: "manage",
    description:
      "Gain real-time insights into task progress. Administrators can effortlessly monitor task statuses, ensuring transparency and efficient project management.",
  },
  {
    title: "Unified File Repository",
    icon: "file",
    description:
      "Share and access project files effortlessly. Our integrated file 'bucket' ensures easy sharing and access to essential documents, fostering a collaborative environment for all users.",
  },
] as const;

export default function Features() {
  return (
    <section className="container">
      <div className="w-4/5 mx-auto">
        <Image
          alt="Task page"
          src={img}
          quality={100}
          draggable={false}
          className="border rounded-2xl shadow-md -mt-20 select-none"
        />
        <div className="grid grid-cols-3 gap-6 my-10">
          {FEATURES.map((feature: FeatureType) => (
            <FeatureCard {...feature} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
