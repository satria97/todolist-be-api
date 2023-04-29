const InvariantError = require('../../exceptions/InvariantError');
const { TodoPayloadSchema } = require('./schema');

const TodosValidator = {
  validateTodoPayload: (payload) => {
    const validationResult = TodoPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = TodosValidator;
