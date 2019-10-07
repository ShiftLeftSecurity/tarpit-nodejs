import logger from "../Logger";
import MongoClient from "mongodb";

class Login {
  async login(req, res) {
    const ACCESS_KEY_ID = "AKIA2E0A8F3B244C9986";
    const SECRET_KEY = "7CE556A3BC234CC1FF9E8A5C324C0BB70AA21B6D";
    const txns_dir =
      process.env["transactions_folder"] || "/rolling/transactions";
    const {
      login,
      password,
      encodedPath,
      entityDocument: xxeDocumentContent,
      keeponline
    } = req.query;
    const db = await this.connectToMongoDB();

    // DB Query
    const result = null;
    if (result) {
      const user = {
        fname: result.fname,
        lname: result.fname,
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
      res.cookie("login", result.login, {
        maxAge: 864000
      });
      res.locals.user = user;
      res.locals.login = result.login;
      res.redirect("/dashboard");
    } else {
      res.locals.login = login;
      res.locals.password = password;
      res.locals.keepOnline = keepOnline;
      res.locals.message = "Failed to Sign in. Please verify credentials";
      res.redirect("/login");
    }
  }
  connectToMongoDB() {
    return new Promise((resolve, reject) => {
      MongoClient.connect("mongodb://localhost:27017", function(err, client) {
        if (err) reject(err);
        resolve(client.db('login'))
      });
    }
  });
}
