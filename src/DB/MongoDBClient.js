const mongo = require("mongodb");

const { MongoClient } = mongodb;

class MongoDBClient {
  #db = null;
  #url = null;
  constructor(host) {
    this.#url = `mongodb://${host}/mydb`;
  }
  connect() {
    MongoClient.connect(this.url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      this.#db = db;
    });
  }
  close() {
    if (this.#db) {
      this.#db.close();
    }
  }
}

module.exports = MongoDBClient;
