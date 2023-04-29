const routes = (handler) => [
  {
    method: 'POST',
    path: '/activity',
    handler: handler.postActivityHandler,
  },
  {
    method: 'GET',
    path: '/activity',
    handler: handler.getActivitiesHandler
  },
  {
    method: 'GET',
    path: '/activity/{id}',
    handler: handler.getActivityByIdHandler,
  },
  {
    method: 'PUT',
    path: '/activity/{id}',
    handler: handler.editActivityByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/activity/{id}',
    handler: handler.deleteActivityByIdHandler
  }
];

module.exports = routes;
