import axios from "axios";

const API = axios.create({
  // baseURL: "https://universityofschoolscolleges.herokuapp.com",
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile"))
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;

  return req;
});

export const getUser = (id, source) =>
  API.get(`/users/${id}`, { cancelToken: source.token });
export const getTopicsByUser = (id) => API.get(`/users/${id}/topics`);
export const getActiveUsersCount = () => API.get("/users/activeCount");
export const getRegisteredCount = () => API.get("/users/registeredCount");
export const getNewUsers = (limit) => API.get(`/users/newUsers/${limit}`);
export const getActiveUsers = (limit) => API.get(`/users/activeUsers/${limit}`);
export const getRegisteredUsers = () => API.get("/users/registeredUsers");
export const getBlacklistedUsers = () => API.get("/users/blacklistedUsers");
export const getParticipants = (formData, source) =>
  API.get(
    `/users/participants`,
    { params: formData },
    { cancelToken: source.token }
  );
export const signUp = (formData) => API.post("/users/signup", formData);
export const signIn = (formData) => API.post("/users/signin", formData);
export const blockUser = (id) => API.put(`/users/blockuser/${id}`);
export const unblockUser = (id) => API.put(`/users/unblockuser/${id}`);
export const activateUser = (id) => API.put(`/users/activate/${id}`);
export const deactivateUser = (id) => API.put(`/users/deactivate/${id}`);
export const updateUserDetails = (formData) =>
  API.put("/users/updateDetails", formData);

export const getCategories = () => API.get("/categories");
export const getCategory = (id, source) =>
  API.get(`/categories/${id}`, { cancelToken: source.token });
export const getCategoriesCount = () => API.get("/categories/categoriesCount");
export const addCategory = (formData) => API.post("/categories/add", formData);
export const updateActiveStatus = (id) =>
  API.put(`/categories/updateStatus/${id}`);

export const publishTopic = (formData) => API.post("/topics/publish", formData);
export const addTopicViews = (data) => API.post("/topics/views", data);
export const getTopics = (id) => API.get(`/topics/${id}`);
export const getTopic = (id) => API.get(`/topics/details/${id}`);
export const getTopicCount = () => API.get("/topics/count");
export const getLatestTopics = (limit) =>
  API.get(`/topics/latest/limit/${limit}`);
export const getHotTopics = (limit) => API.get(`/topics/hot/limit/${limit}`);
export const getRelatedTopics = (id) => API.get(`/topics/related/${id}`);
export const getLatestTopicsByCategory = (id) =>
  API.get(`/topics/latest/${id}`);
export const getHotTopicsByCategory = (id) => API.get(`/topics/hot/${id}`);
export const getTopicsWithLimit = (limit, source) =>
  API.get(`/topics/fromForum/limit/${limit}`, { cancelToken: source.token });
export const updateTopic = (formData) => API.put("/topics/update", formData);
export const updateTopicActiveStatus = (id) =>
  API.put(`/topics/updateStatus/${id}`);
export const searchTopics = (keyword) => API.get(`/topics/search/${keyword}`);

export const addReply = (formData) => API.post("/replies/add", formData);
export const repliesCount = () => API.get("/replies/count");
export const getReplies = (id) => API.get(`/replies/${id}`);
