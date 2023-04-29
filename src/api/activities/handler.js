class ActivitiesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postActivityHandler = this.postActivityHandler.bind(this);
    this.getActivitiesHandler = this.getActivitiesHandler.bind(this);
    this.getActivityByIdHandler = this.getActivityByIdHandler.bind(this);
    this.putActivityByIdHandler = this.putActivityByIdHandler.bind(this);
    this.deleteActivityByIdHandler = this.deleteActivityByIdHandler.bind(this);
  }

  postActivityHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);
      const activityId = this._service.addActivity(request.payload);
      const response = h.response({
        status: 'success',
        message: 'Activity added successfully',
        data: {
          activityId,
        }
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      });
      response.code(400);
      return response;
    }
  }

  getActivitiesHandler() {
    const activities = this._service.getActivities();
    return {
      status: 'success',
      data: {
        activities,
      },
    };
  }

  getActivityByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const activity = this._service.getActivityById(id);
      return {
        status: 'success',
        data: {
          activity,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      });
      response.code(404);
      return response;
    }
  }

  putActivityByIdHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);
      const { id } = request.params;
      this._service.editActivityById(id, request.payload);
      return {
        status: 'success',
        message: 'Activity updated successfully'
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      });
      response.code(404);
      return response;
    }
  }

  deleteActivityByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteActivityById(id);
      return {
        status: 'success',
        message: 'Activity deleted successfully'
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = ActivitiesHandler;
