import axios from "axios"
import { getUser } from "./Common"

const api = {
  login(user) {
    return axios.post(`http://localhost:8080/NUStartApplication-war/webresources/users/login`, user)
  },
  register(user) {
    return axios.post("http://localhost:8080/NUStartApplication-war/webresources/users", user)
  },
  getUsers() {
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/users`)
  },
  getUser(id = getUser()) {
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/users/${id}`)
  },
  getContactSize() {
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/users/contactsId`)
  },
  getForums() {
    return axios.get("http://localhost:8080/NUStartApplication-war/webresources/forums")
  },
  getForum(id) {
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/forums/${id}`)
  },
  getThread(id) {
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/threads/${id}`)
  },
  editUser(id, user) {
    return axios.put(`http://localhost:8080/NUStartApplication-war/webresources/users/${id}`, user)
  },
  editThread(forumId, thread) {
    return axios.put(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads`, thread)
  },
  createForum(forum) {
    return axios.post(`http://localhost:8080/NUStartApplication-war/webresources/forums`, forum)
  },
  createPost(forumId, threadId, post) {
    return axios.post(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads/${threadId}/posts`, post)
  },
  createThread(forumId, thread) {
    return axios
      .post(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads`, thread)
  },
  deletePost(forumId, threadId, postId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads/${threadId}/posts/${postId}`)
  },
  deleteThread(forumId, threadId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads/${threadId}`)
  }
  
}

export default api