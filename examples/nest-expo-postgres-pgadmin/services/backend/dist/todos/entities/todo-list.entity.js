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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
const typeorm_1 = require("typeorm");
const todo_list_item_entity_1 = require("./todo-list-item.entity");
let TodoList = exports.TodoList = class TodoList {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TodoList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TodoList.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todo_list_item_entity_1.TodoListItem, (todoListItem) => todoListItem.todoList, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], TodoList.prototype, "items", void 0);
exports.TodoList = TodoList = __decorate([
    (0, typeorm_1.Entity)()
], TodoList);
//# sourceMappingURL=todo-list.entity.js.map