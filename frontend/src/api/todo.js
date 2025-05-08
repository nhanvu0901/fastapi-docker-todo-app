import axiosClient from "./axiosClient";

const getListToDo = () => {
  const url = `/todos`
  return axiosClient.get(url)
}

const getSingleTodo = ({id}) => {
  const url = `/todos/${id}`
  return axiosClient.get(url)
}

const createTodo = ({title, description, completed}) => {
  const url = `/todos/`
  return axiosClient.post(url, {
    title,
    description,
    completed
  })
}

const updateToDo = ({updateId, payload}) => {
  const url = `/todos/${updateId}`
  return axiosClient.put(url, payload)
}

export {
  getListToDo,
  getSingleTodo,
  createTodo,
  updateToDo
}