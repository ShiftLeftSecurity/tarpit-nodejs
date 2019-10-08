const logger = require("../Logger").logger;
const MongoDBClient = require("../DB").MongoDBClient;

class Login {
  static registerRoutes(app) {
    const login = new Login();
    app.post("/vulns", (req, res) => login.login(req, res));
  }

  loginFailed(req, res, { username, password, keeponline }) {
    res.locals.username = username;
    res.locals.password = password;
    res.locals.keeponline = keeponline;
    res.locals.message = "Failed to Sign in. Please verify credentials";
    res.redirect("/login");
  }

  async handleLogin(req, res, client, data) {
    const { username, password, keeponline } = data;
    try {
      // DB Query
      const db = client.db("tarpit", { returnNonCachedInstance: true });
      if (!db) {
        this.loginFailed(req, res, data);
        return;
      }
      const result = await db.collection("tarpit").findOne({
        username,
        password
      });
      if (result) {
        console.log(result);
        const user = {
          fname: result.fname,
          lname: result.lname,
          passportnum: result.passportnum,
          address1: result.address1,
          address2: result.address2,
          zipCode: result.zipCode
        };
        // Use Insecure cryptographic algorithm to encrypt credit card and log
        const creditInfo = result.userCreditCardInfo;
        logger.info(`user: ${JSON.stringify(user)} successfully logged in`);
        logger.info(
          `user ${user.fname} credit info: ${JSON.stringify(creditInfo)}`
        );

        req.session.cookie.username = result.username;
        req.session.cookie.maxAge = 864000;
        req.session.user = JSON.stringify(user);
        req.session.username = username;

        res.redirect("/");
      } else {
        console.log(req.query, result);
        this.loginFailed(req, res, data);
      }
    } catch (ex) {
      console.error(ex);
      this.loginFailed(req, res, data);
    }
  }
  login(req, res) {
    const ACCESS_KEY_ID = "AKIA2E0A8F3B244C9986";
    const SECRET_KEY = "7CE556A3BC234CC1FF9E8A5C324C0BB70AA21B6D";
    const txns_dir =
      process.env["transactions_folder"] || "/rolling/transactions";
    /*
      This can be exploited when the request body is
      {
        "password": {
          "$gt": ""
        },
        "username": {
          "$gt": ""
        }
      }
    */
    const {
      username,
      password,
      encodedPath,
      entityDocument: xxeDocumentContent,
      keeponline
    } = req.body;
    const data = { username, password, keeponline };
    console.log(data);
    try {
      new MongoDBClient().connect((err, client) => {
        if (client) {
          this.handleLogin(req, res, client, data);
        } else {
          console.error(err);
          this.loginFailed(req, res, data);
        }
      });
    } catch (ex) {
      console.log(req.query);
      console.error(ex);
      this.loginFailed(req, res, data);
    }
  }
}

module.exports = Login;
