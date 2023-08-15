export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const apiLinks = {
  addTask: BASE_URL + "/task/create/v2",
  getTask: BASE_URL + "/task/",
  editTask: BASE_URL + "/task/",
  archiveTask: BASE_URL + "/task/archive/",
  login: BASE_URL + "/user/login",
  allUser: BASE_URL + "/user/all",
  myUser: BASE_URL + "/user/me",
  addUser: BASE_URL + "/user/create-user",
  addBucketItem: BASE_URL + "/bucket/upload",
  getBucketItem: BASE_URL + "/bucket/get-all",
} as const;
