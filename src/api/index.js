import axios from 'axios'

const API = axios.create({ baseURL:  "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`

    return req;
})

export const getUser = (id) => API.get(`/users/${id}`)
export const getActiveUsersCount = () => API.get('/users/activeCount');
export const getRegisteredCount = () => API.get('/users/registeredCount')
export const signUp = (formData) => API.post('/users/signup', formData);
export const signIn = (formData) => API.post('/users/signin', formData);

export const getCategories = () => API.get('/categories');
export const getCategory = (id) => API.get(`/categories/${id}`)
export const getCategoriesCount = () => API.get('/categories/categoriesCount');
export const addCategory = (formData) => API.post('/categories/add', formData)

export const publishTopic = (formData) => API.post('/topics/publish', formData);
export const getTopics = (id) => API.get(`/topics/${id}`)
export const getTopic = (id) => API.get(`/topics/details/${id}`)

export const addReply = (formData) => API.post('/replies/add', formData);