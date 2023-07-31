import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

export const getAllTodoLists = () => axios.get(`${API_BASE_URL}/todos/lists`);
export const getTodoListById = (id: number) => axios.get(`${API_BASE_URL}/todos/lists/${id}`);
export const createTodoList = (name: string) => axios.post(`${API_BASE_URL}/todos/lists`, { name });
export const updateTodoList = (id: number, name: string) => axios.put(`${API_BASE_URL}/todos/lists/${id}`, { name });
export const deleteTodoList = (id: number) => axios.delete(`${API_BASE_URL}/todos/lists/${id}`);
export const createTodoListItem = (todoListId: number, text: string) => axios.post(`${API_BASE_URL}/todos/lists/${todoListId}/items`, { text,completed:false });
export const updateTodoListItem = (id: number, text: string,completed:boolean) => axios.put(`${API_BASE_URL}/todos/lists/items/${id}`, { text,completed});
export const deleteTodoListItem = (id: number) => axios.delete(`${API_BASE_URL}/todos/lists/items/${id}`);
export const getTodoListItemsById = (id: number) => axios.get(`${API_BASE_URL}/todos/lists/${id}/items`);
