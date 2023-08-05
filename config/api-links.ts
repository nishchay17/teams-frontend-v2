export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const apiLinks = {
  addTask: BASE_URL + "/task/create/v2",
  login: BASE_URL + "/user/login",
};
