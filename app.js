var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
var expressStaticGzip = require("express-static-gzip");
var mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

var indexRouter = require("./routes/index");
var studentsRouter = require("./routes/api/students");
var paymentsRouter = require("./routes/api/payments");
var apiRouter = require("./routes/api");

require("dotenv").config();

var app = express();

app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.set("trust proxy", true);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/dist/bundle",
  expressStaticGzip(path.join(__dirname, "dist/bundle"), {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    },
  })
);

// webpack
if (process.env.NODE_ENV === "development") {
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config");
  var compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

// connect to mongodb
mongoose.connect(
  MONGOURI,
  { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true },
  async function (err) {
    console.log("mongodb connected ?", err ? false : true);
    require("./utils/seed");
  }
);

// Route handler
app.use("/api/v1", apiRouter); // api route handler
app.use("/api/v1/students", studentsRouter); // student route handler
app.use("/api/v1/payments", paymentsRouter); // student route handler

app.use("/", indexRouter); // react handler

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
