const { nanoid } = require('nanoid');

class ActivitiesService {
  constructor() {
    this._activities = [];
  }

  addActivity({ title, email }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();

    const newActivity = {
      title, email, id, createdAt,
    };
    this._activities.push(newActivity);

    const isSuccess = this._activities.filter((activity) => activity.id === id).length > 0;
    if (!isSuccess) {
      throw new Error('Activity failed to add');
    }

    return id;
  }

  getActivities() {
    return this._activities;
  }

  getActivityById(id) {
    const activity = this._activities.filter((n) => n.id === id)[0];
    if (!activity) {
      throw new Error('Activity not found');
    }
    return activity;
  }

  editActivityById(id, { title, email }) {
    const index = this._activities.findIndex((activity) => activity.id === id);
    if (index === -1) {
      throw new Error('Failed to update the activity. Id not found');
    }

    this._activities[index] = {
      ...this._activities,
      title,
      email
    };
  }

  deleteActivityById(id) {
    const index = this._activities.findIndex((activity) => activity.id === id);
    if (index === -1) {
      throw new Error('Failde to delete activity. Id not found');
    }
    this._activities.splice(index, 1);
  }
}

module.exports = ActivitiesService;
