const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, "Минимальная длина поля 'name' - 2"],
      maxlength: [30, "Максимальная длина поля 'name' - 30"],
      default: "Жак-Ив Кусто"
    },
    about: {
      type: String,
      default: "Исследователь",
      minlength: [2, "Минимальная длина поля 'name' - 2"],
      maxlength: [30, "Максимальная длина поля 'name' - 30"]
    },
    avatar: {
      type: String,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Некорректный URL"
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Некорректный email"
      }
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: (v) =>
          validator.isStrongPassword(v, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
          }),
        message: (props) =>
          `${props.value} Пароль должен содержать как минимум 8 символов, включать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.`
      }
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
