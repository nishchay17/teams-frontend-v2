import TaskCard from "./taskCard";

type Props = {
  user: any;
};

export default function UserDetail({ user }: Props) {
  if (!user) return null;
  return (
    <>
      <div className="bg-primary-foreground mb-5 px-3 py-2">UserDetail</div>
      <div className="grid grid-cols-3 gap-5 mb-5">
        <div className="bg-primary-foreground border p-4 flex flex-col gap-3 rounded-sm">
          <p className="select-none">New</p>
          {user.taskAssigned.map((task: any, index: number) => (
            <TaskCard key={index} {...task} />
          ))}
        </div>
        <div className="bg-primary-foreground border p-4 flex flex-col gap-3 rounded-sm">
          <p className="select-none">New</p>
          {user.taskCompleted.map((task: any, index: number) => (
            <TaskCard key={index} {...task} />
          ))}
        </div>
        <div className="bg-primary-foreground border p-4 flex flex-col gap-3 rounded-sm">
          <p className="select-none">New</p>
          {user.taskInProgress.map((task: any, index: number) => (
            <TaskCard key={index} {...task} />
          ))}
        </div>
      </div>
    </>
  );
}
