import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TodoListItem } from './todo-list-item.entity';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TodoListItem, (todoListItem) => todoListItem.todoList, {
    cascade: true,
  })
  items: TodoListItem[];
}
