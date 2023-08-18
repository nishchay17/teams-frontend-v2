"use client";

import TaskCard from "@/components/taskCard";
import useArchiveTasks from "@/hooks/useArchivedTasks";

type Props = {};

function TaskLoading() {
  const data = Array(3).fill(1);
  return (
    <>
      {data.map((_, key) => (
        <TaskCard
          priority="loading"
          key={key}
          isLoading
          name={"loading"}
          description="loading"
          _id="loading"
        />
      ))}
    </>
  );
}

export default function ArchiveTask({}: Props) {
  const archiveTasks = useArchiveTasks();

  if (archiveTasks.isError) {
    return <p>Error while loading</p>;
  }
  const archiveTasksList = archiveTasks.data?.tasks;

  return (
    <>
      <h2 className="text-2xl mb-7">Archived Tasks</h2>
      {archiveTasks.isLoading ? (
        <TaskLoading />
      ) : (
        archiveTasksList.map((task: any, key: string) => (
          <TaskCard {...task} key={key} className="mb-1" />
        ))
      )}
    </>
  );
}
