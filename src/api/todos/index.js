const TodosHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'todos',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const todosHandler = new TodosHandler(service, validator);
    server.route(routes(todosHandler));
  },
};
