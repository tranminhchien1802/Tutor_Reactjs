import { get, remove, post } from "../Utils/request";
// Lớp học đã đăng ký
export const getMyCourse = async () => {
  return await get("courses/my-courses", true);
};
// Xóa lớp
export const deleteCourse = async (slug) => {
  return await remove(`courses/${slug}/delete`, true);
};
// Đăng ký lớp
export const createCourse = async (course) => {
  return await post("courses/create", course, true);
};
