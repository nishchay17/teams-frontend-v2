import { Links } from "./links";

export const AdminDashboardNav = [
  Links.task,
  Links.addTask,
  Links.bucket,
  Links.manageUser,
] as const;

export const UserDashboardNav = [
  Links.task,
  Links.addTask,
  Links.bucket,
] as const;
