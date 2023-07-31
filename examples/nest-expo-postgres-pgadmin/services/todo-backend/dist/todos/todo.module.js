"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_entity_1 = require("./entities/todo.entity");
const todo_list_entity_1 = require("./entities/todo-list.entity");
const todo_list_item_entity_1 = require("./entities/todo-list-item.entity");
const todo_service_1 = require("./todo.service");
const todo_controller_1 = require("./todo.controller");
const todo_list_repository_1 = require("./repositories/todo-list.repository");
const todo_list_item_repository_1 = require("./repositories/todo-list-item.repository");
let TodoModule = exports.TodoModule = class TodoModule {
};
exports.TodoModule = TodoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([todo_entity_1.Todo, todo_list_entity_1.TodoList, todo_list_repository_1.TodoListRepository, todo_list_item_entity_1.TodoListItem, todo_list_item_repository_1.TodoListItemRepository]),
        ],
        providers: [todo_service_1.TodoService],
        controllers: [todo_controller_1.TodoController],
    })
], TodoModule);
//# sourceMappingURL=todo.module.js.map