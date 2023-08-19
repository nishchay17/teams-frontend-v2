export default function Tech() {
  const TECH_LIST = [
    "Next js",
    "Typescript",
    "React query",
    "Radix UI",
    "React hook form",
    "Next auth",
    "React beautiful dnd",
    "Lucide icons",
    "React select",
    "Zod",
  ] as const;
  return (
    <section className="border-t mt-20 pt-20 pb-24">
      <p className="text-4xl font-semibold text-center mb-5">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 ">
          Technologies
        </span>{" "}
        powering our platform
      </p>
      <div className="flex gap-x-3 gap-y-2 mx-auto justify-center px-6 max-w-3xl flex-wrap">
        {TECH_LIST.map((tech) => (
          <p
            className="border rounded-lg px-3 py-[2px] cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-100"
            key={tech}
          >
            {tech}
          </p>
        ))}
      </div>
    </section>
  );
}
