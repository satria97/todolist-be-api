const routes = (handler) => [
  {
    method: 'POST',
    path: '/activities',
    handler: handler.postActivityHandler,
  },
  {
    method: 'GET',
    path: '/activities',
    handler: handler.getActivitiesHandler
  },
  {
    method: 'GET',
    path: '/activities/{id}',
    handler: handler.getActivityByIdHandler,
  },
  {
    method: 'PUT',
    path: '/activities/{id}',
    handler: handler.editActivityByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/activities/{id}',
    handler: handler.deleteActivityByIdHandler
  }
];

module.exports = routes;
