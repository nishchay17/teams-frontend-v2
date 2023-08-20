"use client";

import TaskCard from "@/components/taskCard";
import Pagination from "@/components/ui/pagination";
import { Links } from "@/config/links";
import useArchiveTasks from "@/hooks/useArchivedTasks";
import { useState } from "react";

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
          className="mb-1"
        />
      ))}
    </>
  );
}

export default function ArchiveTask({}: Props) {
  const [pageNo, setPageNo] = useState(0);
  const PER_PAGE = 10;
  const archiveTasks = useArchiveTasks(pageNo, PER_PAGE);

  function onPageChange({ selected }: { selected: number }) {
    setPageNo(selected);
  }

  if (archiveTasks.isLoading) {
    return (
      <>
        <h2 className="text-2xl mb-7">Archived Tasks</h2>
        <TaskLoading />
      </>
    );
  }

  if (archiveTasks.isError || !archiveTasks.data.status) {
    return <p>Error while loading</p>;
  }

  const archiveTasksList = archiveTasks.data.tasks;

  return (
    <>
      <h2 className="text-2xl mb-7">Archived Tasks</h2>
      {archiveTasksList.map((task: any) => (
        <TaskCard
          {...task}
          key={task._id}
          className="mb-1"
          backTo={Links.archiveTask.href}
        />
      ))}
      <Pagination
        className="my-5"
        onPageChange={onPageChange}
        perPage={PER_PAGE}
        totalCount={archiveTasks.data.pagination.count}
      />
    </>
  );
}
