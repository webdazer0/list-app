import axios from "axios";
import GLOBAL from "../Global";

export const instance = axios.create({
  baseURL: GLOBAL.url,
});

export const apiService = {
  // USERS
  getUsers: () => {
    return instance
      .get("/users")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createUser: (user) => {
    return instance
      .post("/users/add", user)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // TASKS
  getTasks: () => {
    return instance
      .get("/tasks")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createTask: (task) => {
    return instance
      .post("/tasks/add", task)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getTaskById: (id) => {
    return instance
      .get(`/tasks/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateTaskById: (id, task) => {
    return instance
      .put(`/tasks/${id}`, task)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteTaskById: (id) => {
    return instance
      .delete(`/tasks/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

const errorHandler = (error) => {
  if (typeof Error === "NetWorkError") {
    throw new Error("No Internet Connection ");
  }
  throw error;
};
