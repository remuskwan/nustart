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
  getCategories(){
    return axios.get("http://localhost:8080/NUStartApplication-war/webresources/categories")
  },
  getGuides(){
    return axios.get("http://localhost:8080/NUStartApplication-war/webresources/guides")
  },
  getGuide(gid) {
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/guides/${gid}`)
  },
  createGuide(guide) {
    return axios.post(`http://localhost:8080/NUStartApplication-war/webresources/guides`, guide)
  },
  editGuide(gid, guide) {
    return axios.put(`http://localhost:8080/NUStartApplication-war/webresources/guides/${gid}`, guide)
  },
  deleteGuide(gid) {
    return axios.put(`http://localhost:8080/NUStartApplication-war/webresources/guides/${gid}`)
  },
  getComments(gid) {
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/guides/${gid}`)
  },
  getCommentReplies(cid) {
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/guides/${cid}`)
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
  createCategory(category) {
    return axios.post(`http://localhost:8080/NUStartApplication-war/webresources/categories`, category)
  },
  deletePost(forumId, threadId, postId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads/${threadId}/posts/${postId}`)
  },
  deleteThread(forumId, threadId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads/${threadId}`)
  },
  deleteCategory(categoryId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/categories/${categoryId}`)
  }
}

export default api