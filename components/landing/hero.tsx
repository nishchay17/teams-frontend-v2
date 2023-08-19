import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div>
        <h1 className="text-7xl font-semibold text-secondary-foreground text-center">
          Reimagine how <br /> your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 dark:from-yellow-300 to-orange-500 dark:to-orange-400">
            team colabs.
          </span>
        </h1>
        <p className="text-center text-lg opacity-75 leading-6 mt-10">
          Teams Collab gets your team in-sync <br />
          with asingle platform for all your tasks.
        </p>
        <div className="flex justify-center mt-14">
          <Button size="sm" variant="outline" className="mr-3 shadow">
            Registration
          </Button>
          <Button size="sm" variant="ghost">
            Have a joining key?
          </Button>
        </div>
      </div>
    </main>
  );
}
