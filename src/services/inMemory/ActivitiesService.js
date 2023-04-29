const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ActivitiesService {
  constructor() {
    this._activities = [];
  }

  addActivity({ title, email }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newActivity = {
      title, email, id, createdAt, updatedAt
    };
    this._activities.push(newActivity);

    const isSuccess = this._activities.filter((activity) => activity.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Activity failed to add');
    }

    return id;
  }

  getActivities() {
    return this._activities;
  }

  getActivityById(id) {
    const activity = this._activities.filter((n) => n.id === id)[0];
    if (!activity) {
      throw new NotFoundError('Activity not found');
    }
    return activity;
  }

  editActivityById(id, { title, email }) {
    const index = this._activities.findIndex((activity) => activity.id === id);
    if (index === -1) {
      throw new NotFoundError('Failed to update the activity. Id not found');
    }

    const updatedAt = new Date().toISOString();

    this._activities[index] = {
      ...this._activities,
      title,
      email,
      updatedAt,
    };
  }

  deleteActivityById(id) {
    const index = this._activities.findIndex((activity) => activity.id === id);
    if (index === -1) {
      throw new NotFoundError('Failde to delete activity. Id not found');
    }
    this._activities.splice(index, 1);
  }
}

module.exports = ActivitiesService;
