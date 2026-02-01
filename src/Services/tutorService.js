import { get, post } from "../Utils/request";

export const getTutors = async (page) => {
  return await get(`tutors?page=${page}`);
};
// chi tiet
export const getDetailTutor = async (slug) => {
  return await get(`tutors/${slug}`);
};
// tim kiem
export const searchTutor = async (search) => {
  return await get(`tutors/filter?keyword=${search}`);
};
// Lọc
export const filterTutor = async (filter) => {
  return await get(`tutors/filter?specialization=${filter}`);
};
// Lấy đánh giá
export const getReview = async (slug) => {
  return await get(`reviews/${slug}/list`, true);
};
// Thêm đánh giá
export const postReview = async (slug, selectedRating, comment) => {
  return await post(
    `reviews/${slug}`,
    { rating: selectedRating, comment },
    true
  );
};
// register course
export const registerCourse = async (course) => {
  return await post("courses/register-Course", { courseId: course._id }, true);
};
