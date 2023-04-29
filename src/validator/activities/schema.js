const Joi = require('joi');

const ActivityPayloadSchema = Joi.object({
  title: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
});

module.exports = { ActivityPayloadSchema };
