const ActivitiesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'activities',
  version: '1.0.0',
  register: async (server, { service }) => {
    const activitiesHandlder = new ActivitiesHandler(service);
    server.route(routes(activitiesHandlder));
  },
};
