const Login = require("./Controllers/Login");
const ImageLookup = require("./Controllers/ImageLookup");

const login = new Login();
const imageLookup = new ImageLookup();

const API_PREFIX = "/api/v1";

module.exports = app => {
  app.get(`${API_PREFIX}/image-lookup`, imageLookup.get);

  app.post(`${API_PREFIX}/login`, (...args) => login.login(...args));
  app.get(`${API_PREFIX}/logout`, (req, res) =>
    req.session.destroy(() => res.redirect("/login"))
  );
};
