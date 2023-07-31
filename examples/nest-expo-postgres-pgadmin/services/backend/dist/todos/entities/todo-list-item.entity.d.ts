import { TodoList } from './todo-list.entity';
export declare class TodoListItem {
    id: number;
    text: string;
    completed: boolean;
    todoList: TodoList;
}
