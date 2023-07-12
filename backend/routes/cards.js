const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likedCard,
  dislikedCard
} = require("../controllers/cards");
const {
  createCardValidator,
  getCardByIdValidator
} = require("../validation/validationRules");

router.get("/", getCards);

router.post("/", createCardValidator, createCard);

router.delete("/:cardId", getCardByIdValidator, deleteCardById);

router.put("/:cardId/likes", getCardByIdValidator, likedCard);

router.delete("/:cardId/likes", getCardByIdValidator, dislikedCard);

module.exports = router;
