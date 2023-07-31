// src/todos/repositories/todo-list.repository.ts

import { EntityRepository, Repository } from 'typeorm';
import { TodoList } from '../entities/todo-list.entity';

@EntityRepository(TodoList)
export class TodoListRepository extends Repository<TodoList> {}
