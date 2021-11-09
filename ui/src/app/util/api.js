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
  getCategory(categoryId){
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/categories/${categoryId}`)
  },
  getGuides(){
    return axios.get("http://localhost:8080/NUStartApplication-war/webresources/guides")
  },
  getGuide(guideId) {
    return axios.get(`http://localhost:8080/NUStartApplication-war/webresources/guides/${guideId}`)
  },
  createGuide(categoryId, guide) {
    return axios.post(`http://localhost:8080/NUStartApplication-war/webresources/categories/${categoryId}/guides`, guide)
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
  editComment(guideId, comment) {
    return axios.put(`http://localhost:8080/NUStartApplication-war/webresources/guides/${guideId}/comments`, comment)
  }, 
  editUser(id, user) {
    return axios.put(`http://localhost:8080/NUStartApplication-war/webresources/users/${id}`, user)
  },
  editGuide(categoryId, guide) {
    return axios.put(`http://localhost:8080/NUStartApplication-war/webresources/categories/${categoryId}/guides`, guide)
  },
  editThread(forumId, thread) {
    return axios.put(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads`, thread)
  },
  editPost(forumId, threadId, post) {
    return axios.put(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads/${threadId}/posts`, post)
  },
  createComment(guideId, comment) {
    return axios.post(`http://localhost:8080/NUStartApplication-war/webresources/guides/${guideId}/comments`, comment)
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
  createLink(guideId, link) {
    return axios.post(`http://localhost:8080/NUStartApplication-war/webresources/guides/${guideId}`, link)
  },
  deletePost(forumId, threadId, postId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads/${threadId}/posts/${postId}`)
  },
  deleteGuide(categoryId, guideId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/categories/${categoryId}/guides/${guideId}`)
  },
  deleteThread(forumId, threadId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/forums/${forumId}/threads/${threadId}`)
  },
  deleteCategory(categoryId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/categories/${categoryId}`)
  },
  deleteComment(guideId, commentId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/guides/${guideId}/comments/${commentId}`)
  },

  deleteLink(guideId, linkId) {
    return axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/guides/${guideId}/links/${linkId}`)
  }
}

export default api