import axios, { AxiosResponse } from "axios";
import { Task } from "../models/Task";

axios.defaults.baseURL = " http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Tasks = {
  list: () => requests.get<Task[]>("/task"),
  details: (id: number) => requests.get<Task>(`/task/${id}`),
  create: (task: Task) => axios.post<void>("/task", task),
  update: (task: Task) => axios.put<void>("/task", task),
  delete: (id: number) => axios.delete<void>(`/task/${id}`),
};

const agent = {
  Tasks,
};

export default agent;
