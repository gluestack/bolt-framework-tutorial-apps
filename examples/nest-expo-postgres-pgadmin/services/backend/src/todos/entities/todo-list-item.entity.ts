import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class TodoListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  completed: boolean ;


  @ManyToOne(() => TodoList, (todoList) => todoList.items)
  todoList: TodoList;
}
