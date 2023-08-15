export const Links = {
  signin: {
    href: "/signin",
    name: "signin",
    title: "Sign-in",
  },
  signup: {
    href: "/signup",
    name: "signup",
    title: "Sign-up",
  },
  task: {
    href: "/dashboard/tasks",
    name: "task",
    title: "Tasks",
    icon: "checkBox",
  },
  archiveTask: {
    href: "/dashboard/tasks/archive",
    name: "archiveTask",
    title: "Task Archive",
    icon: "archive",
  },
  addTask: {
    title: "Add Task",
    name: "addTask",
    href: "/dashboard/add-task",
    icon: "add-list",
  },
  profile: {
    title: "Profile",
    href: "/dashboard",
    icon: "profile",
    name: "profile",
  },
  bucket: {
    title: "Bucket",
    name: "bucket",
    href: "/dashboard/bucket",
    icon: "file",
  },
  manageUser: {
    title: "Manage Users",
    href: "/dashboard/manage-users",
    name: "manageUser",
    icon: "manage",
  },
} as const;
