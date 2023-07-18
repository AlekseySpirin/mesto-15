const Card = require("../models/card");
const NotFoundError = require("../errors/notFoundError");
const ForbiddenError = require("../errors/forbiddenError");

const getCards = (req, res, next) => {
  return Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({
    name,
    link,
    owner,
  })
    .then((card) => {
      return res.status(201).send(card);
    })
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточки не существует");
      }
      if (card.owner._id.toString() !== userId.toString()) {
        throw new ForbiddenError("Нет прав для удаления карточки");
      }
      return Card.findByIdAndDelete(cardId)
        .then((deletedCard) => {
          if (!deletedCard) {
            throw new NotFoundError("Карточки не существует");
          }
          return res.status(200).send(deletedCard);
        })
        .catch(next);
    })
    .catch(next);
};

const likedCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    { new: true },
  )
    .populate("likes", "_id")
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточки не существует");
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const dislikedCard = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточки не существует");
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likedCard,
  dislikedCard,
};
