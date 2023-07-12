const { celebrate, Segments } = require("celebrate");
const Joi = require("joi");
const {
  nameSchema,
  aboutSchema,
  avatarSchema,
  emailSchema,
  passwordSchema,
  namePlaceSchema,
  linkSchema
} = require("./joiSchemas");
// eslint-disable-next-line import/order
const { ObjectId } = require("mongoose").Types;

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: namePlaceSchema,
    link: linkSchema
  })
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: nameSchema,
    about: aboutSchema,
    avatar: avatarSchema,
    email: emailSchema,
    password: passwordSchema
  })
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: nameSchema,
    about: aboutSchema
  })
});

const updateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: avatarSchema
  })
});

const getUserByIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!ObjectId.isValid(value)) {
          return helpers.message("Некорректный id пользователя");
        }
        return value;
      })
  })
});

const getCardByIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!ObjectId.isValid(value)) {
          return helpers.message("Некорректный id карточки");
        }
        return value;
      })
  })
});

module.exports = {
  getUserByIdValidator,
  createUserValidator,
  updateUserValidator,
  updateUserAvatar,
  createCardValidator,
  getCardByIdValidator
};
