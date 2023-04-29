const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class TodosService {
  constructor() {
    this._todos = [];
  }

  addTodos({ title, priority }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const isActive = false;
    const groupId = `group-${nanoid(16)}`;

    const newTodo = {
      title, priority, isActive, groupId, createdAt, updatedAt, id
    };

    this._todos.push(newTodo);
    const isSuccess = this._todos.filter((todo) => todo.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Todo failed to add');
    }
    return id;
  }

  getTodos() {
    return this._todos;
  }

  getTodoById(id) {
    const todo = this._todos.filter((t) => t.id === id)[0];
    if (!todo) {
      throw new NotFoundError('Todo not found');
    }
    return todo;
  }

  editTodoById(id, { title, priority }) {
    const index = this._todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundError('Failed to update the todo. Id not found');
    }
    const updatedAt = new Date().toISOString();
    this._todos[index] = {
      ...this._todos[index],
      title,
      priority,
      updatedAt
    };
  }

  deleteTodoById(id) {
    const index = this._activities.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundError('Failed to delete todo. Id not found');
    }
    this._activities.splice(index, 1);
  }
}

module.exports = TodosService;
