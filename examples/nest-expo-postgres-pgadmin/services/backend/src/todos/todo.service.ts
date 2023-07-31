// src/todos/todo.service.ts

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Todo } from './entities/todo.entity';

// @Injectable()
// export class TodoService {
//   constructor(
//     @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
//   ) {}

//   async getAllTodos(): Promise<Todo[]> {
//     return this.todoRepository.find({ order: { id: 'ASC' } });
//   }

//   async getTodoById(id: number): Promise<Todo> {
//     return this.todoRepository.findOne({ where: { id } });
//   }

//   async createTodo(todo: Todo): Promise<Todo> {
//     return this.todoRepository.save(todo);
//   }

//   async updateTodo(todo: Todo): Promise<Todo> {
//     const existingTodo = await this.getTodoById(todo.id);
//     if (!existingTodo) {
//       throw new NotFoundException(`Todo with id ${todo.id} not found.`);
//     }

//     // Update only the fields that you want to change
//     existingTodo.title = todo.title;
//     existingTodo.completed = todo.completed;

//     return this.todoRepository.save(existingTodo);
//   }

//   async deleteTodo(id: number): Promise<void> {
//     await this.todoRepository.delete(id);
//   }
// }

// src/todos/todo.service.ts

// src/todos/todo.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import { TodoListRepository } from './repositories/todo-list.repository';
import { TodoListItemRepository } from './repositories/todo-list-item.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(TodoList)
    private readonly todoListRepository: TodoListRepository,
    @InjectRepository(TodoListItem)
    private readonly todoListItemRepository: TodoListItemRepository,
  ) {}

  // Existing methods for Todo entity

  // New methods for TodoList entity

  async getAllTodoLists(): Promise<TodoList[]> {
    return this.todoListRepository.find({ order: { id: 'ASC' } });
  }

  async getTodoListById(id: number): Promise<TodoList> {
    return this.todoListRepository.findOne({ where: { id } });
  }

  async createTodoList(name: string): Promise<TodoList> {
    const todoList = this.todoListRepository.create({ name });
    return this.todoListRepository.save(todoList);
  }

  async updateTodoList(id: number, name: string): Promise<TodoList> {
    const todoList = await this.getTodoListById(id);
    if (!todoList) {
      throw new NotFoundException(`TodoList with id ${id} not found.`);
    }
    todoList.name = name;
    return this.todoListRepository.save(todoList);
  }

  async deleteTodoList(id: number): Promise<void> {
    await this.todoListItemRepository.delete({ todoList: { id } });
    await this.todoListRepository.delete(id);
  }

  // New methods for TodoListItem entity

  async getTodoListItems(): Promise<TodoListItem[]> {
    return this.todoListItemRepository.find();
  }
  async getTodoListItemsById(todoListId: number): Promise<TodoListItem[]> {
    return this.todoListItemRepository.find({ where: { todoList: { id: todoListId } } ,    order: { id: 'ASC' }} // Replace 'id' with the actual column name to order by that column
    );
  }
  async createTodoListItem(
    todoListId: number,
    text: string,completed:boolean
  ): Promise<TodoListItem> {
    const todoList = await this.getTodoListById(todoListId);
    if (!todoList) {
      throw new NotFoundException(`TodoList with id ${todoListId} not found.`);
    }
    const todoListItem = this.todoListItemRepository.create({ text,completed, todoList });
    return this.todoListItemRepository.save(todoListItem);
  }

  async updateTodoListItem(
    id: number,
    text: string,
    completed: boolean,
  ): Promise<TodoListItem> {
    const todoListItem = await this.todoListItemRepository.findOne({
      where: { id },
    });
    if (!todoListItem) {
      throw new NotFoundException(`TodoListItem with id ${id} not found.`);
    }
    todoListItem.text = text;
    todoListItem.completed = completed;
    return this.todoListItemRepository.save(todoListItem);
  }

  async deleteTodoListItem(id: number): Promise<void> {
    await this.todoListItemRepository.delete(id);
  }
}
