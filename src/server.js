const express = require("express");
const { logger } = require("./Logger");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Login = require("./Controllers/Login");
const secured = require("./Controllers/Secured");

const app = express();
const port = process.env.PORT || 8088;

const SESSION_SECRET_KEY = "kjhdkd-sjkhsjsh-kjshshkdhsk-jsjhd";

app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false
  })
);

app.set("view engine", "pug");
app.set("views", `./src/Views`);
app.get("/", secured.get);
app.post("/", secured.post);

app.get("/login", (req, res) => res.render("Login"));
app.get("/logout", (req, res) =>
  req.session.destroy(() => res.redirect("/login"))
);
app.get("/dashboard", (req, res) => res.render("Dashboard"));

Login.registerRoutes(app);

app.listen(port, () =>
  logger.log(
    `Tarpit App listening on port ${port}!. Open url: http://localhost:${port}`
  )
);
