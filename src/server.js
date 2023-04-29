const Hapi = require('@hapi/hapi');
const activities = require('./api/activities');
const ActivitiesService = require('./services/inMemory/ActivitiesService');
const ActivitiesValidator = require('./validator/activities');

const ClientError = require('./exceptions/ClientError');
const todos = require('./api/todos');
const TodosService = require('./services/inMemory/TodosService');
const TodosValidator = require('./validator/todos');

const init = async () => {
  const activitiesService = new ActivitiesService();
  const todosService = new TodosService();
  const server = Hapi.server({
    port: 3030,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: activities,
      options: {
        service: activitiesService,
        validator: ActivitiesValidator
      },
    },
    {
      plugin: todos,
      options: {
        service: todosService,
        validator: TodosValidator
      },
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
    if (response instanceof Error) {
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }
      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
