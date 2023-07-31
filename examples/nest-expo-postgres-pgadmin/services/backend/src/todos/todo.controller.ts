import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import { TodoService } from './todo.service';
import { TodoItemDto } from './todo-item.dto';
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('lists')
  async getAllTodoLists(): Promise<TodoList[]> {
    return this.todoService.getAllTodoLists();
  }

  @Get('lists/:id')
  async getTodoListById(@Param('id') id: number): Promise<TodoList> {
    return this.todoService.getTodoListById(id);
  }

  @Post('lists')
  async createTodoList(@Body('name') name: string): Promise<TodoList> {
    return this.todoService.createTodoList(name);
  }

  @Put('lists/:id')
  async updateTodoList(
    @Param('id') id: number,
    @Body('name') name: string,
  ): Promise<TodoList> {
    return this.todoService.updateTodoList(id, name);
  }

  @Delete('lists/:id')
  async deleteTodoList(@Param('id') id: number): Promise<void> {
    console.log(id)
    return this.todoService.deleteTodoList(id);
  }


  @Get('lists/:id/items')
  async getTodoListItemsById(@Param('id') todoListId: number): Promise<TodoListItem[]> {
    return this.todoService.getTodoListItemsById(todoListId);
  }
  @Post('lists/:id/items')
  async createTodoListItem(
    @Param('id') todoListId: number,
     @Body() todoItemDto: TodoItemDto,
  ): Promise<TodoListItem> {
    const { text, completed } = todoItemDto;
    return this.todoService.createTodoListItem(todoListId, text,completed);
  }
  @Get('lists/items') 
  async getAllTodoListItems(): Promise<TodoListItem[]> {
    return this.todoService.getTodoListItems();
  }
  @Put('lists/items/:id')
  async updateTodoListItem(
    @Param('id') id: number,
    @Body() todoItemDto: TodoItemDto,
  ): Promise<TodoListItem> {
    const { text, completed } = todoItemDto;
    return this.todoService.updateTodoListItem(id, text,completed);
  }

  @Delete('lists/items/:id')
  async deleteTodoListItem(@Param('id') id: number): Promise<void> {
    return this.todoService.deleteTodoListItem(id);
  }
}
