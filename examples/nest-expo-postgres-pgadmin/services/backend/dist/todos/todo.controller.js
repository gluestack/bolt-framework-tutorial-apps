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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const todo_item_dto_1 = require("./todo-item.dto");
let TodoController = exports.TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async getAllTodoLists() {
        return this.todoService.getAllTodoLists();
    }
    async getTodoListById(id) {
        return this.todoService.getTodoListById(id);
    }
    async createTodoList(name) {
        return this.todoService.createTodoList(name);
    }
    async updateTodoList(id, name) {
        return this.todoService.updateTodoList(id, name);
    }
    async deleteTodoList(id) {
        console.log(id);
        return this.todoService.deleteTodoList(id);
    }
    async getTodoListItemsById(todoListId) {
        return this.todoService.getTodoListItemsById(todoListId);
    }
    async createTodoListItem(todoListId, todoItemDto) {
        const { text, completed } = todoItemDto;
        return this.todoService.createTodoListItem(todoListId, text, completed);
    }
    async getAllTodoListItems() {
        return this.todoService.getTodoListItems();
    }
    async updateTodoListItem(id, todoItemDto) {
        const { text, completed } = todoItemDto;
        return this.todoService.updateTodoListItem(id, text, completed);
    }
    async deleteTodoListItem(id) {
        return this.todoService.deleteTodoListItem(id);
    }
};
__decorate([
    (0, common_1.Get)('lists'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getAllTodoLists", null);
__decorate([
    (0, common_1.Get)('lists/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodoListById", null);
__decorate([
    (0, common_1.Post)('lists'),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createTodoList", null);
__decorate([
    (0, common_1.Put)('lists/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodoList", null);
__decorate([
    (0, common_1.Delete)('lists/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodoList", null);
__decorate([
    (0, common_1.Get)('lists/:id/items'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodoListItemsById", null);
__decorate([
    (0, common_1.Post)('lists/:id/items'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, todo_item_dto_1.TodoItemDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createTodoListItem", null);
__decorate([
    (0, common_1.Get)('lists/items'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getAllTodoListItems", null);
__decorate([
    (0, common_1.Put)('lists/items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, todo_item_dto_1.TodoItemDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodoListItem", null);
__decorate([
    (0, common_1.Delete)('lists/items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodoListItem", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map