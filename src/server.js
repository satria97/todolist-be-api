const Hapi = require('@hapi/hapi');
const activities = require('./api/activities');
const ActivitiesService = require('./services/inMemory/ActivitiesService');
const ActivitiesValidator = require('./validator/activities');

const init = async () => {
  const activitiesService = new ActivitiesService();
  const server = Hapi.server({
    port: 3030,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: activities,
    options: {
      service: activitiesService,
      validator: ActivitiesValidator
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
