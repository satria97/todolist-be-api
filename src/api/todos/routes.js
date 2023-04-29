const routes = (handler) => [
  {
    method: 'POST',
    path: '/todos',
    handler: handler.postTodoHandler,
  },
  {
    method: 'GET',
    path: '/todos',
    handler: handler.getTodosHandler,
  },
  {
    method: 'GET',
    path: '/todos/{id}',
    handler: handler.getTodoByIdHandler,
  },
  {
    method: 'PUT',
    path: '/todos/{id}',
    handler: handler.putTodoByIdHandler,
  },
  {
    method: 'DELELE',
    path: '/todos/{id}',
    handler: handler.deleteTodoByIdHandler
  },
];

module.exports = routes;
