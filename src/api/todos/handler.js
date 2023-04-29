class TodosHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postTodoHandler = this.postTodoHandler.bind(this);
    this.getTodosHandler = this.getTodosHandler.bind(this);
    this.getTodoByIdHandler = this.getTodoByIdHandler.bind(this);
    this.putTodoByIdHandler = this.putTodoByIdHandler.bind(this);
    this.deleteTodoByIdHandler = this.deleteTodoByIdHandler.bind(this);
  }

  postTodoHandler(request, h) {
    this._validator.validateTodoPayload(request.payload);
    const todoId = this._service.addTodo(request.payload);
    const response = h.response({
      status: 'success',
      message: 'Todo added successfully',
      data: {
        todoId,
      }
    });
    response.code(201);
    return response;
  }

  getTodosHandler() {
    const todos = this._service.getTodos();
    return {
      status: 'success',
      data: {
        todos,
      },
    };
  }

  getTodoByIdHandler(request) {
    const { id } = request.params;
    const todo = this._service.getTodoById(id);
    return {
      status: 'success',
      data: {
        todo,
      },
    };
  }

  putTodoByIdHandler(request) {
    this._validator.validateTodoPayload(request.payload);
    const { id } = request.params;
    this._service.editTodoById(id);
    return {
      status: 'success',
      message: 'Todo updated successfully'
    };
  }

  deleteTodoByIdHandler(request) {
    const { id } = request.params;
    this._service.deleteTodoById(id);
    return {
      status: 'success',
      message: 'Todo deleted successfully'
    };
  }
}

module.exports = TodosHandler;
