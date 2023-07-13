"use client";

function Card() {
  return (
    <div className="bg-background py-2 px-3 select-none">
      <p className="mb-1 text-sm font-medium">Create New frontend</p>
      <p className="text-xs opacity-90">
        Create with next js and with a clean UI
      </p>
    </div>
  );
}

export default function Tasks() {
  return (
    <>
      <h2 className="text-2xl mb-4">Tasks</h2>
      <div className="grid grid-cols-3 gap-5">
        <div>
          <div className="bg-primary-foreground border-2 p-4 flex flex-col gap-3 rounded-sm">
            <p>New</p>
            <Card />
            <Card />
          </div>
        </div>

        <div>
          <div className="bg-primary-foreground border-2 p-4 flex flex-col gap-3 rounded-sm">
            <p>In progress</p>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div>
          <div className="bg-primary-foreground border-2 p-4 flex flex-col gap-3 rounded-sm">
            <p>Complete</p>
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  );
}
