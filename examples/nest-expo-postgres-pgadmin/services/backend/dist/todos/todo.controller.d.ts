import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import { TodoService } from './todo.service';
import { TodoItemDto } from './todo-item.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getAllTodoLists(): Promise<TodoList[]>;
    getTodoListById(id: number): Promise<TodoList>;
    createTodoList(name: string): Promise<TodoList>;
    updateTodoList(id: number, name: string): Promise<TodoList>;
    deleteTodoList(id: number): Promise<void>;
    getTodoListItemsById(todoListId: number): Promise<TodoListItem[]>;
    createTodoListItem(todoListId: number, todoItemDto: TodoItemDto): Promise<TodoListItem>;
    getAllTodoListItems(): Promise<TodoListItem[]>;
    updateTodoListItem(id: number, todoItemDto: TodoItemDto): Promise<TodoListItem>;
    deleteTodoListItem(id: number): Promise<void>;
}
