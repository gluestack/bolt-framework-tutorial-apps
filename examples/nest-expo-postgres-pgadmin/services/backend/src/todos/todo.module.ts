// src/todos/todo.module.ts

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Todo } from './entities/todo.entity';
// import { TodoService } from './todo.service';
// import { TodoController } from './todo.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([Todo])],
//   providers: [TodoService],
//   controllers: [TodoController],
// })
// export class TodoModule {}
// src/todos/todo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

import { TodoListRepository } from './repositories/todo-list.repository'; // Import the TodoListRepository
import { TodoListItemRepository } from './repositories/todo-list-item.repository'; // Import the TodoListItemRepository

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo, TodoList, TodoListRepository, TodoListItem, TodoListItemRepository]),
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
