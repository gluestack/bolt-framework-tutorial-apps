import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todos/todo.module';
import postgresConfig from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(postgresConfig), TodoModule],
})
export class AppModule {}
