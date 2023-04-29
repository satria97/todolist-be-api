const { ActivityPayloadSchema } = require('./schema');

const ActivitiesValidator = {
  validateActivityValidator: (payload) => {
    const validationResult = ActivityPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  }
};

module.exports = ActivitiesValidator;
