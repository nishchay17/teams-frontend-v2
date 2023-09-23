import useMyUser from "@/hooks/useMyUser";
import { Skeleton } from "@/components/ui/skeleton";

function TaskStats() {
  const myUser = useMyUser();
  const assigned = myUser.data?.user?.taskAssigned.length ?? 0;
  const completed = myUser.data?.user?.taskCompleted.length ?? 0;
  const inProgress = myUser.data?.user?.taskInProgress.length ?? 0;
  const total = assigned + completed + inProgress;
  if (myUser.isLoading) {
    return (
      <div>
        <p className="text-xs mb-1">
          <i>Your Status</i>
        </p>
        <div className="flex rounded w-[125px] sm:w-[200px] overflow-hidden">
          <Skeleton className="h-2 w-full" />
        </div>
      </div>
    );
  }
  return (
    <div>
      <p className="text-xs mb-1">
        <i>Your Status</i>
      </p>
      <div className="flex rounded w-[125px] sm:w-[200px] overflow-hidden">
        <div
          title={`New: ${assigned}`}
          style={{ width: `${(assigned / total) * 100}%` }}
          className="bg-red-500 h-2"
        />
        <div
          title={`In progress: ${inProgress}`}
          style={{ width: `${(inProgress / total) * 100}%` }}
          className="bg-sky-500 h-2"
        />
        <div
          title={`Completed: ${completed}`}
          style={{ width: `${(completed / total) * 100}%` }}
          className="bg-emerald-500 h-2"
        />
      </div>
    </div>
  );
}

export default TaskStats;
