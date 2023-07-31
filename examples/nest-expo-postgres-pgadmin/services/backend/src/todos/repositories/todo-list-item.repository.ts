// src/todos/repositories/todo-list-item.repository.ts

import { EntityRepository, Repository } from 'typeorm';
import { TodoListItem } from '../entities/todo-list-item.entity';

@EntityRepository(TodoListItem)
export class TodoListItemRepository extends Repository<TodoListItem> {}
