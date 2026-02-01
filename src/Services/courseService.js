import { get, post } from "../Utils/request";
// get courses
export const getCourses = async (page) => {
  return await get(`courses?page=${page}`);
};
// get course detail
export const getCourseDetail = async (slug) => {
  return await get(`courses/${slug}`);
};
// Search
export const searchCourse = async (search) => {
  return await get(`courses?keyword=${search}`);
};
