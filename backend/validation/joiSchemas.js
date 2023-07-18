const Joi = require("joi");

const regexLinkImage = /^https?:\/\/[a-z\d.-]+\.[a-z]{2,}(?:\/.*)*$/i;

const nameSchema = Joi.string().min(2).max(30);
const aboutSchema = Joi.string().min(2).max(30);
const avatarSchema = Joi.string()
  .uri({ scheme: ["http", "https"] })
  .regex(regexLinkImage);
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().required();

const namePlaceSchema = Joi.string().min(2).max(30).required();
const linkSchema = Joi.string()
  .uri({ scheme: ["http", "https"] })
  .regex(regexLinkImage)
  .required();

module.exports = {
  nameSchema,
  aboutSchema,
  avatarSchema,
  emailSchema,
  passwordSchema,
  namePlaceSchema,
  linkSchema,
};
