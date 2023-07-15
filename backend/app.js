const express = require("express");

// const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// const { join } = require("path");
const { errors } = require("celebrate");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const { celebrateError } = require("./middlewares/celebrateError");

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

const allowedCors = [
  "https://praktikum.tk",
  "http://praktikum.tk",
  "http://mesto-spirin.nomoredomains.work",
  "https://mesto-spirin.nomoredomains.work",
  "http://localhost:3000",
  "localhost:3000"
];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("База подключена");
  });

const app = express();

// eslint-disable-next-line consistent-return
app.use(function (req, res, next) {
  const { origin } = req.headers;
  res.header("Access-Control-Allow-Credentials", "true");
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
  }
  const requestHeaders = req.headers["access-control-request-headers"];
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }

  next();
});

// app.use(cors());
app.use(limiter);
// app.use(express.static(join(__dirname, "public")));
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routes);
app.use(notFound);

app.use(errors());
app.use(errorHandler);
app.use(celebrateError);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
