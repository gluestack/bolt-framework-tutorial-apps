import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import { TodoListRepository } from './repositories/todo-list.repository';
import { TodoListItemRepository } from './repositories/todo-list-item.repository';
export declare class TodoService {
    private readonly todoRepository;
    private readonly todoListRepository;
    private readonly todoListItemRepository;
    constructor(todoRepository: Repository<Todo>, todoListRepository: TodoListRepository, todoListItemRepository: TodoListItemRepository);
    getAllTodoLists(): Promise<TodoList[]>;
    getTodoListById(id: number): Promise<TodoList>;
    createTodoList(name: string): Promise<TodoList>;
    updateTodoList(id: number, name: string): Promise<TodoList>;
    deleteTodoList(id: number): Promise<void>;
    getTodoListItems(): Promise<TodoListItem[]>;
    getTodoListItemsById(todoListId: number): Promise<TodoListItem[]>;
    createTodoListItem(todoListId: number, text: string, completed: boolean): Promise<TodoListItem>;
    updateTodoListItem(id: number, text: string, completed: boolean): Promise<TodoListItem>;
    deleteTodoListItem(id: number): Promise<void>;
}
