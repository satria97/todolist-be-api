const Hapi = require('@hapi/hapi');
const activities = require('./api/activities');
const ActivitiesService = require('./services/inMemory/ActivitiesService');

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
    option: {
      service: activitiesService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
