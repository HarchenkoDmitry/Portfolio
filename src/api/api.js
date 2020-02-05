import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
  withCredentials: true
});

export const projectAPI = {
  getProjects(currentPage = 1, limit = 8) {
    return instance
      .get(`portfolio?page=${currentPage}&limit=${limit}`)
      .then(response => response.data)
      .then(data => {
        data.projects.map(project => {
          project.id = project._id;
          delete project._id;
          return project
        });
        return data;
      });
  },

  getProjectsItem(id) {
    return instance
      .get(`/portfolio/${id}`)
      .then(response => response.data)
      .then(data => {
        data.id = data._id;
        delete data._id;
        return data;
      });
  },

  addLike(id) {
    return instance
      .post(`like/${id}`)
      .then((response) => {
        return response.status === 200
      })
  },

  removeLike(id) {
    return instance
      .delete(`like/${id}`)
      .then((response) => {
        return response.status === 200
      })
  }
};
