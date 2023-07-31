"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./entities/todo.entity");
const todo_list_entity_1 = require("./entities/todo-list.entity");
const todo_list_item_entity_1 = require("./entities/todo-list-item.entity");
const todo_list_repository_1 = require("./repositories/todo-list.repository");
const todo_list_item_repository_1 = require("./repositories/todo-list-item.repository");
let TodoService = exports.TodoService = class TodoService {
    constructor(todoRepository, todoListRepository, todoListItemRepository) {
        this.todoRepository = todoRepository;
        this.todoListRepository = todoListRepository;
        this.todoListItemRepository = todoListItemRepository;
    }
    async getAllTodoLists() {
        return this.todoListRepository.find({ order: { id: 'ASC' } });
    }
    async getTodoListById(id) {
        return this.todoListRepository.findOne({ where: { id } });
    }
    async createTodoList(name) {
        const todoList = this.todoListRepository.create({ name });
        return this.todoListRepository.save(todoList);
    }
    async updateTodoList(id, name) {
        const todoList = await this.getTodoListById(id);
        if (!todoList) {
            throw new common_1.NotFoundException(`TodoList with id ${id} not found.`);
        }
        todoList.name = name;
        return this.todoListRepository.save(todoList);
    }
    async deleteTodoList(id) {
        await this.todoListItemRepository.delete({ todoList: { id } });
        await this.todoListRepository.delete(id);
    }
    async getTodoListItems() {
        return this.todoListItemRepository.find();
    }
    async getTodoListItemsById(todoListId) {
        return this.todoListItemRepository.find({ where: { todoList: { id: todoListId } }, order: { id: 'ASC' } });
    }
    async createTodoListItem(todoListId, text, completed) {
        const todoList = await this.getTodoListById(todoListId);
        if (!todoList) {
            throw new common_1.NotFoundException(`TodoList with id ${todoListId} not found.`);
        }
        const todoListItem = this.todoListItemRepository.create({ text, completed, todoList });
        return this.todoListItemRepository.save(todoListItem);
    }
    async updateTodoListItem(id, text, completed) {
        const todoListItem = await this.todoListItemRepository.findOne({
            where: { id },
        });
        if (!todoListItem) {
            throw new common_1.NotFoundException(`TodoListItem with id ${id} not found.`);
        }
        todoListItem.text = text;
        todoListItem.completed = completed;
        return this.todoListItemRepository.save(todoListItem);
    }
    async deleteTodoListItem(id) {
        await this.todoListItemRepository.delete(id);
    }
};
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __param(1, (0, typeorm_1.InjectRepository)(todo_list_entity_1.TodoList)),
    __param(2, (0, typeorm_1.InjectRepository)(todo_list_item_entity_1.TodoListItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        todo_list_repository_1.TodoListRepository,
        todo_list_item_repository_1.TodoListItemRepository])
], TodoService);
//# sourceMappingURL=todo.service.js.map