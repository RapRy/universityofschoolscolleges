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
export const getActiveUsersCount = (source) =>
  API.get("/users/activeCount", { cancelToken: source.token });
export const getRegisteredCount = (source) =>
  API.get("/users/registeredCount", { cancelToken: source.token });
export const getNewUsers = (limit, source) =>
  API.get(`/users/newUsers/${limit}`, { cancelToken: source.token });
export const getActiveUsers = (limit, source) =>
  API.get(`/users/activeUsers/${limit}`, { cancelToken: source.token });
export const getRegisteredUsers = () => API.get("/users/registeredUsers");
export const getBlacklistedUsers = () => API.get("/users/blacklistedUsers");
export const getParticipants = (formData, source) =>
  API.get(
    `/users/participants`,
    { params: formData },
    { cancelToken: source.token }
  );
export const getLastCommenter = (id, source) =>
  API.get(`/users/lastcommenter/${id}`, { cancelToken: source.token });
export const signUp = (formData) => API.post("/users/signup", formData);
export const signIn = (formData) => API.post("/users/signin", formData);
export const blockUser = (id) => API.put(`/users/blockuser/${id}`);
export const unblockUser = (id) => API.put(`/users/unblockuser/${id}`);
export const activateUser = (id) => API.put(`/users/activate/${id}`);
export const deactivateUser = (id) => API.put(`/users/deactivate/${id}`);
export const updateUserDetails = (formData) =>
  API.put("/users/updateDetails", formData);

export const getCategories = (source) =>
  API.get("/categories", { cancelToken: source.token });
export const getCategory = (id, source) =>
  API.get(`/categories/${id}`, { cancelToken: source.token });
export const getCategoriesCount = (source) =>
  API.get("/categories/categoriesCount", { cancelToken: source.token });
export const addCategory = (formData) => API.post("/categories/add", formData);
export const updateActiveStatus = (id) =>
  API.put(`/categories/updateStatus/${id}`);
export const getTopicsByUser = (id, source) =>
  API.get(`/users/${id}/topics`, { cancelToken: source.token });

export const voteTopic = (formData) => API.post("/topics/vote", formData);
export const publishTopic = (formData) => API.post("/topics/publish", formData);
export const addTopicViews = (data) => API.post("/topics/views", data);
export const getTopics = (id) => API.get(`/topics/${id}`);
export const getTopic = (id) => API.get(`/topics/details/${id}`);
export const getTopicCount = (source) =>
  API.get("/topics/count", { cancelToken: source.token });
export const getUpVotesCount = (source) =>
  API.get("/topics/votes/upVotesCount", { cancelToken: source.token });
export const getDownVotesCount = (source) =>
  API.get("/topics/votes/downVotesCount", { cancelToken: source.token });
export const getLatestTopics = (limit, source) =>
  API.get(`/topics/latest/limit/${limit}`, { cancelToken: source.token });
export const getHotTopics = (limit, source) =>
  API.get(`/topics/hot/limit/${limit}`, { cancelToken: source.token });
export const getRelatedTopics = (id, source) =>
  API.get(`/topics/related/${id}`, { cancelToken: source.token });
export const getLatestTopicsByCategory = (id, source) =>
  API.get(`/topics/latest/${id}`, { cancelToken: source.token });
export const getHotTopicsByCategory = (id, source) =>
  API.get(`/topics/hot/${id}`, { cancelToken: source.token });
export const getTopicsWithLimit = (limit, source) =>
  API.get(`/topics/fromForum/limit/${limit}`, { cancelToken: source.token });
export const updateTopic = (formData) => API.put("/topics/update", formData);
export const updateTopicActiveStatus = (id) =>
  API.put(`/topics/updateStatus/${id}`);
export const searchTopics = (keyword) => API.get(`/topics/search/${keyword}`);

export const addReply = (formData) => API.post("/replies/add", formData);
export const repliesCount = (source) =>
  API.get("/replies/count", { cancelToken: source.token });
export const getReplies = (id, source) =>
  API.get(`/replies/${id}`, { cancelToken: source.token });
